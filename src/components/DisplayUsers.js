import axios from "axios";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import AddUser from "./AddUser";

const DisplayUsers = () => {
  const [users, setUsers] = React.useState([]);
  const [openUserForm, setOpenUserForm] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState({
    password: "",
    email: "",
    username: "",
    permission: "",
    id: "undefined",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    const response = await axios.get("http://localhost:3000/users");
    setUsers(response.data);
    setLoading(false);
  };

  const toggleCreateUser = () => {
    setOpenUserForm((user) => !user);
  };

  const updateUser = async () => {
    const response = await axios.get("http://localhost:3000/updateUser");
    console.log(response.data);
  };

  const deleteUser = async (id) => {
    setLoading(true);
    const response = await axios.post("http://localhost:3000/deleteUser", {
      id: id,
    });
    console.log(response.data);
    fetchData();
  };

  const editPressed = async (id) => {
    setLoading(true);
    const response = await axios.post("http://localhost:3000/getSingleUser", {
      id: id,
    });
    setLoading(false);
    setOpenUserForm(true);
    setData(response.data.data);
  };

  return (
    <div className="App">
      <h1>{"Select a member to assign task".toUpperCase()}</h1>
      <div className="container center">
        <div style={{ textAlign: "right" }}>
          <button onClick={toggleCreateUser}>Add New User</button>
          <button onClick={updateUser}>Update User</button>
          {openUserForm ? (
            <AddUser
              toggleCreateUser={toggleCreateUser}
              fetchData={fetchData}
              data={data}
              setData={setData}
              setLoading={setLoading}
            />
          ) : null}
          <p
            style={{
              display: "absolute",
              position: "fixed",
              top: 0,
              right: 0,
              textAlign: "center",
              fontSize: 24,
              color: "red",
              minWidth: 300,
            }}
          >
            {loading ? "Loading..." : ""}
          </p>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Permission</th>
                <th>Actions</th>
              </tr>
              {users.map((user, id) => {
                return (
                  <tr key={id}>
                    <td>
                      <Link to={`/tasks/${user.id}`}>{user.username}</Link>
                    </td>
                    <td>{user.email}</td>
                    <td>{user.permission}</td>
                    <td>
                      <button onClick={() => editPressed(user.id)}>Edit</button>
                      <button onClick={() => deleteUser(user.id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </thead>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DisplayUsers;
