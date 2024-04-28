import "./add_desc.css";
import React, { useState } from "react";
import axios from "axios";

function Add_desc() {
    const [file, setFile] = useState(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);
    const [qrcode, setQr] = useState(null);
    const [id_val, setid] = useState(null);

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setFile(e.target.result);
            };
            reader.readAsDataURL(selectedFile); 
        } else {
            console.log('No file selected');
        }
    };
    const handleClose = ((event) => {
        setShowSuccess(false);
    })

    const handleSubmit = (() => {
        const formData = new FormData();
        formData.append("image_exh", file);
        formData.append('title', title);
        formData.append('description', description);
        
        axios.post("http://127.0.0.1:5000/addexhibit", formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(response => {
            console.log(response.data)
            setQr(response.data.qrcode_url);
            setid(response.data.id);
            setShowSuccess(true);
        })
        .catch(error => {
            alert('Upload failed: ' + error.message);
        });
    });

    return (
        <div className="main3">
            {showSuccess && 
                <div className="alert">
                    <p className="alert-text">Exhibit Added</p>
                    <p className="alert-text">Generated QR Code</p>
                    <img src={qrcode} alt="QR Code" className="prev-image"></img>
                    <p className="alert-text-1">{id_val}</p>
                    <button className="sub_btn_1" onClick={handleClose}>Done</button>
                </div>}
            <h2 className="title3">Add Exhibit Details</h2>
            <p className="label3">Title</p>
            <input type="text" className="input3" value={title} onChange={e => setTitle(e.target.value)}></input>
            <p className="label3">Description</p>
            <textarea type="text" className="input3" value={description} onChange={e => setDescription(e.target.value)} rows="4"></textarea>
            <p className="label3">Select Image</p>
            <input 
                type="file" 
                accept="image/*" 
                name="image_exh" 
                onChange={handleFileChange}
            ></input>
            {file && <img src={file} alt="Preview" className="preview-img" />}
            <button className="sub_btn" onClick={handleSubmit}>Submit</button>
        </div>
    );
}

export default Add_desc;
