import React, { useState } from 'react'
import { useNavigate} from 'react-router'

const Login = (props) => {

    const [credentials, setCredential] = useState({email:"", password:"" })
    const [password, setPassword] = useState("")

    let navigate = useNavigate();
    const handleSubmit = async (e)=> {
     e.preventDefault();

     const response = await fetch("http://localhost:5000/api/auth/login", 
     {
       method: 'POST',
      headers:{
           'Content-Type':'application/json',
           "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU4MDFmYmU5ZDZlYTZmNmZlOTljZDM4In0sImlhdCI6MTcwMjg5NTU1MH0.lLTMhNHXA_3iImfUlA2jUm-FflDV4m9-gK0R8n1Galg"
       },
       body: JSON.stringify({email: credentials.email,password: credentials.password})
      });
       const json = await response.json()
       console.log(json);
       if(json.success){
        //redirect
        localStorage.setItem('token', json.authtoken);
        navigate("/");
        
        props.showAlert("Logged in Successfully" , "success")

       }
       else{
        
      props.showAlert("Invalid Credential" , "Danger")
       }

    }
    const onChange= (e)=>{
        setCredential({...credentials, [e.target.name]: e.target.value})
     }

  return (
    <div>
      <form onSubmit={handleSubmit}>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" value={credentials.email} onChange={onChange} id="email" name="email" aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" value={credentials.password} onChange={onChange} id="password" name="password"/>
  </div>
 
  <button type="submit" className="btn btn-primary" >Submit</button>
</form>
    </div>
  )
}

export default Login
