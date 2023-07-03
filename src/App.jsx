import { useDispatch } from "react-redux";
import "./App.css";
import { useEffect } from "react";
import { addUser } from "./redux/userSlice";
import { Outlet } from "react-router-dom";

function App() {
  const userData = {
    name: "Jeffield",
    email: "Jeffield@email.com",
    username: "Jeffield7",
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(addUser(userData));
  }, []);

  return (
    <div className="">
      <Outlet></Outlet>
    </div>
  );
}

export default App;
