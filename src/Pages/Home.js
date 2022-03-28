import React, { useState } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import axios from "axios";
import Footer from "../components/Footer";

function HomePage() {
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
      .post("https://fierce-dawn-27051.herokuapp.com/register", {
        email,
        password,
      })
      .then((res) => {
        const data = res.data.status;
        if (data === true) {
          alert("Registration sucessful");
          window.location.href = "/login";
        } else {
          alert("User alredy exixt please login");
        }
      });
    event.preventDefault();
    console.log(email);
  }

  return (
    <div className="row m-4">
      <h1 className="text-center col-md-12">Register</h1>
      <form onSubmit={submit} className="col-md-10 mx-auto">
        <div className="mb-3">
          <label for="exampleInputEmail1" className="form-label">
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
            id="exampleInputPassword1"
            placeholder="Enter password"
            onChange={Password}
          />
        </div>
        <div className="text-center">
          <button type="submit" className="btn btn-primary px-3 center">
            Register
          </button>
        </div>
      </form>
      <div className="text-center col-md-12">
        <Link className="btn btn-primary mt-2 px-4" to="/login">
          Log in
        </Link>
        <Footer />
      </div>
    </div>
  );
}
export default HomePage;
