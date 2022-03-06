import { Route, Routes } from "react-router-dom";
import DisplayUsers from "./components/DisplayUsers";
import Login from "./components/Login";
import DisplayTasks from "./components/DisplayTasks";
import { useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "./firebaseconfig";
import useNetworkConnection from "./hooks/useNetworkConnection";
import Profile from "./components/Profile";
import { LoginContext } from "./contexts/LoginContext";

function App() {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [showProfile, setShowProfile] = useState(false);
  const networkStat = useNetworkConnection();

  onAuthStateChanged(auth, (currentUser) => {
    setCurrentUser(currentUser);
  });
  const register = async () => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
      console.log(user);
    } catch (error) {
      console.log(error.message);
    }
  };

  const login = async () => {
    try {
      await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
    } catch (error) {
      console.log(error.message);
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <div className="App">
      <LoginContext.Provider value={{ setShowProfile, currentUser }}>
        {currentUser ? (
          <div>
            <Routes>
              <Route path="/" element={<DisplayUsers />} />
              <Route path="login" element={<Login />} />
              <Route path="tasks/:id" element={<DisplayTasks />} />
            </Routes>
            {showProfile ? (
              <Profile />
            ) : (
              <button onClick={() => setShowProfile(true)}>Show Profile</button>
            )}
            <button onClick={logout}>Sign out!</button>
          </div>
        ) : (
          <div>
            <h1>Register User</h1>
            <input
              placeholder="email"
              onChange={(e) => setRegisterEmail(e.target.value)}
            />
            <input
              placeholder="password"
              onChange={(e) => setRegisterPassword(e.target.value)}
            />
            <button onClick={register}>Create User</button>
            <hr />
            <h1>Sign In</h1>
            <input
              placeholder="email"
              onChange={(e) => setLoginEmail(e.target.value)}
            />
            <input
              placeholder="password"
              onChange={(e) => setLoginPassword(e.target.value)}
            />
            <button onClick={login}>Signin</button>
            <button onClick={() => {}}>Check Online Status</button>
            {networkStat ? "ONLINE" : "OFFLINE"}

            <hr />
            <h3>Signed in user {currentUser ? currentUser.email : ""}</h3>
          </div>
        )}
      </LoginContext.Provider>
    </div>
  );
}

export default App;
