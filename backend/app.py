from flask import Flask, request
from decode import decode_text
from generate import generate_qr
from translate import translate_content
from fetchupdate import fetch_details, update_details
from flask_cors import CORS
import base64, cv2
import numpy as np
import mysql.connector as sql_con

app = Flask(__name__)
cors = CORS(app)
connection = sql_con.connect(host="localhost",user="root",password="Admin@123",database="sample")
mycursor = connection.cursor()

@app.route("/")
def home():
    return "Access Denied - 404"

@app.route("/addexhibit", methods=["POST"])
def add_exhibit():
    title = request.form["title"]
    desc = request.form["description"]
    image_exh = request.form["image_exh"]
    val = generate_qr(connection, mycursor,title, desc, image_exh)
    val11 = None
    print(val)
    if val[0]==1:
        val11 = fetch_details(mycursor, val[1])
    return val11 if val[0]==1 else "Error"
    
@app.route("/getdesc", methods=["POST"])
def get_desc():
    image_data = request.form["image_cap"]
    if ',' in image_data:
        header, image_data = image_data.split(',', 1)
    image_bytes = base64.b64decode(image_data)
    image_array = np.frombuffer(image_bytes, dtype=np.uint8)
    image = cv2.imdecode(image_array, cv2.IMREAD_COLOR)
    res = decode_text(image)
    res0 = fetch_details(mycursor, res)
    return res0

@app.route("/translatetext", methods=["POST"])
def translate_text():
    desc = request.form["content"]
    lang = request.form["language"]
    res1 = translate_content(desc, lang)
    return res1

@app.route("/fetch", methods=["POST"])
def fetch_det():
    id = request.form["id"]
    res2 = fetch_details(mycursor, id)
    return res2

@app.route("/update", methods=["POST"])
def update_det():
    id = request.form["id"]
    title = request.form["title"]
    desc = request.form["description"]
    image_exh = request.form["image"]
    res3 = update_details(connection, mycursor, id, title, desc, image_exh)
    return res3

if __name__=="__main__":
    app.run(debug = True)