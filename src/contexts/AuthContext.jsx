import React, { useContext, useState, useEffect, createContext } from "react";
import { app } from "../firebase";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

const auth = getAuth(app);

const AuthContext = createContext();

const googleProvider = new GoogleAuthProvider();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function signUp(email, password) {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      return userCredential.user;
    } catch (error) {
      console.error("Error creating account: ", error.message);
      throw error;
    }
  }

  async function logIn(email, password) {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      return userCredential.user;
    } catch (error) {
      console.error("Error signing in:", error.message);
      throw error;
    }
  }

  async function logOut() {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error logging out:", error.message);
      throw error;
    }
  }

  async function googleSignUp() {
    try {
      const userCredential = await signInWithPopup(auth, googleProvider);
      return userCredential.user;
    } catch (error) {
      console.error("Error signing in with Google:", error.message);
      throw error;
    }
  }

  async function demoAccLogIn() {
    try {
      await signInWithEmailAndPassword(
        auth,
        "windzdemoacc@windz.com",
        "demodemo"
      );
    } catch (error) {
      console.error("Error logging in with demo account:", error.message);
      throw error;
    }
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      //onAuthStateChanged returns a function which when called will unsubscribe from this onAuthStateChanged listener.
      setCurrentUser(user);
      setLoading(false);
    });
    console.log(currentUser);
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signUp,
    logIn,
    logOut,
    googleSignUp,
    demoAccLogIn,
    error,
    setError
  };
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
