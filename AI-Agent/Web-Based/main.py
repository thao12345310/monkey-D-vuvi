from fastapi import FastAPI, Request
from pydantic import BaseModel
from langchain_core.chat_history import InMemoryChatMessageHistory
from your_graph import graph  # Chỉnh lại đúng tên file graph nhé
app = FastAPI()
chat_history = InMemoryChatMessageHistory()

class ChatRequest(BaseModel):
    message: str
    user_id: str
@app.post("/chat")
def chat_endpoint(chat: ChatRequest):
    user_msg= chat.message
    user_id= chat.user_id
    chat_history.add_user_message(user_msg)
    inputs = {
        "messages": chat_history.messages,  # Đây, gửi full history luôn
        "query": user_msg,
        "context": [],
    }
    graph_response = graph.invoke(inputs)
    if isinstance(graph_response, dict) and "messages" in graph_response:
        bot_reply = graph_response["messages"][-1].content if graph_response["messages"] else "No reply"
    else:
        bot_reply = "Error: No valid response from LangGraph"
    chat_history.add_ai_message(bot_reply)
    return {"reply": bot_reply, "user_id": user_id}
    
    