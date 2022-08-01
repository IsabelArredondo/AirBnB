import React from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
 import './demo.css'

export default function DemoUser() {
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = "john.smith@gmail.com";
    const password = "secret password";
    return dispatch(sessionActions.login({ email, password }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <button className="demoUserButton" type="submit">Demo User</button>
    </form>
  );
}