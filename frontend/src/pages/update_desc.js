import "./update_desc.css";
import { useState } from "react";
import axios from "axios";

function Update_desc()
{
    const [file, setFile] = useState(null);
    const [title, setTitle] = useState('');
    const [id_val, setId] = useState('');
    const [prev_url, setPrev] = useState('');
    const [description, setDescription] = useState('');

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
    const fetchData = (() => {
        const formData = new FormData();
        formData.append("id", id_val)
        axios.post("http://127.0.0.1:5000/fetch", formData, {
            headers: {
                'Content-Type': 'text/plain'
            }
        })
        .then (response => {
            console.log(response.data);
            setTitle(response.data.title);
            setDescription(response.data.description);
            setFile(response.data.image_url);
            setPrev(response.data.del_url);
        })
        .catch (error => {
            alert("Error fetching data");
        })
    });

    const handleUpdate = (() => {
        const formData = new FormData();
        formData.append("id", id_val);
        formData.append("image", file);
        formData.append('title', title);
        formData.append('description', description);
        formData.append('prevurl', prev_url);
        
        axios.post("http://127.0.0.1:5000/update", formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(response => {
            alert(response.data);
        })
        .catch(error => {
            alert('Upload failed: ' + error.message);
        });
    });

    return (
        <div className="main4">
            <h2 className="title4">Update Exhibit Details</h2>
            <p className="label4">ID</p>
            <input type="text" className="input4" value={id_val} onChange={e => setId(e.target.value)}></input>
            <p className="label4">Title</p>
            <input type="text" className="input4" value={title} onChange={e => setTitle(e.target.value)}></input>
            <p className="label4">Description</p>
            <input type="text" className="input4" value={description} onChange={e => setDescription(e.target.value)}></input>
            <p className="label4">Select Image</p>
            <input 
                type="file" 
                accept="image/*" 
                name="image_exh" 
                onChange={handleFileChange}
            ></input>
            {file && <img src={file} alt="Preview" className="preview-img" />}
            <div className="buttons">
                <button className="sub_btn" onClick={fetchData}>Fetch</button>
                <button className="sub_btn" onClick={handleUpdate}>Submit</button>
            </div>
        </div>
    );
}

export default Update_desc;