import axios from "axios";
import React, { useEffect } from "react";

function AddUser(props) {
  const handleChange = (e) => {
    props.setData((d) => ({ ...d, [e.target.name]: e.target.value }));
  };

  const verifyForm = (e) => {
    e.preventDefault();
    saveUser();
  };

  const saveUser = async () => {
    props.setLoading(true);
    await axios.post("http://localhost:3000/saveUser", props.data);
    props.toggleCreateUser();
    props.fetchData();
    props.setData({
      password: "",
      email: "",
      username: "",
      permission: "",
      id: "undefined",
    });
  };

  return (
    <div style={{ textAlign: "left" }}>
      <h1>Manage User</h1>
      <form onSubmit={verifyForm}>
        <input
          placeholder="Email"
          name="email"
          onChange={handleChange}
          value={props.data.email}
        />
        <input
          placeholder="Password"
          name="password"
          onChange={handleChange}
          value={props.data.password}
        />
        <input
          placeholder="Full Name"
          name="username"
          onChange={handleChange}
          value={props.data.username}
        />
        <input
          type={"number"}
          placeholder="Permission"
          name="permission"
          onChange={handleChange}
          value={props.data.permission}
        />
        <input type={"submit"} value="Save User" />
      </form>
    </div>
  );
}

export default AddUser;
