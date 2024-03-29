import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import dateHelper from "../utils/dateHelper";

const SingleEmployee = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({});
  const [loginHistory, setLoginHistory] = useState([]);
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
          `http://localhost:5000/api/employee/getemployee/${id}`,
          {
            headers: {
              Authorization: `Bearer ${currentUser.accessToken}`,
            },
          }
        );
        setFormData(res.data);
        setLoginHistory(formatLoginHistory(res.data.loginHistory));
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchData();
  }, [currentUser, id, navigate]);

  const formatLoginHistory = (loginHistory) => {
    return loginHistory.map((log, index) => {
      const formattedDate = dateHelper(log);
      return `${index + 1}. ${formattedDate}`;
    });
  };
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
        `http://localhost:5000/api/employee/updateemployee/${id}`,
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
    <div className="single-employee">
      <div>
        <form onSubmit={handleSubmit} className="form-container">
          <h2>Edit Employee Details</h2>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name || ""}
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
              value={formData.department || ""}
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
              value={formData.position || ""}
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
              value={formData.email || ""}
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
              value={formData.phoneNumber || ""}
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
              <div>
                <input
                  type="radio"
                  id="employee"
                  name="role"
                  value="Employee"
                  checked={formData.role === "Employee"}
                  onChange={handleChange}
                />
                <label htmlFor="manager">Employee</label>
                <br />
              </div>
            </div>
          </div>
          <button type="submit">Save changes</button>
        </form>

        <div className="login-history">
          <h2>Login History</h2>
          <table>
            <thead>
              <tr>
                <th>Index</th>
                <th>Logs</th>
              </tr>
            </thead>
            <tbody>
              {loginHistory.map((item, index) => (
                <tr key={index}>
                  <td>{index}</td>
                  <td>{item} </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SingleEmployee;
