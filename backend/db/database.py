import sqlite3

conn = sqlite3.connect("database.db")

cursor = conn.cursor()

#create user table
cursor.execute('''
CREATE TABLE IF NOT EXISTS user (
    User_ID INTEGER PRIMARY KEY AUTOINCREMENT,
    FName TEXT NOT NULL,
    LName TEXT NOT NULL,
    Email TEXT NOT NULL,
    Password TEXT NOT NULL
)
''')

#create syllabus table
cursor.execute('''
CREATE TABLE IF NOT EXISTS syllabus (
    User_ID INTEGER NOT NULL,
    syllabus_text TEXT NOT NULL,
    FOREIGN KEY (User_ID) REFERENCES user(User_ID)
)
''')

conn.commit()
conn.close()

print("Database and tables are created")