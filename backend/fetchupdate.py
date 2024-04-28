import qrcode, base64, cv2, requests, random, string, json
import numpy as np
import mysql.connector as sql_con
from io import BytesIO

def fetch_details(mycursor, id):
    query = "select * from museumdet where id = %s"
    val = (id, )
    mycursor.execute(query, val)
    res = mycursor.fetchall()[0]
    result = json.dumps({"id": res[0], "title": res[1], "description": res[2], "image_url": res[3], "qrcode_url": res[4]})
    return result


def update_details(connection, mycursor, id, title, description, image_data):
    try:
        if ',' in image_data:
            header, image_data = image_data.split(',', 1)
        image_bytes = base64.b64decode(image_data)
        image_array = np.frombuffer(image_bytes, dtype=np.uint8)
        image = cv2.imdecode(image_array, cv2.IMREAD_COLOR)
        print("Converted")

        buffer_image = BytesIO()
        is_success, buffer = cv2.imencode(".png", image)
        buffer_image.write(buffer.tobytes())
        buffer_image.seek(0)

        response = requests.post(
            'https://api.imgbb.com/1/upload',
            params={'key': "63c4530f924567c25139a6795dc4e25f"},
            files={'image': ("image.png", buffer, 'image/png')}
        )
        image_link = response.json()["data"]["url"]
    except:
        image_link = image_data   
    sql = "update museumdet set title = %s, description = %s, image = %s where id = %s"
    val = (title, description, image_link, id)
    mycursor.execute(sql, val)
    connection.commit()
    return "Exhibit details updated"