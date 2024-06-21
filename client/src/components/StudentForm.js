import React, { useState } from "react";
import { useStudentsContext } from "../hooks/useStudentContext";

const StudentForm = () => {
  const { dispatch } = useStudentsContext();

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [age, setAge] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState(null);

  const handleImageChange = (e) => {
    const reader = new FileReader();

    reader.readAsDataURL(e.target.files[0]);

    reader.onload = () => {
      setImage(reader.result);
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const student = { name, image, age, status };

    const response = await fetch("/api/students", {
      method: "POST",
      body: JSON.stringify(student),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
      setError(null);
      setName("");
      setImage("");
      setAge("");
      setStatus("");
      dispatch({ type: "CREATE_STUDENT", payload: json });
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold mb-4">Add New Student</h3>

        <label className="block mb-2">Name:</label>
        <input
          type="text"
          onChange={(e) => setName(e.target.value)}
          value={name}
          className="block w-full p-2 border rounded mb-4"
        />

        <label className="block mb-2">Image:</label>
        <input
          type="file"
          accept="image/png, image/jpeg"
          onChange={handleImageChange}
          className="block w-full p-2 border rounded mb-4"
        />

        <label className="block mb-2">Age:</label>
        <input
          type="number"
          onChange={(e) => setAge(e.target.value)}
          value={age}
          className="block w-full p-2 border rounded mb-4"
        />

        <label className="block mb-2">Status:</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="block w-full p-2 border rounded mb-4"
        >
          <option value="ACTIVE">Active</option>
          <option value="INACTIVE">Inactive</option>
        </select>

        <button className="bg-blue-500 text-white px-4 py-2 rounded mt-4 w-full">Add Student</button>
        {error && <div className="text-red-500 mt-2">{error}</div>}
      </form>
    </div>
  );
};

export default StudentForm;
