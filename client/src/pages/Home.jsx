import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import axios from "axios";

const Home = () => {
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    employeeID: currentUser?.employeeID,
    userID: currentUser?._id,
  });

  const handleUserView = (userId) => {
    navigate(`/employee/${userId}`);
  };

  const handleUserDelete = async (userId) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/employee/deleteemployee/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${currentUser?.accessToken}`,
          },
        }
      );
      setUsers(users.filter((user) => user._id !== userId));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleItemView = (itemId) => {
    navigate(`/item/${itemId}`);
  };

  const handleItemDelete = async (itemId) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/employee/deletedata/${itemId}`,
        {
          headers: {
            Authorization: `Bearer ${currentUser?.accessToken}`,
          },
        }
      );
      setData(data.filter((item) => item._id !== itemId));
    } catch (error) {
      console.error("Error deleting data item:", error);
    }
  };

  const handleItemChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleItemSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/employee/createdata",
        formData,
        {
          headers: {
            Authorization: `Bearer ${currentUser?.accessToken}`,
          },
        }
      );
      setData([...data, res.data]); // Add the new data item to the state
      setFormData({ title: "", description: "" }); // Clear the form after submission
    } catch (error) {
      console.error("Error adding new data item:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (currentUser?.role === "Admin" || currentUser?.role === "Manager") {
          const res = await axios.get(
            "http://localhost:5000/api/employee/getemployees",
            {
              headers: {
                Authorization: `Bearer ${currentUser?.accessToken}`,
              },
            }
          );
          setUsers(res.data);
        }

        const res = await axios.get(
          "http://localhost:5000/api/employee/getdata",
          {
            headers: {
              Authorization: `Bearer ${currentUser?.accessToken}`,
            },
          }
        );
        setData(res.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (!currentUser) {
      navigate("/login");
    } else {
      fetchData();
    }
  }, [currentUser, navigate]);

  return (
    <div className="home">
      <img src={
              currentUser?.image ? `../upload/${currentUser?.image}` : ""
            } alt="Profile" />
      <h2>Hey, {currentUser?.name}</h2>
      {(currentUser?.role === "Admin" || currentUser?.role === "Manager") && (
        <>
          <h1>User List</h1>
          <table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Position</th>
                <th>Department</th>
                <th>Email</th>
                <th>Role</th>
                {currentUser?.role === "Admin" && <th>View</th>}
                {currentUser?.role === "Admin" && <th>Delete</th>}
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user.employeeID}</td>
                  <td>{user.name} </td>
                  <td>{user.position}</td>
                  <td>{user.department}</td>
                  <td>{user.email} </td>
                  <td>{user.role} </td>
                  {currentUser?.role === "Admin" && (
                    <td>
                      <button onClick={() => handleUserView(user._id)}>
                        View
                      </button>
                    </td>
                  )}
                  {currentUser?.role === "Admin" && (
                    <td>
                      <button onClick={() => handleUserDelete(user._id)}>
                        Delete
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
          <hr />
        </>
      )}
      <h1>Add New Data</h1>
      <form onSubmit={handleItemSubmit}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          onChange={handleItemChange}
          value={formData.title}
          id="title"
          name="title"
        />
        <label htmlFor="description">Description:</label>
        <input
          type="text"
          onChange={handleItemChange}
          value={formData.description}
          id="description"
          name="description"
        />
        <button type="submit">Add</button>
      </form>
      <h1>Data List</h1>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>View</th>
            {currentUser?.role !== "Employee" && <th>Delete</th>}
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item._id}>
              <td>{item.title}</td>
              <td>{item.description} </td>
              <td>
                <button onClick={() => handleItemView(item._id)}>View</button>
              </td>
              {currentUser?.role !== "Employee" && (
                <td>
                  <button onClick={() => handleItemDelete(item._id)}>
                    Delete
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
