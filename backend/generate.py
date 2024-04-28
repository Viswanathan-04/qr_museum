import qrcode, base64, cv2, requests, random, string
import numpy as np
from io import BytesIO

def generate_qr(connection, mycursor, title, description, image_data):
    #Generate QRCode
    id = ''.join(random.choices(string.ascii_uppercase + string.digits, k=8))
    data = {"id": id,"title": title}
    qr = qrcode.QRCode(version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_L,
        box_size=4, border=2
    )
    qr.add_data(data)
    qr.make(fit=True)
    img = qr.make_image(fill_color="black", back_color="white")

    #Save QRCode
    buffer = BytesIO()
    img.save(buffer, format="PNG")
    buffer.seek(0)

    #Post to ImageBB
    response = requests.post(
        'https://api.imgbb.com/1/upload',
        params={'key': "63c4530f924567c25139a6795dc4e25f"},
        files={'image': ('image.png', buffer, 'image/png')}
    )
    qrcode_link = response.json()["data"]["url"]
    print("Uploaded 1")

    #Save Uploaded Image
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
    print("Uploaded 2")

    try:
        sql = "insert into museumdet (id, title, description, image, qrcode) VALUES (%s, %s, %s, %s, %s)"
        val = (id, title, description, image_link, qrcode_link)
        mycursor.execute(sql, val)
        connection.commit()
    except:
        return [0]
    return [1, id]