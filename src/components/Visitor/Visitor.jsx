import axios from "axios";
import React from "react";
const Visitor = ({
  visitor,
  setformVisitor,
  setinitialDataForm,
  getVisitors,
  setisVisible,
}) => {
  const handleDelete = async (id) => {
    await axios
      .delete(`http://localhost:8080/visitor/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then(() => {
        getVisitors();
      })
      .catch((err) => console.log(err));
  };
  const handleUpdate = () => {
    setformVisitor(true);
    setinitialDataForm(visitor);
  };
  const handleAddNote = (id) => {
    setisVisible(true);
    setinitialDataForm(id);
  };
  return (
    <tr className="bg-slate-800">
      <td className="">{visitor.reason_visit}</td>
      <td className="">{visitor.date_admission}</td>
      <td className="">{visitor.name}</td>
      <td className="">{visitor.ci}</td>
      <td className="">{visitor.department}</td>
      <td className="">{visitor.visit_state}</td>
      <td className="">{visitor.note}</td>
      {JSON.parse(localStorage.getItem("user")).rol === "RECEPCION" && (
        <td className="px-4">
          <button
            className="btn btn-sm btn-outline"
            onClick={() => handleUpdate(visitor)}
          >
            Editar
          </button>
        </td>
      )}

      {JSON.parse(localStorage.getItem("user")).rol === "RECEPCION" && (
        <td className="px-4">
          <button
            className="btn btn-sm btn-outline btn-error"
            onClick={() => handleDelete(visitor.id)}
          >
            Eliminar
          </button>
        </td>
      )}
      {JSON.parse(localStorage.getItem("user")).rol === "SUPERVISOR" && (
        <td className="px-4">
          <button
            className="btn btn-sm btn-outline btn-accent"
            onClick={() => handleAddNote(visitor.id)}
          >
            Add Note
          </button>
        </td>
      )}
    </tr>
  );
};

export default Visitor;
