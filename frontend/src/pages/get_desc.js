import "./get_desc.css";
import React, { useState } from "react";
import Webcam from "react-webcam";
import { FaCamera } from "react-icons/fa"; 
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Get_desc() {
    const [image, setImage] = useState(null);
    const webcamRef = React.useRef(null);
    const navigate = useNavigate();

    const capture = React.useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        setImage(imageSrc);

        const formData = new FormData();
        formData.append('image_cap', imageSrc);
        axios.post('http://127.0.0.1:5000/getdesc', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(response => {
            console.log(response.data);
            navigate('/show', { state: { data: response.data } });
        })
        .catch(error => {alert('Please rescan your QR code'); console.log(error); window.location.reload();});
    }, [webcamRef]);

    return (
        <div className="main1">
            <h2 className="title1">Scan QR Code Here</h2>
            {image ? (
                <div>
                    <img src={image} alt="Captured" />
                </div>
            ) : (
                <div>
                    <Webcam
                        audio={false}
                        ref={webcamRef}
                        screenshotFormat="image/jpeg"
                        style={{ width: "90%", height: "auto" }}
                        className="camera"
                    />
                    <button onClick={capture} className="capture_btn"><FaCamera/></button>
                </div>
            )}
        </div>
    );
}

export default Get_desc;