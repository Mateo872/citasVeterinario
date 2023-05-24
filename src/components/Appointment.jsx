function Appointment({ appointment, deleteAppointment }) {
  return (
    <div className="col">
      <div className="card square-card mb-3">
        <div className="card-header d-flex align-items-center gap-2">
          <div
            className="rounded-circle"
            style={{
              width: "3rem",
              height: "3rem",
              backgroundColor: "#ddd",
            }}
          ></div>
          <div className="card-header-text">
            <h5 className="card-title mb-0">Mascota: {appointment.name}</h5>
            <p className="card-subtitle text-muted">
              Dueño: {appointment.owner}
            </p>
          </div>
        </div>
        <div className="card-body">
          <p>Fecha: {appointment.date}</p>
          <p>Hora: {appointment.time}</p>
          <p>Síntomas: {appointment.symptoms}</p>
        </div>
        <div className="card-footer">
          <button
            className="btn btn-danger"
            onClick={() => deleteAppointment(appointment.id)}
          >
            Borrar
          </button>
        </div>
      </div>
    </div>
  );
}

export default Appointment;
