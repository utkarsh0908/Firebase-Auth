import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithRedirect,
} from "firebase/auth";

import { auth } from "../firebase/config";

const SignupModal = () => {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [userStatus, setUserStatus] = useState(false);
  const [user, setUser] = useState({})

  const provider = new GoogleAuthProvider();

  const signInWithGoogle = () => {
    signInWithRedirect(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const x = result.user;
        setUser(x);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUserStatus(true);
    } else setUserStatus(false);
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
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      setUser(user)
      console.log(user);
    } catch (error) {
      console.log(error.message);
    }
  };
  const logout = async () => {
    signOut(auth);
    console.log("user signed out");
  };
  return (
    <>
      <div className="m-2">
        {!userStatus && (
          <div>
            <input
              className="border rounded-md m-2 px-4 py-2"
              placeholder="Email..."
              value={registerEmail}
              onChange={(event) => {
                setRegisterEmail(event.target.value);
              }}
            />
            <input
              className="border rounded-md m-2 px-4 py-2"
              placeholder="Password..."
              value={registerPassword}
              onChange={(event) => {
                setRegisterPassword(event.target.value);
              }}
            />
            <button className="btn" onClick={register}>
              Sign up
            </button>
          </div>
        )}
        {!userStatus && (
          <div>
            <input
              className="border rounded-md m-2 px-4 py-2"
              placeholder="Email..."
              value={loginEmail}
              onChange={(event) => setLoginEmail(event.target.value)}
            />
            <input
              className="border rounded-md m-2 px-4 py-2"
              placeholder="Password..."
              value={loginPassword}
              onChange={(event) => setLoginPassword(event.target.value)}
            />
            <button className="btn" onClick={login}>
              Login
            </button>
          </div>
        )}
        {!userStatus && 
        <button className="btn" onClick={signInWithGoogle}>
          Login with google
        </button>
        }
        {userStatus && (
          <button className="btn" onClick={logout}>
            Logout
          </button>
        )}
      </div>
    </>
  );
};

export default SignupModal;
