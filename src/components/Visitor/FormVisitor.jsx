import React, { useState } from "react";
import "./Visitor.css";
import { useForm } from "react-hook-form";
import axios from "axios";
const FormVisitor = ({
  isVisible,
  setVisible,
  getVisitors,
  initialData,
  setInitialData,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: initialData });

  const onSubmit = async (data) => {
    setVisible(false);
    if (initialData) {
      await axios
        .put(`https://softuno.onrender.com/visitor/${initialData.id}`, data, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then(() => {
          getVisitors()
        })
        .catch((err) => console.log(err));
    } else {
      await axios
        .post("https://softuno.onrender.com/visitor", data, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then(() => getVisitors())
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="absolute w-full h-screen z-10 flex justify-center items-center">
      <div className="background-form bg-white w-full h-full absolute"></div>
      <form
        className="relative z-10 bg-slate-600 p-5 rounded-lg"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h4 className="mb-2 font-semibold text-lg">New Contact</h4>
        <div>
          <label className="label" htmlFor="fecha_ingreso">
            Fecha de ingreso
          </label>
          <input
            id="fecha_ingreso"
            type="date"
            placeholder="Type here"
            className="input input-bordered input-xs w-full max-w-xs"
            {...register("date_admission", { required: true })}
          />
        </div>
        <div>
          <label className="label" htmlFor="motivo">
            Motivo
          </label>
          <input
            id="motivo"
            type="text"
            placeholder="Type here"
            className="input input-bordered input-xs w-full max-w-xs"
            {...register("reason_visit", { required: true })}
          />
        </div>
        <div>
          <label className="label" htmlFor="nombre">
            Nombre
          </label>
          <input
            id="nombre"
            type="text"
            placeholder="Type here"
            className="input input-bordered input-xs w-full max-w-xs"
            {...register("name", { required: true })}
          />
        </div>
        <div>
          <label className="label" htmlFor="department">
            Departamento
          </label>
          <select name="department" {...register("department")}>
            <option value="ADMINISTRACION">ADMINISTRACION</option>
            <option value="PROVEEDORES">PROVEEDORES</option>
            <option value="SERVICIO AL CLIENTE">SERVICIO AL CLIENTE</option>
            <option value="VENTAS">VENTAS</option>
          </select>
        </div>
        <div>
          <label className="label" htmlFor="visit_state">
            Estado
          </label>
          <select name="visit_state" {...register("visit_state")}>
            <option value="En curso">En curso</option>
            <option value="Finalizado">Finalizado</option>
          </select>
        </div>
        <div>
          <label className="label" htmlFor="ci">
            Numero de cedula
          </label>
          <input
            // onChange={handleChange}
            id="ci"
            type="text"
            placeholder="Type here"
            // value={ci}
            className="input input-bordered input-xs w-full max-w-xs"
            {...register("ci", { required: true, pattern: /^[0-9]{10}$/ })}
          />
          {errors.ci && errors.ci.type === "pattern" && (
            <p className="error-message text-sm text-red-300">
              Por favor, ingresa un CI valido.
            </p>
          )}
        </div>
        <div>
          <button type="submit" className="btn btn-accent btn-sm mt-5 w-full">
            {initialData ? "Actualizar visitante" : "Registrar visitante"}
          </button>
        </div>
        <div>
          <button
            className="btn btn-error btn-sm mt-5 w-full"
            onClick={() => {
              setVisible(false);
              setInitialData(null);
            }}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormVisitor;
