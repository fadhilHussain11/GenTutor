import os,re,json,pytesseract
from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain
from PIL import Image
from src.utils import get_llm

root = os.path.dirname(os.path.dirname(__file__))
syllabus_dir = os.path.join(root,'backend','syllabus')

llm = get_llm()
pytesseract.pytesseract.tesseract_cmd = r"D:\Tesseract-OCR\tesseract.exe"

def extract_syllabus(syllabus_name):
    file_path = os.path.join(syllabus_dir,syllabus_name)
    print(file_path)
    img = Image.open(file_path)
    Content_text = pytesseract.image_to_string(img)
    prompt = PromptTemplate(
    input_variables=["content"],
    template="""
        You are assistant that extract syllabus details into JSON format.
        Syllabus:
        {content}

        Return only valid JSON. and only need units and its topics.Do not include ```,objectives,outcomes, or any explanation:
        {{
            "name": "..subject name...",
            "unit..": .....,.....,....,
            "......": .....,.....,....
        }}
        """
    )
    chain = prompt|llm
    text = chain.invoke({"content":Content_text})
    content_text = text.content

    return content_text
    clean_text = content_text.replace("```json", "").replace("```", "").strip()
    data = json.loads(clean_text)
    for key,value in data.items():
        if key!='name':
            data[key] = [t.strip() for t in re.split(r"—|-|,",value)]
    print(data)
    return data