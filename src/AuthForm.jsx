import { useState,useEffect} from "react"
import axios from 'axios'
import './AuthForm.css'
import { useNavigate} from "react-router-dom";
//import Modal from "./Modal";
export default function AuthForm() {
  const navigation = useNavigate()
 useEffect(() => {
   axios.get('http://localhost:8888/api/registertry')
   .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error( error);
  });
 }, [])
 /*const[modalData,setModalData] = useState({
   encryptionKeys:'',
   decryptionKeys:''
 })*/
 /*const [isModalOpen,setIsModalOpen] = useState(false)
 const openModal = () => {
  setIsModalOpen(true);
};*/

/*const closeModal = () => {
  setIsModalOpen(false);
};*/
  const [formData, setFormData] = useState({
    username:'',
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = {};
    if (!formData.email.includes('@')) {
      errors.email = 'Please enter a valid email';
    }
    if (formData.password.length < 6) {
      errors.password = 'Password should be at least 6 characters long';
    }
    setErrors(errors);
    if (Object.keys(errors).length === 0) {
      console.log('Form data:', formData);
      
      axios.post('http://localhost:8888/api/register', formData)
        .then(response => {
        console.log(response.status);
        console.log(response.data)
      /*  setModalData({...modalData,encryptionKeys:response.data.encryptionKeys,
          decryptionKeys:response.data.decryptionKeys})*/
        let user = response.data.username
        if(response.status == 200){
          //openModal()
          navigation(`/FileUpload/${user}`)
        } else{
          alert('cannot register')
        }
        
       })
      .catch(error => {
        console.error('There was an error with the POST request:', error);
  });

    }
  };
    return(
      <div className="signup-form">
      <h2>FileEncrypt</h2>
     {/*{isModalOpen &&  <Modal isOpen={isModalOpen} closeModal={closeModal} data={modalData}/>}*/}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>
        <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          {errors.password && <span className="error">{errors.password}</span>}
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>

    )
}