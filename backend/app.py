import os
import json,re
import sqlite3
from src.agents import extract_syllabus
from src.utils import db_connection
from flask import Flask,render_template,request,jsonify,url_for,session,flash,redirect

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

#secret key
app.secret_key = os.environ.get("SECRET_KEY","fallback_secret")

@app.route('/',methods=["GET","POST"])
def index():
    if request.method == "POST":
        email = request.form.get('email')
        password = request.form.get('password')

        conn = db_connection()
        user = conn.execute("SELECT * FROM user WHERE Email = ?",(email,)).fetchone()
        conn.close()

        if user:
            if user["Password"] == password:
                session["user_id"] = user["User_ID"]
                flash("Login Successfull!","success")
                full_name = f"{user['FName']} {user['LName']}"
                return render_template("home.html",welcome_name=full_name)
            else:
                flash("Invalid password!","danger")
        else:
            flash("Email not found","danger")

    return render_template("login.html")

@app.route('/register',methods=["GET","POST"])
def register():
    if request.method == "POST":
        first_name = request.form.get('firstname')
        last_name = request.form.get('lastname')
        email = request.form.get('email')
        password = request.form.get('password')
        
        conn = db_connection()
        conn.execute("INSERT INTO user (FName,LName,Email,Password) VALUES (?,?,?,?)",
                     (first_name,last_name,email,password))
        conn.commit()
        conn.close()
        return render_template("login.html")
    return render_template("register.html")

@app.route('/upload_syllabus',methods=["POST"])
def upload_syllabus():
    syllabus_list = request.files.getlist('syllabus_files')
    for syllabus in syllabus_list:
        save_path = os.path.join(syllabus_dir,syllabus.filename)
        syllabus.save(save_path)
        syllabus_text = extract_syllabus(syllabus.filename) 
        user_id = session["user_id"]

        conn = db_connection()
        conn.execute("INSERT INTO syllabus (User_ID,syllabus_text) VALUES (?,?)",
                     (user_id,syllabus_text))
        conn.commit()
        conn.close()
    return jsonify({"status":"uploaded syllabus"})


@app.route('/subject',methods=["GET","POST"])
def subject_page():
    return render_template("subject.html")

@app.route('/api/subject')
def subject_api():
    user_id = session["user_id"]
    conn = db_connection()
    row = conn.execute("SELECT syllabus_text FROM syllabus WHERE User_ID = ?",(user_id,)).fetchone()
    syllabus_string = row[0]
    clean_text = syllabus_string.replace("```json", "").replace("```", "").strip()
    data = json.loads(clean_text)
    for key,value in data.items():
        if key!='name':
            data[key] = [t.strip() for t in re.split(r"—|-|,",value)]
    print(data)
    return jsonify(data)

    
if __name__ == "__main__":
    app.run(host="0.0.0.0",debug=True)