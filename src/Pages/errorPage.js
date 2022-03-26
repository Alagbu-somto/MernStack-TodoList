import React from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

function Test() {
  return (
    <div className="text-center">
      <h1> Log in not sucessfully </h1>
      <h1> kindly go back to the log in page </h1>
      <Link className="btn btn-primary mt-2 px-4" to="/login">
        Login
      </Link>
      <Footer />
    </div>
  );
}
export default Test;
