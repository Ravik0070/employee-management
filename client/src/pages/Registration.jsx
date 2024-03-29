import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";

const Registration = () => {
  const [formData, setFormData] = useState({
    name: "",
    department: "",
    position: "",
    email: "",
    phoneNumber: "",
    image: "",
    password: "",
    confirmPassword: "",
    role: "Employee",
  });
  const { currentUser } = useContext(AuthContext);
  const [file, setFile] = useState();
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const upload = async () => {
    try {
      const imageData = new FormData();
      imageData.append("file", file);
      const res = await axios.post(
        "http://localhost:5000/api/upload",
        imageData
      );
      return res.data;
    } catch (error) {}
  };
  const handleImageChange = async (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let imageUrl = formData.image;
      if (file) {
        imageUrl = await upload();
      }
      const updatedFormData = {
        ...formData,
        image: imageUrl,
      };
      await axios.post("http://localhost:5000/api/auth/register", updatedFormData);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, []);
  return (
    <>
      <form onSubmit={handleSubmit} className="register form-container">
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="department">Department:</label>
          <input
            type="text"
            id="department"
            name="department"
            value={formData.department}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="position">Position:</label>
          <input
            type="text"
            id="position"
            name="position"
            value={formData.position}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Role:</label>
          <br />
          <div className="radio-options">
            <div>
              <input
                type="radio"
                id="admin"
                name="role"
                value="Admin"
                checked={formData.role === "Admin"}
                onChange={handleChange}
              />
              <label htmlFor="admin">Admin</label>
              <br />
            </div>
            <div>
              <input
                type="radio"
                id="manager"
                name="role"
                value="Manager"
                checked={formData.role === "Manager"}
                onChange={handleChange}
              />
              <label htmlFor="manager">Manager</label>
              <br />
            </div>
          </div>
          <span>Note: If you are employee, ignore this field.</span>
        </div>
        <div>
          <label htmlFor="image">Image:</label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleImageChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
      <span>
        Don't you have an account?
        <Link className="link" to="/login">
          Login
        </Link>
      </span>
    </>
  );
};

export default Registration;
