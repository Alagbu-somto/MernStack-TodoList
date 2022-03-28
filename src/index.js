import ReactDOM from "react-dom";
import App from "./components/App";
import store from "./components/store";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TextArea from "./Pages/textArea";
import Login from "./Pages/login";
import Test from "./Pages/errorPage";
import { Provider } from "react-redux";
import "./app.css";

function check() {
  const testi = localStorage.getItem("hey");
  console.log(testi);
  // console.log(log);
  return testi;
}

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="login" element={<Login />} />
        <Route
          path="textArea"
          element={check() === "true" ? <TextArea /> : <Test />}
        />
        {/* <Route path="action" element={<Test />} /> */}
      </Routes>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
