import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/UI/Button";
import Input from "../components/UI/Input";
import { auth } from "../firebase/config";
import useAuthContext from "../hooks/useAuthContext";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const navigate = useNavigate();
  const { dispatch } = useAuthContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    const register = async () => {
      try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(res.user, { displayName: name });
        await setDoc(doc(db, "watchedLists", res.user.uid), {
          ownerName: name,
          watchedList: [],
        });
        dispatch({ type: "LOGIN", payload: res.user });
        navigate("/watched-lists");
      } catch (error) {
        console.log(error);
      }
    };
    register();
  };
  return (
    <div className="max-w-md mx-auto px-10 mt-10">
      <h1 className="text-4xl font-bold tracking-wider mb-10 text-center">
        Register
      </h1>
      <form onSubmit={handleSubmit}>
        <Input
          type="name"
          label="Name"
          id="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          type="email"
          label="Email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          label="Paswword"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {/* <Input
          type="password"
          label="Confirm Paswword"
          id="confirm password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        /> */}
        <Button type="submit" className="w-full">
          Register
        </Button>
      </form>
      <p className="text-center my-8">
        Already have an account?
        <Link to="/login" className="text-yellow-600 font-medium ml-2">
          Login
        </Link>
      </p>
    </div>
  );
};

export default Register;
