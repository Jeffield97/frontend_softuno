import axios from "axios";
import React, { useEffect, useState } from "react";
import Visitor from "../../components/Visitor/Visitor";
import "./Visitor.css";
import FormVisitor from "../../components/Visitor/FormVisitor";
import FormVisitorNote from "../../components/Visitor/FormVisitorNote";
import { useNavigate } from "react-router-dom";
const Visitors = () => {
  const [visitors, setvisitors] = useState([]);
  const [formVisitor, setformVisitor] = useState(false);
  const [initialDataForm, setinitialDataForm] = useState(null);
  const [isVisible, setisVisible] = useState(false);
  const navigate = useNavigate();
  const getVisitors = async () => {
    await axios
      .get("http://localhost:8080/visitor")
      .then((response) => setvisitors(response.data))
      .catch((error) => {
        console.log(error);
      });
  };
  const logout = () => {
    localStorage.clear();
    navigate("/");
  };
  useEffect(() => {
    getVisitors();
    console.log(visitors);
  }, []);

  return (
    <div className="relative">
      {formVisitor && (
        <FormVisitor
          isVisible={formVisitor}
          setVisible={setformVisitor}
          getVisitors={getVisitors}
          initialData={initialDataForm}
          setInitialData={setinitialDataForm}
        ></FormVisitor>
      )}
      {isVisible && (
        <FormVisitorNote
          setisVisible={setisVisible}
          initialData={initialDataForm}
          getVisitors={getVisitors}
        ></FormVisitorNote>
      )}
      <div className="flex justify-start sticky bg-slate-400 top-0 z-10">
        {JSON.parse(localStorage.getItem("user")).rol ===
          "RECEPCION"&&(
            <button
              className="btn btn-accent absolute left-5 btn-sm my-16"
              onClick={() => setformVisitor(true)}
            >
              New Visitor +
            </button>
          )}
      </div>
      <div className="flex justify-start sticky bg-slate-400 top-0 z-10">
        <button
          className="btn btn-error absolute right-5 btn-sm my-16"
          onClick={logout}
        >
          Logout
        </button>
      </div>
      <div className="relative max-w-6xl mx-auto">
        <h1 className="font-semibold my-5 text-2xl">VISITORS</h1>
        <div className="overflow-y-auto max-h-table">
          {visitors.length && (
            <table className="table  table-pin-rows table-pin-cols">
              <thead>
                <tr>
                  <th className="bg-slate-700 font-extrabold text-slate-300 text-sm">
                    Motivo
                  </th>
                  <th className="bg-slate-700 font-extrabold text-slate-300 text-sm">
                    Fecha
                  </th>
                  <th className="bg-slate-700 font-extrabold text-slate-300 text-sm">
                    Nombre
                  </th>
                  <th className="bg-slate-700 font-extrabold text-slate-300 text-sm">
                    Cedula
                  </th>
                  <th className="bg-slate-700 font-extrabold text-slate-300 text-sm">
                    Departamento
                  </th>
                  <th className="bg-slate-700 font-extrabold text-slate-300 text-sm">
                    Estado
                  </th>
                  <th className="bg-slate-700 font-extrabold text-slate-300 text-sm">
                    Nota
                  </th>
                  <th className="bg-slate-700"></th>
                  {JSON.parse(localStorage.getItem("user")).rol ===
                    "RECEPCION" && <th className="bg-slate-700"></th>}
                </tr>
              </thead>
              <tbody>
                {visitors.map((visitor) => (
                  <Visitor
                    visitor={visitor}
                    setformVisitor={setformVisitor}
                    setinitialDataForm={setinitialDataForm}
                    key={visitor.id}
                    getVisitors={getVisitors}
                    setisVisible={setisVisible}
                  ></Visitor>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Visitors;
