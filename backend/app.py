import os
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
                session["user_email"] = user["Email"]
                flash("Login Successfull!","success")
                return render_template("home.html")
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

@app.route('/syllabus',methods=["GET","POST"])
def syllabus_page():
    return render_template("syllabus.html")

@app.route('/upload_syllabus',methods=["POST"])
def upload_syllabus():
    syllabus_list = request.files.getlist('syllabus_files')
    for syllabus in syllabus_list:
        save_path = os.path.join(syllabus_dir,syllabus.filename)
        syllabus.save(save_path)
        syllabus_text = extract_syllabus(syllabus.filename) 
    return jsonify(syllabus_text)



if __name__ == "__main__":
    app.run(host="0.0.0.0",debug=True)