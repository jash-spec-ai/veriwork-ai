import { useState } from "react"
import { Link } from "react-router-dom"
const requisitionData = [
  {
    id: "python-developer",
    title: "Python Developer",
    department: "Engineering",
    location: "Vadodara",
    candidates: 12,
    status: "Open",
    updated: "Aug 14, 2026"
  },
  {
    id: "backend-engineer",
    title: "Backend Engineer",
    department: "Engineering",
    location: "Remote",
    candidates: 8,
    status: "Open",
    updated: "Aug 13, 2026"
  },
  {
    id: "ml-engineer",
    title: "ML Engineer",
    department: "AI / ML",
    location: "Bangalore",
    candidates: 15,
    status: "Open",
    updated: "Aug 12, 2026"
  },
  {
    id: "frontend-developer",
    title: "Frontend Developer",
    department: "Product",
    location: "Mumbai",
    candidates: 6,
    status: "Closed",
    updated: "Aug 10, 2026"
  },
  {
    id: "data-analyst",
    title: "Data Analyst",
    department: "Analytics",
    location: "Ahmedabad",
    candidates: 10,
    status: "Open",
    updated: "Aug 9, 2026"
  }
]

function Requisitions() {

  const [search, setSearch] = useState("")
  const [status, setStatus] = useState("All")

  const filteredRequisitions = requisitionData.filter((req) => {

    const matchesSearch =
      req.title.toLowerCase().includes(search.toLowerCase()) ||
      req.department.toLowerCase().includes(search.toLowerCase())

    const matchesStatus =
      status === "All" || req.status === status

    return matchesSearch && matchesStatus
  })

  return (
    <div>

      <div className="page-header requisition-header">

        <div>
          <h1>Requisitions</h1>
          <p>View and manage job openings.</p>
        </div>

        <button className="create-button">
          + Create Requisition
        </button>

      </div>

      <div className="requisition-filters">

        <input
          type="text"
          placeholder="Search requisitions..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="All">All Statuses</option>
          <option value="Open">Open</option>
          <option value="Closed">Closed</option>
        </select>

      </div>

      <div className="requisition-table">

        <div className="requisition-table-header">

          <span>REQUISITION</span>
          <span>DEPARTMENT</span>
          <span>LOCATION</span>
          <span>CANDIDATES</span>
          <span>STATUS</span>
          <span>UPDATED</span>

        </div>

        {filteredRequisitions.map((req) => (

          <div
            className="requisition-row"
            key={req.id}

          >
            <div>
           <Link
           to={`/requisitions/${req.id}`}
           className="requisition-link"
           >
    {req.title}
  </Link>
</div>

            

            <span>{req.department}</span>

            <span>{req.location}</span>

            <span>{req.candidates}</span>

            <span>
              <span
                className={
                  req.status === "Open"
                    ? "req-status open"
                    : "req-status closed"
                }
              >
                {req.status === "Open" ? "🟢 " : "⚪ "}
                {req.status}
              </span>
            </span>

            <span>{req.updated}</span>

          </div>

        ))}

        {filteredRequisitions.length === 0 && (

          <div className="no-requisitions">
            No requisitions found.
          </div>

        )}

      </div>

    </div>
  )
}

export default Requisitions