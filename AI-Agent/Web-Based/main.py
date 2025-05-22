from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import sys
import os

# Setup path để import graph
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from graph.your_graph import graph

from langchain_core.chat_history import InMemoryChatMessageHistory

# --- FastAPI init ---
app = FastAPI()

# --- Cấu hình CORS ---
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # hoặc giới hạn cụ thể origin như "http://localhost"
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- DTO tương thích với Spring ---
class ChatRequest(BaseModel):
    userId: int
    message: str

# --- Dùng chat history (bạn có thể thay đổi về session nếu cần thiết) ---
chat_history = InMemoryChatMessageHistory()

# --- Endpoint chính ---
@app.post("/chat")
def chat_endpoint(chat: ChatRequest):
    user_msg = chat.message

    # Lưu tin nhắn người dùng
    chat_history.add_user_message(user_msg)

    # Gọi LangGraph
    inputs = {
        "messages": chat_history.messages,
        "query": user_msg,
        "context": [],
    }
    graph_response = graph.invoke(inputs)

    # Trích xuất phản hồi từ bot
    if isinstance(graph_response, dict) and "messages" in graph_response:
        bot_reply = graph_response["messages"][-1].content if graph_response["messages"] else "No reply"
    else:
        bot_reply = "Error: No valid response from LangGraph"

    # Lưu phản hồi bot
    chat_history.add_ai_message(bot_reply)

    # Trả về dạng chuỗi, tương thích với .bodyToMono(String.class)
    return {"data": bot_reply}

