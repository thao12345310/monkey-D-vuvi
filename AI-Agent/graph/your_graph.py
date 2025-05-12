from RecommendGraph import rs_builder
from SearchWebGraph import search_builder 
from SearchWikiGraph import ws_builder
from langgraph.graph import StateGraph, START, END
from langchain.vectorstores import Qdrant
from qdrant_client import QdrantClient
from langchain.embeddings import OpenAIEmbeddings
import os
from langchain_community.tools import TavilySearchResults
from langchain_core.messages import  SystemMessage
from langgraph.graph import MessagesState
from langchain_community.document_loaders import WikipediaLoader
import operator
from typing import Annotated
from langchain_openai import ChatOpenAI
from dotenv import load_dotenv
import os 
from fastapi import FastAPI, Request
load_dotenv()
from langchain_core.chat_history import InMemoryChatMessageHistory
chat_history = InMemoryChatMessageHistory()
# Khởi tạo SQLite connection
app = FastAPI()

llm = ChatOpenAI(model="gpt-4o")

class EntryGraphState(MessagesState):
    query: str
    context: Annotated[list, operator.add]
    subgraph_name: str
    summary: str
    
def controller(state):
    """ Controller to decide which subgraph to use """
    prompt_template = """Bạn là một trợ lý ảo của web du lịch MonkeyDvuvi, một website hỗ trợ đặt phòng khách sạn, du thuyền trực tuyến. Nhiệm vụ của bạn là trả lời các câu hỏi của người dùng
    các kiến thức về các địa điểm du lịch, nhà hàng, khách sạn, du thuyền tại Việt Nam, ngoài ra có thể gợi ý tour và các lịch trình chi tiết phù hợp với nhu cầu người dùng.
    Dựa trên câu hỏi của người dùng, hãy quyết định subgraph nào nên được kích hoạt để Agent có thể đưa ra câu trả lời tốt nhất cho người dùng.
    Hãy trả lời với một trong các subgraph sau: `Recommendation System`, `Search Wikipedia` và `Search Web`.
    Nếu câu hỏi đưa vào liên quan tới yêu cầu xây dựng tour du lịch, hỏi đáp về nhà hàng, khách sạn cụ thể, hãy gọi tới `Recommendation System`.
    Nếu câu hỏi đưa vào liên quan tới yêu cầu tìm kiếm thông tin từ wikipedia, hãy gọi tới `Search Wikipedia`.
    Nếu câu hỏi đưa vào liên quan tới yêu cầu tìm kiếm thông tin từ google, hãy gọi tới `Search Web`.
    Nếu không có subgraph nào phù hợp, hãy gọi tới `Search Web`.
    LƯU Ý: CHỈ ĐƯA RA MỘT TRONG CÁC GIÁ TRỊ NÀY, KHÔNG ĐƯA RA CÁC GIÁ TRỊ KHÁC.
    Hãy đưa ra câu trả lời ngắn gọn và súc tích.
    Đây là câu hỏi của người dùng: {query}"""
    messages = llm.invoke(prompt_template.format(query=state["query"]))
    if messages.content == "Recommendation System":
        print("Recommendation System")
        return {"subgraph_name": "Recommendation System"}
    elif messages.content == "Search Wikipedia":
        print("Search Wikipedia")
        return {"subgraph_name": "Search Wikipedia"}
    elif messages.content == "Search Web":
        print("Search Web")
        return {"subgraph_name": "Search Web"}
    return {"subgraph_name": "Search Web"}

def condition_tools(state):
    if state['subgraph_name'] == "Recommendation System":
        return "Recommendation System"
    elif state['subgraph_name'] == "Search Wikipedia":
        return "Search Wikipedia"
    elif state['subgraph_name'] == "Search Web":
        return "Search Web"
    else:
        return "Search Web"
      
builder = StateGraph(EntryGraphState)
builder.add_node("controller", controller)
builder.add_node("Recommendation System", rs_builder.compile())
builder.add_node("Search Wikipedia", ws_builder.compile())
builder.add_node("Search Web", search_builder.compile())

builder.add_edge(START, "controller")
builder.add_conditional_edges(
    "controller",
    condition_tools
)
builder.add_edge("Recommendation System", END)
builder.add_edge("Search Wikipedia", END)
builder.add_edge("Search Web", END)
graph = builder.compile()