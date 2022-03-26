import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import store from "../components/store";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

function Login() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // STORE TEXT
  function Email(event) {
    setEmail(event.target.value);
  }
  function Password(event) {
    setPassword(event.target.value);
  }
  function submit(event) {
    axios
      .post("http://localhost:5000/login", { email, password })
      .then((res) => {
        console.log(res);
        const data = res.data.status;
        dispatch({
          type: "Check",
          payload: data,
        });
        const state = store.getState();
        const log = state.loggedReducer;
        console.log(data);
        localStorage.setItem("hey", JSON.stringify(data));
        localStorage.setItem("email", JSON.stringify(email));
        localStorage.setItem("password", JSON.stringify(password));
        const test = () => "test";
        if (test() === "test") {
          console.log("it worked");
        } else {
          console.log("not working");
        }
        if (log === true) {
          alert("Log in sucessful");
          window.location.href = "/textArea";
        } else {
          alert(
            " Log in not sucesful please check your email and password and try again"
          );
          window.location.href = "/textArea";
        }
      });

    event.preventDefault();
  }

  return (
    <div>
      <h1 className="text-center">Login</h1>
      <form onSubmit={submit}>
        <div className="mb-3">
          <label for="exampleInputEmail1" className="form-label text-center">
            Email address
          </label>
          <input
            type="email"
            className="form-control p-3"
            id="exampleInputEmail1"
            placeholder="Enter email adrees"
            aria-describedby="emailHelp"
            onChange={Email}
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control p-3"
            placeholder="Enter password"
            id="exampleInputPassword1"
            onChange={Password}
          />
        </div>
        <div className="text-center">
          <button type="submit" className="btn btn-primary px-3 center">
            Log in
          </button>
        </div>
      </form>
      <div className="text-center">
        <Link className="btn btn-primary mt-2 px-4" to="/">
          Register
        </Link>
      </div>
      <Footer />
    </div>
  );
}
export default Login;
