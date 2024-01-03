import axios from 'axios';
import { useEffect } from 'react';
import  { useState} from 'react';
import './FileUpload.css'; 
import NavBar from './NavBar';
import { useParams } from 'react-router-dom';


const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [encryptionKey, setEncryptionKey] = useState('');
  const [decryptionKey, setDecryptionKey] = useState('');
  const[username,setUsername] =useState('');
  let { user } = useParams();

  useEffect(()=>{
    axios.get('http://localhost:8888/api/test')
    .then(response => {
      console.log(response.data)
    })
  },[])

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleEncryptionKeyChange = (e) => {
    setEncryptionKey(e.target.value);
  };

  const handleDecryptionKeyChange = (e) => {
    setDecryptionKey(e.target.value);
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };
  const handleFileUpload = async () => {
    // ... Your upload logic remains unchanged
    const formData = new FormData();
    formData.append('file', file);
    formData.append('encryptionKey', encryptionKey);
    formData.append('decryptionKey', decryptionKey);
    formData.append('username', username);
    

    try {
      const response = await fetch('http://localhost:8888/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('File uploaded successfully');
      } else {
        alert('File upload failed');
      }
    } catch (error) {
      alert('Error uploading file:', error);
    }
  };
  

  return (
    <>
    <NavBar data={user}/>
    <div className="file-upload-container">
      <input type="file" onChange={handleFileChange} className="file-input" />
      <input
        type="text"
        placeholder="Encryption Key"
        onChange={handleEncryptionKeyChange}
        className="key-input"
      />
      <input
        type="text"
        placeholder="Decryption Key"
        onChange={handleDecryptionKeyChange}
        className="key-input"
      />
      <input
        type="text"
        placeholder="username"
        onChange={handleUsernameChange}
        className="key-input"
      />
      <button onClick={handleFileUpload} className="upload-button">
        Upload
      </button>
    </div>
    </>
  );
};

export default FileUpload;

