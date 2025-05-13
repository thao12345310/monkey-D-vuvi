from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware  # ✅ Thêm CORS ở đây
from pydantic import BaseModel
import sys
import os

# Setup path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from graph.your_graph import graph

from langchain_core.chat_history import InMemoryChatMessageHistory

# --- Init FastAPI ---
app = FastAPI()

# --- Cấu hình CORS ---
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost"],  # ✅ Origin của React frontend
    allow_credentials=True,
    allow_methods=["*"],  # ✅ Cho phép tất cả method (GET, POST, OPTIONS, ...)
    allow_headers=["*"],  # ✅ Cho phép tất cả headers
)

# --- Chat History ---
chat_history = InMemoryChatMessageHistory()

# --- Request body model ---
class ChatRequest(BaseModel):
    message: str
    user_id: str

# --- API Endpoint ---
@app.post("/chat")
def chat_endpoint(chat: ChatRequest):
    user_msg = chat.message
    user_id = chat.user_id

    # --- Lưu message của user ---
    chat_history.add_user_message(user_msg)

    # --- Prepare input cho graph ---
    inputs = {
        "messages": chat_history.messages,  # Full history
        "query": user_msg,
        "context": [],
    }

    # --- Invoke graph ---
    graph_response = graph.invoke(inputs)

    # --- Lấy reply từ graph ---
    if isinstance(graph_response, dict) and "messages" in graph_response:
        bot_reply = graph_response["messages"][-1].content if graph_response["messages"] else "No reply"
    else:
        bot_reply = "Error: No valid response from LangGraph"

    # --- Lưu message của bot ---
    chat_history.add_ai_message(bot_reply)

    # --- Trả response ---
    return {
        "reply": bot_reply,
        "user_id": user_id,
    }
