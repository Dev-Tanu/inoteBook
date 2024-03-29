import React, { useState } from 'react'
import { useNavigate} from 'react-router'

const Signup = (props) => {
   const [credentials, setCredential] = useState({name:" ",email:"", password:"", cpassword:"" })
   let navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const {name, email, password} = credentials;

    const response = await fetch("https://inotebook-8pvf.onrender.com/api/auth/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"

      },
      body: JSON.stringify({name, email,password}),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      //redirect
      localStorage.setItem("token", json.authtoken);
      navigate("/");
      props.showAlert("Account Created Successfully" , "success")

    } else {
      props.showAlert("Inavlid Credential" , "danger")
    }
  };
  const onChange = (e) => {
    setCredential({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              onChange={onChange}
              name="name"
            />
          </div>
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            onChange={onChange}
            name="email"
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            onChange={onChange}
            name="password"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="cpassword"
            onChange={onChange}
            name="cpassword"
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Signup;
