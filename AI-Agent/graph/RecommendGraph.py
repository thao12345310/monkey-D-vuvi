from langgraph.graph import StateGraph, START, END
from typing import Annotated
from langchain.vectorstores import Qdrant
from qdrant_client import QdrantClient
from IPython.display import Image, display
from langchain.embeddings import OpenAIEmbeddings
from langchain_community.tools import TavilySearchResults
from langgraph.graph import MessagesState
from langchain_core.messages import SystemMessage
from dotenv import load_dotenv
load_dotenv('.env')
import operator
from typing import Annotated
from langchain_openai import ChatOpenAI
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
    query = state["messages"]
    prompt_template = """
Bạn là một chuyên gia du lịch và có kiến thức đầy đủ về các khách sạn tại Việt Nam. Bạn hãy trả lời câu hỏi của tôi dựa trên thông tin mà tôi đã cung cấp cho bạn. Các câu hỏi chủ yếu về các địa điểm du lịch, và cách xây dựng tour du lịch hợp lí bao gồm khách sạn, nhà hàng cũng như các địa điểm du lịch nổi tiếng gần đó.
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

