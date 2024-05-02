import React, { useState } from "react";
import axios from "axios";
import "quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import { modules, formats } from "./TextEditor";
import Navbar from './components/Navbar';
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  const [textContent, setTextContent] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  // const onImageChange = (event) => {
  //   setSelectedImage(event.target.files[0]);
  // };

  // const onFileChange = (event) => {
  //   setSelectedFile(event.target.files[0]);
  // };


  const onFileChange = (event) => {
    const fileInput = event.target;
    if (fileInput && fileInput.files.length > 0) {
      setSelectedFile(fileInput.files[0]);
    } else {
      // User cleared the file selection
      setSelectedFile(null);
    }
  };
  
  const handleSaveButtonClick = async () => {
    const formData = new FormData();
    formData.append("text", textContent);

    if (selectedImage) {
      formData.append("image", selectedImage);
    }

    if (selectedFile) {
      formData.append("file", selectedFile);
    }

    try {
      const response = await axios.post("http://localhost:3000/api/saveText", formData);
      console.log("Data saved to MongoDB", response.data.message);
      // Handle success or do something with the response
    } catch (error) {
      console.error("Error saving data to MongoDB:", error);
      // Handle error
    }
  };

  const handleTextChange = (content) => {
    setTextContent(content);
  };

  return (
    <Router>
      <Navbar />
      <div className="App">
        <div className="editor">
          <div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px" }}>
            <h3 style={{ flex: "1", marginLeft: "300px" }}>Q1. What is swapping? (Marks:5)</h3>
              <label htmlFor="fileInput" style={{
                padding: '0.5em 1em',
                fontSize: '0.9em',
                backgroundColor: 'blue',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                marginRight: '50px',
                marginTop: '10px'
              }}>
                Attach Text File
              </label>
              <input type="file" id="fileInput" accept=".txt" onChange={onFileChange} style={{ display: 'none' }} />

              <button
                onClick={handleSaveButtonClick}
                style={{
                  padding: '0.5em 1em',
                  fontSize: '0.9em',
                  backgroundColor: 'blue',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  marginRight: '50px',
                  marginTop: '10px'
                }}
              >
                Save
              </button>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div style={{ flex: "1" }}>
                <ReactQuill
                  style={{ width: "1200px", height: "500px", marginLeft: '280px' }}
                  theme="snow"
                  placeholder="Write your content ..."
                  value={textContent}
                  onChange={handleTextChange}
                  modules={modules}
                  formats={formats}
                />
              </div>
              <div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
