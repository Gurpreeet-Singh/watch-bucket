import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/UI/Button";
import Input from "../components/UI/Input";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";
import useAuthContext from "../hooks/useAuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const login = async () => {
      try {
        const res = await signInWithEmailAndPassword(auth, email, password);
        dispatch({ type: "LOGIN", payload: res.user });
        navigate("/watched-lists");
      } catch (error) {
        console.log(error.message);
      }
    };
    login();
  };

  return (
    <div className="max-w-md mx-auto px-10 mt-10">
      <h1 className="text-4xl font-bold tracking-wider mb-10 text-center">
        Login
      </h1>
      <form onSubmit={handleSubmit}>
        <Input
          type="email"
          label="Email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="my-1"
        />
        <Input
          type="password"
          label="Paswword"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="my-1"
        />
        <Button type="submit" className="w-full">
          Login
        </Button>
      </form>
      <p className="text-center my-8">
        Don't have an account?
        <Link to="/register" className="text-yellow-600 font-medium ml-2">
          Register
        </Link>
      </p>
    </div>
  );
};

export default Login;
