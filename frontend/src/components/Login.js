import React, { useState } from "react";
import axios from "axios";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleOnChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const { email, password } = formData;
    axios({
      method: "post",
      url: "http://localhost:5000/login",
      data: {
        email,
        password,
      },
      withCredentials: true
    })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div>
      <form onSubmit={(e) => handleOnSubmit(e)}>
        <label>
          Email:
          <input
            value={formData.email}
            onChange={(e) => handleOnChange(e)}
            type="email"
            name="email"
          />
        </label>
        <label>
          Password:
          <input
            value={formData.password}
            onChange={(e) => handleOnChange(e)}
            type="password"
            name="password"
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default Login;
