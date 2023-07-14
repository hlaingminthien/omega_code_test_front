import React, { useState, useEffect } from "react";
import { createUser, getUser, updateUser } from "../services/api";
import { useParams, useNavigate } from "react-router-dom";

const UserCreate = () => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const fetchUser = async () => {
        try {
          const data = await getUser(id);
          setName(data.user.name);
          setDepartment(data.user.department);
          setPassword(data.user.password);
          setEmail(data.user.email);
          setRole(data.user.role);
        } catch (error) {
          setError("Failed to fetch user");
        }
      };

      fetchUser();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    if (id) {
      try {
        const updatedUser = {
          name,
          department,
          email,
          password,
          role,
        };

        await updateUser(id, updatedUser);
        navigate("/user"); // Redirect to the user list page after successful update
      } catch (error) {
        setError("Failed to update user");
      }
      return;
    }
    try {
      const newUser = {
        name,
        department,
        email,
        password,
        role,
      };

      await createUser(newUser);
      navigate("/user"); // Redirect to the user list page after successful creation
    } catch (error) {
      setError("Failed to create user");
    }
  };

  const handleCancel = () => {
    navigate("/user", { replace: true }); // Navigate back to the user list without adding a new entry to the history stack
  };

  const handleRoleChange = (e) => {
    const selectedRole = e.target.value;
    if (selectedRole === "admin" || selectedRole === "employee") {
      setRole(selectedRole);
    } else {
      setRole("");
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-2xl font-bold mb-4">Create New User</h2>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="flex flex-col mb-4">
          <label htmlFor="name" className="text-lg mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            className="border border-gray-300 rounded-lg px-4 py-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="flex flex-col mb-4">
          <label htmlFor="department" className="text-lg mb-2">
            Department
          </label>
          <input
            type="text"
            id="department"
            className="border border-gray-300 rounded-lg px-4 py-2"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          />
        </div>
        <div className="flex flex-col mb-4">
          <label htmlFor="email" className="text-lg mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="border border-gray-300 rounded-lg px-4 py-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex flex-col mb-4">
          <label htmlFor="role" className="text-lg mb-2">
            Role
          </label>
          <select
            id="role"
            className="border border-gray-300 rounded-lg px-4 py-2"
            value={role}
            onChange={handleRoleChange}
          >
            <option value="">Select Role</option>
            <option value="admin">Admin</option>
            <option value="employee">Employee</option>
          </select>
        </div>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleCancel}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-lg mr-2"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={!name || !department || !email || !role}
            className={"bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg"}
          >
            { id ? 'Update' : 'Create' }
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserCreate;
