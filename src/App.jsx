import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";

import Appointment from "./components/Appointment";

function App() {
  const [appointments, setAppointments] = useState(() => {
    const storedAppointments = localStorage.getItem("appointments");
    return storedAppointments ? JSON.parse(storedAppointments) : [];
  });

  const [name, setName] = useState("");
  const [owner, setOwner] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [symptoms, setSymptoms] = useState("");

  useEffect(() => {
    const storedAppointments = localStorage.getItem("appointments");

    if (storedAppointments) {
      setAppointments(JSON.parse(storedAppointments));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("appointments", JSON.stringify(appointments));
  }, [appointments]);

  function addAppointment(e) {
    e.preventDefault();

    if (
      name.trim() === "" ||
      owner.trim() === "" ||
      date.trim() === "" ||
      time.trim() === "" ||
      symptoms.trim() === ""
    ) {
      return;
    }

    const newAppointment = {
      id: Date.now(),
      name,
      owner,
      date,
      time,
      symptoms,
    };

    setAppointments([...appointments, newAppointment]);
    setName("");
    setOwner("");
    setDate("");
    setTime("");
    setSymptoms("");
  }

  function deleteAppointment(id) {
    const updatedAppointments = appointments.filter((appointment) => {
      return appointment.id !== id;
    });
    setAppointments(updatedAppointments);
  }

  return (
    <div className="container">
      <h1 className="mb-4">Veterinaria</h1>
      <form onSubmit={addAppointment}>
        <div className="row mb-3">
          <div className="col">
            <label htmlFor="name" className="form-label">
              Nombre de la mascota
            </label>
            <input
              maxLength={10}
              type="text"
              className="form-control"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="col">
            <label htmlFor="owner" className="form-label">
              Nombre del dueño
            </label>
            <input
              maxLength={10}
              type="text"
              className="form-control"
              id="owner"
              value={owner}
              onChange={(e) => setOwner(e.target.value)}
            />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col">
            <label htmlFor="date" className="form-label">
              Fecha
            </label>
            <input
              type="date"
              className="form-control"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div className="col">
            <label htmlFor="time" className="form-label">
              Hora
            </label>
            <input
              type="time"
              className="form-control"
              id="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="symptoms" className="form-label">
            Síntomas
          </label>
          <textarea
            maxLength={50}
            className="form-control"
            id="symptoms"
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">
          Agregar cita
        </button>
      </form>
      <div className="row mt-4" style={{ flexWrap: "wrap" }}>
        {appointments.length === 0 ? (
          <p>No hay citas</p>
        ) : (
          appointments.map((appointment) => (
            <Appointment
              key={appointment.id}
              appointment={appointment}
              deleteAppointment={deleteAppointment}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default App;
