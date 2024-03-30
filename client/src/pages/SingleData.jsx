import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/authContext";

const SingleData = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!currentUser) {
          navigate("/login");
          return;
        }

        const res = await axios.get(
          `http://localhost:5000/api/employee/getdata/${id}`,
          {
            headers: {
              Authorization: `Bearer ${currentUser.accessToken}`,
            },
          }
        );
        setFormData(res.data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchData();
  }, [currentUser, id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `http://localhost:5000/api/employee/updatedata/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${currentUser.accessToken}`,
          },
        }
      );
      console.log(res);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <h2>Edit Data Details</h2>
      <form onSubmit={handleSubmit} className="form-container">
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title || ""}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            id="description"
            name="description"
            value={formData.description || ""}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Save changes</button>
      </form>
    </div>
  );
};

export default SingleData;
