#all initi...lization
import os
from dotenv import load_dotenv
load_dotenv()
from langchain_groq import ChatGroq



#llm 
def get_llm():
    groq_api_key = os.getenv("GROQ_API_KEY")
    llm = ChatGroq(model="gemma2-9b-it",groq_api_key=groq_api_key)
    return llm