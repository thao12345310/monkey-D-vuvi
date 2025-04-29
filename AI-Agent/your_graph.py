from langgraph.graph import StateGraph, START, END
from langchain.agents import tool
from langgraph.prebuilt import ToolNode, tools_condition
from langchain_core.messages import HumanMessage, AIMessage
from typing import List, TypedDict
from langchain.vectorstores import Qdrant
from qdrant_client import QdrantClient
from IPython.display import Image, display
from langchain.embeddings import OpenAIEmbeddings
from langchain.tools import tool
from serpapi import GoogleSearch
import os
from langchain_community.tools import TavilySearchResults
from langchain_core.messages import HumanMessage, SystemMessage
from langgraph.graph import MessagesState
from langchain_community.document_loaders import WikipediaLoader
import operator
from typing import Annotated
from langchain_openai import ChatOpenAI
from langchain.prompts import PromptTemplate
from dotenv import load_dotenv
import os 
from langserve import add_routes
import pandas as pd
from fastapi.responses import JSONResponse

from fastapi import FastAPI, Request
load_dotenv()
import sqlite3
from langgraph.checkpoint.sqlite import SqliteSaver
from langchain_core.chat_history import InMemoryChatMessageHistory
chat_history = InMemoryChatMessageHistory()
# Khởi tạo SQLite connection
app = FastAPI()

llm = ChatOpenAI(model="gpt-4o")

class RecommendState(MessagesState):
    query: str
    context: Annotated[list, operator.add]
def RAG_retrieval(state):
    """ Recommend hotels, restaurants based on user input """
    client = QdrantClient(host="localhost", port=6333)
    embeddings = OpenAIEmbeddings()
    
    # Load vectorstore từ collection đã tồn tại
    vectorstore = Qdrant(
        client=client,
        collection_name="hotels_and_ship_and_restaurants",
        embeddings=embeddings
    )
    context_items = vectorstore.similarity_search(state["query"], k=5)
    # Lấy nội dung của các tài liệu
    context_text = "\n".join(
        doc.page_content if hasattr(doc, "page_content") else str(doc)
        for sublist in context_items
        for doc in (sublist if isinstance(sublist, list) else [sublist])
    )
    return {"context": [context_text]}
def search_web(state):
    """Retrieve docs from web search about everything related to tourism."""

    tavily_search = TavilySearchResults(max_results=5)

    try:
        search_docs = tavily_search.invoke(state['query'])

        # Nếu kết quả là string (tức lỗi), trả luôn
        if isinstance(search_docs, str):
            return {"context": [search_docs]}
        
        # Nếu là list thì format
        formatted_search_docs = "\n\n---\n\n".join(
            f'<Document href="{doc["url"]}">\n{doc["content"]}\n</Document>'
            for doc in search_docs
        )

        return {"context": [formatted_search_docs]}
    
    except Exception as e:
        # Nếu có lỗi HTTP như 400, 401...
        return {"context": [f"Search error: {str(e)}"]}

 
def generateRecommend(state):
    """ Generate a recommendation based on the context """
    context = "\n\n".join(str(item) for item in state["context"])
    query = state["messages"]
    prompt_template = """
    Bạn là một trợ lý ảo của web du lịch MonkeyDvuvi, một website hỗ trợ đặt phòng khách sạn, du thuyền trực tuyến. Nhiệm vụ của bạn là trả lời các câu hỏi của người dùng
    các kiến thức về các địa điểm du lịch, nhà hàng, khách sạn, du thuyền tại Việt Nam, ngoài ra có thể gợi ý tour và các lịch trình chi tiết phù hợp với nhu cầu người dùng.
    Các câu hỏi chủ yếu về các địa điểm du lịch, và cách xây dựng tour du lịch hợp lí bao gồm khách sạn, nhà hàng cũng như các địa điểm du lịch nổi tiếng gần đó.
Dưới đây là thông tin về một khách sạn mà tôi đã tìm thấy: {context}

Hãy cung cấp thông tin chi tiết về khách sạn, nhà hàng và tour du lịch theo như tôi yêu cầu, sử dụng các thông tin đã có và bổ sung thêm nếu có. Nếu có các thông tin về đường dẫn tới map hay facebook, website của khách sạn hay nhà hàng, hãy cung cấp cho tôi. Nếu không có thông tin nào, hãy nói là không có thông tin nào.
"""
    answer_instructions = prompt_template.format(context=context)
    response = llm.invoke([SystemMessage(content=answer_instructions)] + state['messages'])
    return {"messages": response}
    
rs_builder = StateGraph(RecommendState)
rs_builder.add_node("RAG_retrieval", RAG_retrieval)
rs_builder.add_node("search_web", search_web)
rs_builder.add_node("generateRecommend", generateRecommend)

rs_builder.add_edge(START, "RAG_retrieval")
rs_builder.add_edge(START, "search_web")
rs_builder.add_edge("RAG_retrieval", "generateRecommend")
rs_builder.add_edge("search_web", "generateRecommend")
rs_builder.add_edge("generateRecommend", END)
rs_graph = rs_builder.compile()

class WikiState(MessagesState):
    query: str
    context: Annotated[list, operator.add]
def search_wikipedia(state):
    
    """ Retrieve docs from wikipedia """

    # Search
    search_docs = WikipediaLoader(query=state['query'], 
                                  load_max_docs=6).load()

     # Format
    formatted_search_docs = "\n\n---\n\n".join(
        [
            f'<Document source="{doc.metadata["source"]}" page="{doc.metadata.get("page", "")}">\n{doc.page_content}\n</Document>'
            for doc in search_docs
        ]
    )
    return {"context": [formatted_search_docs]}     
def generateWiki(state):
    """ Generate a recommendation based on the context """
    query = state["query"]
    context = state["context"]
    prompt_template = """
    Bạn là một trợ lý ảo của web du lịch MonkeyDvuvi, một website hỗ trợ đặt phòng khách sạn, du thuyền trực tuyến. Nhiệm vụ của bạn là trả lời các câu hỏi của người dùng
    các kiến thức về các địa điểm du lịch, nhà hàng, khách sạn, du thuyền tại Việt Nam, ngoài ra có thể gợi ý tour và các lịch trình chi tiết phù hợp với nhu cầu người dùng. 
    Bạn đã nhận được dữ liệu từ wikipedia như sau: {context}
Hãy phân tích, tổng hợp để trả lời câu hỏi của người dùng."""
    answer_instructions = prompt_template.format(context=context)
    response = llm.invoke([SystemMessage(content=answer_instructions)] + state['messages'])
    return {"messages": response}
    
ws_builder = StateGraph(WikiState)
ws_builder.add_node("search_wikipedia", search_wikipedia)
ws_builder.add_node("generateWiki", generateWiki)
ws_builder.add_edge(START, "search_wikipedia")
ws_builder.add_edge("search_wikipedia", "generateWiki")
ws_builder.add_edge("generateWiki", END)
ws_graph = ws_builder.compile()

class SearchState(MessagesState):
    query: str
    context: Annotated[list, operator.add]
    answer: str

def search_web(state):
    """ Retrieve docs from web search about everything """
    # Search
    tavily_search = TavilySearchResults(max_results=5)
    search_docs = tavily_search.invoke(state['query'])
    print(search_docs)
    print(type(search_docs))
     # Format
    formatted_search_docs = "\n\n---\n\n".join(
        [
            f'<Document href="{doc["url"]}">\n{doc["content"]}\n</Document>'
            for doc in search_docs
        ]
    )
    print(type(formatted_search_docs))
    return {"context": [formatted_search_docs]}

    
def generate_answer(state):
    """ Generate a recommendation based on the context """
    query = state["query"]
    context = state["context"]
    prompt_template = """
    Bạn là một trợ lý ảo của web du lịch MonkeyDvuvi, một website hỗ trợ đặt phòng khách sạn, du thuyền trực tuyến. Nhiệm vụ của bạn là trả lời các câu hỏi của người dùng
    các kiến thức về các địa điểm du lịch, nhà hàng, khách sạn, du thuyền tại Việt Nam, ngoài ra có thể gợi ý tour và các lịch trình chi tiết phù hợp với nhu cầu người dùng. Bạn đã nhận được dữ liệu từ google như sau: {context}"""
    answer_instructions = prompt_template.format(context=context)
    print(state['messages'])
    response = llm.invoke([SystemMessage(content=answer_instructions)] + state['messages'])
    return {"messages": response}

search_builder = StateGraph(SearchState)
search_builder.add_node("search_web", search_web)
search_builder.add_node("generate_answer", generate_answer)
search_builder.add_edge(START, "search_web")
search_builder.add_edge("search_web", "generate_answer")
search_builder.add_edge("generate_answer", END)
search_graph = search_builder.compile()

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