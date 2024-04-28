import "./show_desc.css";
import React, {useState} from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

function Show_desc()
{
    const location = useLocation();
    const data = location.state.data;
    const [content1, setContent] = useState(data.description);
    const [btnText, setBtnText] = useState("Translate");

    const handleTrans = (()=> {
        setBtnText("Translating...");
        const formData1 = new FormData();
        formData1.append('content', data.description);
        formData1.append('language', document.getElementById("selector").value);
        if (document.getElementById("selector").value==="en")
        {
            setContent(data.description);
            setBtnText("Translate");
        }
        else
        {
            axios.post("http://127.0.0.1:5000/translatetext",formData1,{
                headers: {
                    "Content-Type" : "text/plain"
                }})
            .then(response=>{
                console.log(response.data);
                setContent(response.data);
                setBtnText("Translate");
            })
            .catch(error => {console.log("Error Translating", error); setBtnText("Translate");});
        }
    });

    return (
        <div className="main2">
            <h2 className="title2">{data.title}</h2>
            <img src={data.image_url} alt="preview" className="image2"></img>
            <p className="desc2">{content1}</p>
            <div className="sel_lang">
                <select name="selector" id="selector">
                    <option value="en">English</option>
                    <option value="fr">French</option>
                    <option value="hi">Hindi</option>
                    <option value="ta">Tamil</option>
                    <option value="es">Spanish</option>
                    <option value="ar">Arabic</option>
                    <option value="ml">Malayalam</option>
                    <option value="te">Telugu</option>
                </select>
                <button className="trans2" onClick={handleTrans}>{btnText}</button>
            </div>
        </div>
    );
}

export default Show_desc;