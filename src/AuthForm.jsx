import { useState,useEffect} from "react"
import axios from 'axios'
import './AuthForm.css'
export default function AuthForm() {
 useEffect(() => {
   axios.get('http://localhost:8080/api/registertry')
   .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error( error);
  });
 }, [])
 

  const [formData, setFormData] = useState({
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
      axios.post('http://localhost:8080/api/register', formData)
        .then(response => {
        console.log(response.status);
       })
      .catch(error => {
        console.error('There was an error with the POST request:', error);
  });

    }
  };
    return(
      <div className="signup-form">
      <h2>FileEncrypt</h2>
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