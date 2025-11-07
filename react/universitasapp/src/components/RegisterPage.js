import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/service";
import "bootstrap/dist/css/bootstrap.min.css";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    full_name: "",
    major: "",
    role: "Student",
    password: "",
    password_confirmation: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (formData.password !== formData.password_confirmation) {
      setError("Password dan konfirmasi password tidak cocok.");
      return;
    }

    try {
      await registerUser(formData);
      setSuccess("Registrasi berhasil! Anda akan diarahkan ke halaman login...");
      setTimeout(() => navigate("/login"), 2000);
    } catch {
      setError("Registrasi gagal. Pastikan data sudah benar.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow-lg p-4" style={{ width: "32rem", borderRadius: "20px" }}>
        <h3 className="text-center text-primary fw-bold mb-4">Register Akun</h3>
        {error && <div className="alert alert-danger text-center">{error}</div>}
        {success && <div className="alert alert-success text-center">{success}</div>}
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label fw-semibold">Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label fw-semibold">Username</label>
              <input
                type="text"
                className="form-control"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Full Name</label>
            <input
              type="text"
              className="form-control"
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label fw-semibold">Major</label>
              <select
                className="form-select"
                name="major"
                value={formData.major}
                onChange={handleChange}
                required
              >
                <option value="">Pilih jurusan</option>
                <option value="DBT">Digital Business Technology</option>
                <option value="FoodTech">Food Technology</option>
                <option value="Business">Business</option>
                <option value="Finance">Finance</option>
              </select>
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label fw-semibold">Role</label>
              <select
                className="form-select"
                name="role"
                value={formData.role}
                onChange={handleChange}
              >
                <option value="Student">Student</option>
                <option value="Instructor">Instructor</option>
              </select>
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label className="form-label fw-semibold">Konfirmasi Password</label>
            <input
              type="password"
              className="form-control"
              name="password_confirmation"
              value={formData.password_confirmation}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100 fw-semibold">
            Register
          </button>
        </form>

        <div className="text-center mt-3">
          <span className="text-muted">Sudah punya akun? </span>
          <button
            onClick={() => navigate("/login")}
            className="btn btn-link text-decoration-none p-0"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
