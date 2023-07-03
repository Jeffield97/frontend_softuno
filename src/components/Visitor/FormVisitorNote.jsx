import axios from "axios";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
const FormVisitorNote = ({ setisVisible, initialData, getVisitors }) => {
  const { register, handleSubmit } = useForm();
  const [note, setnote] = useState(null);

  const onSubmit = async (data) => {
    console.log(data);
    await axios
      .put(`http://localhost:8080/visitor/addNote/${initialData}`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then(() => {
        getVisitors();
        setisVisible(false);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="absolute w-full h-screen z-10 flex justify-center items-center">
      <div className="background-form bg-white w-full h-full absolute"></div>
      <form
        className="relative z-10 bg-slate-600 p-5 rounded-lg"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h4 className="mb-2 font-semibold text-lg">Add Note</h4>
        <div>
          <label className="label" htmlFor="fecha_ingreso">
            Nota
          </label>
          <textarea
            id="note"
            type="date"
            placeholder="Type here"
            className="input input-bordered input-xs w-full max-w-xs h-32 w-64"
            rows={400}
            cols={50}
            {...register("note", { required: true })}
          />
        </div>

        <div>
          <button type="submit" className="btn btn-accent btn-sm mt-5 w-full">
            Agregar nota
          </button>
        </div>
        <div>
          <button
            className="btn btn-error btn-sm mt-5 w-full"
            onClick={() => {
              setisVisible(false);
            }}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormVisitorNote;
