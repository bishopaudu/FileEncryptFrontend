import { useState, useEffect } from 'react';
import './FileTable.css'; 
import { useParams } from 'react-router-dom';

const FileTable = () => {
  let {username} = useParams()
  const [userFiles, setUserFiles] = useState([]);
  //const username = 'username';

  useEffect(() => {
    fetch(`http://localhost:8888/api/user/${username}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setUserFiles(data);
      })
      .catch((error) => {
        console.error('Error fetching user files:', error);
      });
  }, [username]);

  return (
    <div className="file-table-container">
      <h2>Files uploaded by {username}:</h2>
      <table className="file-table">
        <thead>
          <tr>
            <th>File Name</th>
            <th>Upload Date</th>
            {/* Add more table headers if needed */}
          </tr>
        </thead>
        <tbody>
          {userFiles.map((file) => (
            <tr key={file.id}>
              <td>{file.fileName}</td>
              <td>{file.uploadDate}</td>
              {/* Add more table data cells if needed */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FileTable;
