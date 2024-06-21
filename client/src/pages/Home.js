import React, { useEffect, useState } from "react";
import { useStudentsContext } from "../hooks/useStudentContext";
import StudentDetails from "../components/StudentsDetails";
import StudentForm from "../components/StudentForm";

const Home = () => {
  const { students, dispatch } = useStudentsContext();
  const [showForm, setShowForm] = useState(false); // State to manage form visibility

  useEffect(() => {
    const fetchStudents = async () => {
      const response = await fetch("/api/students");
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_STUDENTS", payload: json });
      }
    };

    fetchStudents();
  }, [dispatch]);

  const toggleForm = () => {
    setShowForm((prevShowForm) => !prevShowForm); // Toggle form visibility
  };

  return (
    <div >
      <button
        onClick={toggleForm}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        {showForm ? "Hide Form" : "Add Student"} {/* Toggle button label based on form visibility */}
      </button>
      {showForm && <StudentForm />} {/* Render form if showForm is true */}
      <div className="flex flex-col gap-4">
        {students &&
          students.map((student) => (
            <StudentDetails student={student} key={student._id} />
          ))}
      </div>
    </div>
  );
};

export default Home;
