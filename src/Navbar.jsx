import './NavBar.css'; 
import axios from 'axios';

const NavBar = ({data}) => {
  const userInfo =() => {
    axios.get(`http://localhost:8888/api/user/data/${data}`)
    .then(response => {
      let userdata = response.data
      console.log(userdata)
    })
  }
  return (
    <nav className="navbar">
      <div className="brand">FileEncrypt</div>
      <ul className="nav-links">
        <li>
          <a href=" " onClick={userInfo}>{data}</a>
        </li>
        <li>
          <a href={`/FileUpload/${data}`}>View files</a>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;

