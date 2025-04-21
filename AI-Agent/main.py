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
from langchain_community.document_loaders import WikipediaLoader
import operator
from typing import Annotated
from langchain_openai import ChatOpenAI
from langchain.prompts import PromptTemplate
from dotenv import load_dotenv
import os 
from langserve import add_routes
from fastapi import FastAPI, Request
load_dotenv()
app = FastAPI()

llm = ChatOpenAI(model="gpt-4o")

class RecommendState(TypedDict):
    query: str
    answer: str
    context: Annotated[list, operator.add]
def RAG_retrieval(state):
    """ Recommend hotels, restaurants based on user input """
    client = QdrantClient(host="localhost", port=6333)
    embeddings = OpenAIEmbeddings()
    
    # Load vectorstore từ collection đã tồn tại
    vectorstore = Qdrant(
        client=client,
        collection_name="hotels_and_restaurants",
        embeddings=embeddings
    )
    context_items = vectorstore.similarity_search(state["query"], k=10)
    # Lấy nội dung của các tài liệu
    context_text = "\n".join(
        doc.page_content if hasattr(doc, "page_content") else str(doc)
        for sublist in context_items
        for doc in (sublist if isinstance(sublist, list) else [sublist])
    )
    return {"context": [context_text]}
def search_web(state):
    
    """ Retrieve docs from web search about everything related to tourism """

    # Search
    tavily_search = TavilySearchResults(max_results=5)
    search_docs = tavily_search.invoke(state['query'])
     # Format
    formatted_search_docs = "\n\n---\n\n".join(
        [
            f'<Document href="{doc["url"]}">\n{doc["content"]}\n</Document>'
            for doc in search_docs
        ]
    )
    return {"context": [formatted_search_docs]} 
def generateRecommend(state):
    """ Generate a recommendation based on the context """
    context = "\n\n".join(str(item) for item in state["context"])
    query = state["query"]
    prompt_template = """
Bạn là một chuyên gia du lịch và có kiến thức đầy đủ về các khách sạn tại Việt Nam. Bạn hãy trả lời câu hỏi của tôi dựa trên thông tin mà tôi đã cung cấp cho bạn. Các câu hỏi chủ yếu về các địa điểm du lịch, và cách xây dựng tour du lịch hợp lí bao gồm khách sạn, nhà hàng cũng như các địa điểm du lịch nổi tiếng gần đó.
Dưới đây là thông tin về một khách sạn mà tôi đã tìm thấy: {context}

Hãy cung cấp thông tin chi tiết về khách sạn, nhà hàng và tour du lịch theo như tôi yêu cầu, sử dụng các thông tin đã có và bổ sung thêm nếu có. Nếu có các thông tin về đường dẫn tới map hay facebook, website của khách sạn hay nhà hàng, hãy cung cấp cho tôi. Nếu không có thông tin nào, hãy nói là không có thông tin nào.
"""
    answer_instructions = prompt_template.format(context=context)
    response = llm.invoke([SystemMessage(content=answer_instructions)] + [HumanMessage(content=f"Trả lời các câu hỏi sau {query}")])
    return {"answer": response}
    
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

class WikiState(TypedDict):
    query: str
    context: Annotated[list, operator.add]
    answer: str
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
Bạn là một chuyên gia trả lời câu hỏi có sẵn từ wikipedia. Bạn đã nhận được dữ liệu từ wikipedia như sau: {context}

Hãy phân tích, tổng hợp để trả lời câu hỏi của người dùng."""
    answer_instructions = prompt_template.format(context=context)
    response = llm.invoke([SystemMessage(content=answer_instructions)] + [HumanMessage(content=f"Trả lời các câu hỏi sau {query}")])
    return {"answer": response}
    
ws_builder = StateGraph(WikiState)
ws_builder.add_node("search_wikipedia", search_wikipedia)
ws_builder.add_node("generateWiki", generateWiki)
ws_builder.add_edge(START, "search_wikipedia")
ws_builder.add_edge("search_wikipedia", "generateWiki")
ws_builder.add_edge("generateWiki", END)
ws_graph = ws_builder.compile()

class SearchState(TypedDict):
    query: str
    context: Annotated[list, operator.add]
    answer: str

def search_web(state):
    """ Retrieve docs from web search about everything """
    # Search
    tavily_search = TavilySearchResults(max_results=5)
    search_docs = tavily_search.invoke(state['query'])
     # Format
    formatted_search_docs = "\n\n---\n\n".join(
        [
            f'<Document href="{doc["url"]}">\n{doc["content"]}\n</Document>'
            for doc in search_docs
        ]
    )
    print(type(formatted_search_docs))
    
def generate_answer(state):
    """ Generate a recommendation based on the context """
    query = state["query"]
    context = state["context"]
    prompt_template = """
Bạn là một chuyên gia trả lời câu hỏi có sẵn từ google. Bạn đã nhận được dữ liệu từ google như sau: {context}"""
    answer_instructions = prompt_template.format(context=context)
    response = llm.invoke([SystemMessage(content=answer_instructions)] + [HumanMessage(content=f"Trả lời các câu hỏi sau {query}")])
    return {"answer": response}
search_builder = StateGraph(SearchState)
search_builder.add_node("search_web", search_web)
search_builder.add_node("generate_answer", generate_answer)
search_builder.add_edge(START, "search_web")
search_builder.add_edge("search_web", "generate_answer")
search_builder.add_edge("generate_answer", END)
search_graph = search_builder.compile()

class EntryGraphState(TypedDict):
    query: str
    context: Annotated[list, operator.add]
    answer: str
    subgraph_name: str
    
def controller(state):
    """ Controller to decide which subgraph to use """
    prompt_template = """Bạn là một chuyên gia dự đoán các câu hỏi của người dùng,
    dựa trên câu hỏi của người dùng, hãy quyết định subgraph nào nên được kích hoạt để Agent có thể 
    đưa ra câu trả lời tốt nhất cho người dùng.
    Hãy trả lời với một trong các subgraph sau: `Recommendation System`, `Search Wikipedia` và `Search Web`.
    `Recommendation System` là subgraph để tìm kiếm các khách sạn, nhà hàng và gợi ý các tour du lịch.
    `Search Wikipedia` là subgraph để tìm kiếm thông tin từ Wikipedia.
    `Search Web` là subgraph để tìm kiếm thông tin từ Google.
    LƯU Ý: CHỈ ĐƯA RA MỘT TRONG CÁC GIÁ TRỊ NÀY, KHÔNG ĐƯA RA CÁC GIÁ TRỊ KHÁC.
    Hãy đưa ra câu trả lời ngắn gọn và súc tích.
    Đây là câu hỏi của người dùng: {query}"""
    messages = llm.invoke(prompt_template.format(query=state["query"]))
    if messages.content == "Recommendation System":
        return {"subgraph_name": "Recommendation System"}
    elif messages.content == "Search Wikipedia":
        return {"subgraph_name": "Search Wikipedia"}
    elif messages.content == "Search Web":
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
from fastapi.responses import HTMLResponse
from fastapi.responses import JSONResponse

@app.get("/", response_class=HTMLResponse)
async def get_chatbot():
    with open("chatbot.html", "r", encoding="utf-8") as file:
        return HTMLResponse(file.read())
# Endpoint cho chatbot
@app.post("/chat")
async def chat(request: Request):
    raw_body = await request.body()  # raw_body là bytes
    query = raw_body.decode("utf-8").strip('"')  # Decode và remove dấu nháy JSON
    response = graph.invoke({"query": query})
    print(type(response))
    return JSONResponse(content={"answer": {"content": response['answer'].content}})
