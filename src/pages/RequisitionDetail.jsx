import { useParams, Link } from "react-router-dom"

const requisitions = {
  "python-developer": {
    title: "Python Developer",
    department: "Engineering",
    location: "Vadodara",
    status: "Open",
    candidates: 12,
    description:
      "Looking for a Python developer to build and maintain backend applications.",
    skills: ["Python", "FastAPI", "SQL"]
  },

  "backend-engineer": {
    title: "Backend Engineer",
    department: "Engineering",
    location: "Remote",
    status: "Open",
    candidates: 8,
    description:
      "Backend engineer responsible for APIs, databases and server-side applications.",
    skills: ["Python", "Node.js", "SQL"]
  },

  "ml-engineer": {
    title: "ML Engineer",
    department: "AI / ML",
    location: "Bangalore",
    status: "Open",
    candidates: 15,
    description:
      "Machine learning engineer working on intelligent data-driven applications.",
    skills: ["Python", "Machine Learning", "TensorFlow"]
  },

  "frontend-developer": {
    title: "Frontend Developer",
    department: "Product",
    location: "Mumbai",
    status: "Closed",
    candidates: 6,
    description:
      "Frontend developer responsible for building responsive web applications.",
    skills: ["React", "JavaScript", "CSS"]
  },

  "data-analyst": {
    title: "Data Analyst",
    department: "Analytics",
    location: "Ahmedabad",
    status: "Open",
    candidates: 10,
    description:
      "Data analyst responsible for analyzing business data and generating insights.",
    skills: ["SQL", "Python", "Excel"]
  }
}

function RequisitionDetail() {

  const { requisitionId } = useParams()

  const requisition = requisitions[requisitionId]

  if (!requisition) {
    return (
      <div className="detail-card">
        <h2>Requisition Not Found</h2>
        <p>The requested requisition does not exist.</p>
      </div>
    )
  }

  return (
    <div>

      <div className="page-header">

        <Link
          to="/requisitions"
          className="back-link"
        >
          ← Back to Requisitions
        </Link>

        <h1>{requisition.title}</h1>

        <p>
          {requisition.department} • {requisition.location}
        </p>

      </div>

      <div className="detail-grid">

        <div className="detail-card">
          <h3>Status</h3>

          <div className="status success">
            🟢 {requisition.status}
          </div>
        </div>

        <div className="detail-card">
          <h3>Candidates</h3>

          <div className="big-score">
            {requisition.candidates}
          </div>

          <p>Candidates associated with this requisition</p>
        </div>

      </div>

      <div className="detail-card">

        <h2>Job Description</h2>

        <p className="section-description">
          {requisition.description}
        </p>

      </div>

      <div className="detail-card">

        <h2>Required Skills</h2>

        <div className="requisition-skills">

          {requisition.skills.map((skill) => (
            <span
              className="skill-tag"
              key={skill}
            >
              {skill}
            </span>
          ))}

        </div>

      </div>

      <div className="requisition-actions">

        <button className="create-button">
          + Add Candidate
        </button>

        <Link
          to="/candidates"
          className="secondary-button"
        >
          View Candidates
        </Link>

      </div>

    </div>
  )
}

export default RequisitionDetail