from fastapi import FastAPI, Request
import os
import httpx
import requests
from langchain_core.chat_history import InMemoryChatMessageHistory
from your_graph import graph  # Chỉnh lại đúng tên file graph nhé

# Lấy TELEGRAM_TOKEN từ biến môi trường
TELEGRAM_TOKEN = os.getenv("TELEGRAM_TOKEN")
WEBHOOK_URL = "https://93c5-116-96-46-100.ngrok-free.app/webhook"  # Đảm bảo URL này chính xác

# Thiết lập Webhook khi ứng dụng khởi động
def set_telegram_webhook():
    response = requests.post(
        f"https://api.telegram.org/bot{TELEGRAM_TOKEN}/setWebhook",
        data={"url": WEBHOOK_URL}
    )
    print(response.json())  # In ra kết quả để kiểm tra

# Gọi hàm set_telegram_webhook để thiết lập webhook ngay khi ứng dụng khởi động
set_telegram_webhook()

# Khởi tạo FastAPI app và chat history
app = FastAPI()
chat_history = InMemoryChatMessageHistory()

@app.post("/webhook")
async def telegram_webhook(req: Request):
    data = await req.json()
    if "message" in data:
        chat_id = str(data["message"]["chat"]["id"])  # Nên ép chat_id thành str cho chắc
        user_message = data["message"].get("text", "")

        if not user_message:
            return {"ok": True}

        # Lưu tin nhắn người dùng vào history
        chat_history.add_user_message(user_message)

        # Gửi query tới LangGraph xử lý
        inputs = {
            "messages": chat_history.messages,  # Đây, gửi full history luôn
            "query": user_message,
            "context": [],
        }
        response = graph.invoke(inputs)

        # Kiểm tra cấu trúc của phản hồi từ LangGraph và trích xuất câu trả lời
        if isinstance(response, dict) and "messages" in response:
            bot_reply = response["messages"][-1].content if response["messages"] else "No reply"
        else:
            bot_reply = "Error: No valid response from LangGraph"

        # Lưu tin nhắn bot vào history
        chat_history.add_ai_message(bot_reply)

        # Trả lời lại Telegram
        async with httpx.AsyncClient() as client:
            await client.post(f"https://api.telegram.org/bot{TELEGRAM_TOKEN}/sendMessage", json={
                "chat_id": chat_id,
                "text": bot_reply,
                "parse_mode": "Markdown"
            })

    return {"ok": True}
