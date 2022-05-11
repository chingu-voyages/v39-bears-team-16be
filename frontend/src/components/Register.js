import React, { useState } from "react";
import axios from "axios";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
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
    console.log("submitted")
    const { name, email, password } = formData;
    axios({
      method: "post",
      url: "http://localhost:5000/register",
      data: {
        name,
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
          Name:
          <input
            value={formData.name}
            onChange={(e) => handleOnChange(e)}
            type="text"
            name="name"
          />
        </label>
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

export default Register;
