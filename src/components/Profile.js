import React, { useContext } from "react";
import { LoginContext } from "../contexts/LoginContext";

function Profile() {
  const { setShowProfile, currentUser } = useContext(LoginContext);

  return (
    <div>
      <h1>Profile</h1>
      <p>email: {currentUser.email}</p>
      <button onClick={() => setShowProfile(false)}>hide profile</button>
    </div>
  );
}

export default Profile;
