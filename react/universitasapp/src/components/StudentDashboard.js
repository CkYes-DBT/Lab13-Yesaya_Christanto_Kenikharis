import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const StudentDashboard = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Ambil data dari localStorage
    const token = localStorage.getItem("access_token");
    const role = localStorage.getItem("role");

    if (!token || role !== "student") {
      // Tidak ada token atau bukan student → paksa ke login
      window.location.href = "/login";
      return;
    }

    const email = localStorage.getItem("email");
    const username = localStorage.getItem("username");
    const full_name = localStorage.getItem("full_name");
    const major = localStorage.getItem("major");

    setUser({ email, username, full_name, major, role });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("email");
    localStorage.removeItem("username");
    localStorage.removeItem("full_name");
    localStorage.removeItem("major");
    localStorage.removeItem("role");

    // Redirect ke login setelah logout
    window.location.href = "/login";
  };

  if (!user) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow-lg p-4" style={{ width: "25rem", borderRadius: "16px" }}>
        <h3 className="text-center text-primary mb-4 fw-bold">Student Dashboard</h3>
        <div className="mb-3">
          <p className="mb-1">
            <strong>Full Name:</strong> {user.full_name}
          </p>
          <p className="mb-1">
            <strong>Email:</strong> {user.email}
          </p>
          <p className="mb-1">
            <strong>Major:</strong> {user.major}
          </p>
          <p className="text-success fw-semibold mt-3">
            Role: {user.role.toUpperCase()}
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="btn btn-danger w-100 fw-semibold mt-3"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default StudentDashboard;
