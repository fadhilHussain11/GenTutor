import os
from src.agents import extract_syllabus
from flask import Flask,render_template,request

#file path
temp_dir = os.path.join(os.path.dirname(os.path.dirname(__file__)),'Frontend','templates')
static_dir = os.path.join(os.path.dirname(os.path.dirname(__file__)),'Frontend','static')
syllabus_dir = os.path.join(os.path.dirname(__file__),'syllabus')

#flask init..lization
application = Flask(
    __name__,
    template_folder=temp_dir,
    static_folder=static_dir
)
app = application

@app.route('/',methods=["GET","POST"])
def index():
    if request.method == "POST":
        email = request.form.get('email')
        password = request.form.get('password')
        return render_template("home.html")
    return render_template("login.html")

@app.route('/upload_syllabus',methods=["POST"])
def upload_syllabus():
    print("kwyri")
    syllabus_list = request.files.getlist('syllabus_files')
    for syllabus in syllabus_list:
        save_path = os.path.join(syllabus_dir,syllabus.filename)
        syllabus.save(save_path)
        syllabus_text = extract_syllabus(syllabus.filename) 
    return render_template("home.html")



if __name__ == "__main__":
    app.run(host="0.0.0.0",debug=True)