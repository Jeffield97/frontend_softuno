import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import FormVisitorNote from "../Visitor/FormVisitorNote";
import { useNavigate } from "react-router-dom";

const FormLogin = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate()
  const onSubmit = async (data) => {
    await axios
      .post("http://localhost:8080/user/login", data)
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        navigate('/visitor')
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-2/12 border rounded-lg p-10">
      <h2 className="text-xl font-bold mb-4">Login usuario</h2>
      <div className="">
        <label className="label" htmlFor="username">Username</label>
        <input
        className="input input-bordered input-xs w-full max-w-xs"
          type="text"
          id="username"
        
          {...register("username", { required: true })}
        />
      </div>
      <div>
        <label className="label" htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          {...register("password", { required: true })}
          className="input input-bordered input-xs w-full max-w-xs"
        />
      </div>
      <button className="btn  btn-sm w-11/12 btn-info my-5" type="submit">Ingresar</button>
    </form>
  );
};

export default FormLogin;
