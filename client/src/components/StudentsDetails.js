import Modal from "@material-ui/core/Modal";
import React, { useState } from "react";
import { useStudentsContext } from "../hooks/useStudentContext";

const StudentDetails = ({ student }) => {
  const [name, setName] = useState(student.name);
  const [imagePreview, setImagePreview] = useState(student.image);
  const [image, setImage] = useState("");
  const [age, setAge] = useState(student.age);
  const [status, setStatus] = useState(student.status);
  const [error, setError] = useState(null);

  const { dispatch } = useStudentsContext();

  const [modalState, setModalState] = useState(false);

  const showModal = () => {
    setModalState(true);
  };

  const hideModal = () => {
    setModalState(false);
  };

  const handleDelete = async () => {
    const res = await fetch("/api/students/" + student._id, {
      method: "DELETE",
    });
    const json = await res.json();

    if (res.ok) {
      dispatch({ type: "DELETE_STUDENT", payload: json });
    }
  };

  const handleImageChange = (e) => {
    const reader = new FileReader();

    reader.readAsDataURL(e.target.files[0]);

    reader.onload = () => {
      setImage(reader.result);
      setImagePreview(reader.result);
    };
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    let studentImage = "";

    if (image === "") {
      studentImage = student.image;
    } else {
      studentImage = image;
    }

    if (name === "" || age === "" || status === "") {
      setError("All fields are required");
      return;
    }

    const studentData = { name, image: studentImage, age, status };

    const response = await fetch("/api/students/" + student._id, {
      method: "PUT",
      body: JSON.stringify(studentData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();

    console.log("updated Data", json);

    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
      setError(null);
      dispatch({ type: "UPDATE_STUDENT", payload: json });
      hideModal();
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="p-4 bg-white shadow-md rounded-lg mb-2">
        <h4 className="text-xl font-bold">{student.name}</h4>
        <img src={student.image} height="200px" width="200px" className="my-4" />
        <p>
          <strong>Age: </strong>
          {student.age}
        </p>
        <p>
          <strong>Status: </strong>
          {student.status}
        </p>
        <button
          onClick={showModal}
          className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
        >
          MODIFY
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white px-4 py-2 rounded mt-4 ml-2"
        >
          DELETE
        </button>
      </div>
      <Modal
        onClose={hideModal}
        open={modalState}
        className="flex items-center justify-center"
      >
        <div className="bg-white p-8 rounded-lg shadow-md">
          <form onSubmit={handleUpdate}>
            <h3 className="text-2xl font-bold mb-4">Update Student</h3>

            <label className="block mb-2">Name:</label>
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
              className="block w-full p-2 border rounded mb-4"
            />

            <label className="block mb-2">Image:</label>
            <img src={imagePreview} width="100px" height="100px" className="mb-2" />
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

            <button className="bg-green-500 text-white px-4 py-2 rounded">
              Update Student
            </button>
            {error && <div className="text-red-500 mt-2">{error}</div>}
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default StudentDetails;
