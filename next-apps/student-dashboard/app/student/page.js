import Link from "next/link";
import { students } from "../data/students";

export default function Student() {
  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Student Dashboard</h1>
      <p className="mb-4">Click on a student to view details 👇</p>

      <ul className="space-y-2">
        {students.map((s) => (
          <li key={s.id}>
            <Link
              href={`/student/${s.id}`}
              className="text-blue-600 hover:underline"
            >
              {s.name}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}