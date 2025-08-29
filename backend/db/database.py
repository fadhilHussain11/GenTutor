import sqlite3

conn = sqlite3.connect("database.db")

cursor = conn.cursor()

#create user table
cursor.execute('''
CREATE TABLE IF NOT EXISTS user (
    FName TEXT NOT NULL,
    LName TEXT NOT NULL,
    Email TEXT UNIQUE NOT NULL,
    Password TEXT NOT NULL
)
''')

conn.commit()
conn.close()

print("Database and tables are created")