from qreader import QReader
import cv2, json
import mysql.connector as sql_con

connection = sql_con.connect(host="localhost",user="root",password="Admin@123",database="sample")
mycursor = connection.cursor()

def decode_text(Image):
    try:
        # Create a QReader instance
        qreader = QReader()
        # Get the image that contains the QR code
        image = cv2.cvtColor(Image, cv2.COLOR_BGR2RGB)
        # Use the detect_and_decode function to get the decoded QR data
        decoded_text = qreader.detect_and_decode(image=image)
        response_string = decoded_text[0].replace("'",'"')
        response = json.loads(response_string)
        return response["id"]
    except:
        return "Error decoding"