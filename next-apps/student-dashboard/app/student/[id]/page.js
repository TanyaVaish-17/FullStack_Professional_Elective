import { students } from "../../data/students";

export default async function StudentDetail({ params }) {
  const { id } = await params;

  const student = students.find((s) => s.id === id);

  if (!student) {
    return <h2>Student not found</h2>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Student Details</h1>
      <p><b>Name:</b> {student.name}</p>
      <p><b>Age:</b> {student.age}</p>
      <p><b>Course:</b> {student.course}</p>
    </div>
  );
}