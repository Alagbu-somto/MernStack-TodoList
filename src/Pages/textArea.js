import React, { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

function TextArea() {
  const dispatch = useDispatch();
  const [Text, setText] = useState("");

  const todo = useSelector((state) => state.reducer.todos);

  // ..............Logged in screen................
  const email = localStorage.getItem("email");
  const password = localStorage.getItem("password");
  axios
    .post("https://fierce-dawn-27051.herokuapp.com/screen", {
      email,
      password,
    })
    .then((res) => {
      const array = res.data.screen;
      dispatch({
        type: "AddList",
        payload: {
          array,
          id: "",
        },
      });
    });

  // STORE TEXT
  function changeText(event) {
    setText(event.target.value);
  }

  //  .............UPDATING OUR STATE AND DB WITH ADDED ITMES................

  const UpdateText = (event) => {
    // Make a post request

    const Id = Math.floor(Math.random() * 100);
    const email = localStorage.getItem("email");
    const password = localStorage.getItem("password");
    axios
      .post("https://fierce-dawn-27051.herokuapp.com/list", {
        name: Text,
        ID: Id,
        email,
        password,
      })
      .then((res) => {
        const array = res.data.good;
        dispatch({
          type: "AddList",
          payload: {
            array,
            id: "",
          },
        });
      });

    event.preventDefault();
  };

  // .............DELETE ADDED ITEMS FROM THE LIST.................
  function DeleteItem(myID) {
    const email = localStorage.getItem("email");
    const password = localStorage.getItem("password");
    console.log(email);
    console.log(password);
    axios
      .post("https://fierce-dawn-27051.herokuapp.com/delete", {
        ID: myID,
        email,
        password,
      })
      .then((res) => {
        console.log(res.data.good);
        const array = res.data.good;
        dispatch({
          type: "DeleteList",
          payload: array,
        });
      });
  }
  let today = new Date();
  let options = {
    weekday: "long",
    month: "long",
    year: "numeric",
  };

  let sday = today.toLocaleDateString("en-Us", options);
  return (
    <div className="row m-4">
      <h3 className="text-center text-white col-md-12">
        Hey Welcome to Your Todo-list!
      </h3>
      <h5 className="text-center text-white col-md-12">{sday}</h5>
      <div className="container col-md-12">
        <h1 className="heading"> Todo-List</h1>
        <div className="form">
          <form onSubmit={UpdateText}>
            <input
              className="bg-input text-dark rounded-lg w-75"
              onChange={changeText}
              type="text"
              name="todoItems"
              placeholder="Write out your list"
            />
            <button type="submit" className="button">
              Save
            </button>
          </form>
        </div>

        <div>
          {todo.map((item) => {
            const myID = item.ID;
            return (
              <p className="box">
                <button className="icon button">
                  <AiOutlineDelete
                    onClick={() => {
                      return DeleteItem(myID);
                    }}
                  />
                </button>
                {item.list}
              </p>
            );
          })}
        </div>
      </div>
      <div className="text-center col-md-12">
        <Link className="btn btn-primary mt-2 px-4" to="/login">
          Logout
        </Link>
        <Footer />
      </div>
    </div>
  );
}

export default TextArea;
