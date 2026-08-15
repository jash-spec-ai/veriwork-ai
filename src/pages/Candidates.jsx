import { useState } from "react"
import { Link } from "react-router-dom"

const candidates = [
  {
    id: "rahul",
    name: "Rahul Sharma",
    requisition: "Python Developer",
    score: 82,
    skill: "Python",
    consent: "Consented & Linked",
    date: "Aug 14, 2026"
  },
  {
    id: "priya",
    name: "Priya Patel",
    requisition: "Backend Engineer",
    score: 74,
    skill: "Java",
    consent: "Pending",
    date: "Aug 13, 2026"
  },
  {
    id: "arjun",
    name: "Arjun Mehta",
    requisition: "ML Engineer",
    score: 91,
    skill: "Python",
    consent: "Consented & Linked",
    date: "Aug 12, 2026"
  },
  {
    id: "neha",
    name: "Neha Shah",
    requisition: "Frontend Developer",
    score: 68,
    skill: "React",
    consent: "Not Requested",
    date: "Aug 10, 2026"
  },
  {
    id: "rohan",
    name: "Rohan Desai",
    requisition: "Backend Engineer",
    score: 56,
    skill: "Node.js",
    consent: "Declined/Revoked",
    date: "Aug 8, 2026"
  }
]

function Candidates() {
  const [search, setSearch] = useState("")
  const [requisition, setRequisition] = useState("All")
  const [skill, setSkill] = useState("All")
  const [consent, setConsent] = useState("All")
  const [sort, setSort] = useState("name")

  let filteredCandidates = candidates.filter((candidate) => {
    const matchesSearch =
      candidate.name.toLowerCase().includes(search.toLowerCase())

    const matchesRequisition =
      requisition === "All" || candidate.requisition === requisition

    const matchesSkill =
      skill === "All" || candidate.skill === skill

    const matchesConsent =
      consent === "All" || candidate.consent === consent

    return (
      matchesSearch &&
      matchesRequisition &&
      matchesSkill &&
      matchesConsent
    )
  })

  filteredCandidates.sort((a, b) => {
    if (sort === "score-high") {
      return b.score - a.score
    }

    if (sort === "score-low") {
      return a.score - b.score
    }

    if (sort === "name") {
      return a.name.localeCompare(b.name)
    }

    return 0
  })

  return (
    <div className="candidates-page">

      <h1>Candidates</h1>

      <p>
        Review candidates and their verified skill evidence.
      </p>

      <div className="candidate-controls">

        <input
          type="text"
          placeholder="Search candidates..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={requisition}
          onChange={(e) => setRequisition(e.target.value)}
        >
          <option value="All">All Requisitions</option>
          <option value="Python Developer">Python Developer</option>
          <option value="Backend Engineer">Backend Engineer</option>
          <option value="ML Engineer">ML Engineer</option>
          <option value="Frontend Developer">Frontend Developer</option>
        </select>

        <select
          value={skill}
          onChange={(e) => setSkill(e.target.value)}
        >
          <option value="All">All Skills</option>
          <option value="Python">Python</option>
          <option value="Java">Java</option>
          <option value="React">React</option>
          <option value="Node.js">Node.js</option>
        </select>

        <select
          value={consent}
          onChange={(e) => setConsent(e.target.value)}
        >
          <option value="All">All Consent Status</option>
          <option value="Consented & Linked">Consented & Linked</option>
          <option value="Pending">Pending</option>
          <option value="Not Requested">Not Requested</option>
          <option value="Declined/Revoked">Declined/Revoked</option>
        </select>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="name">Sort: Name</option>
          <option value="score-high">Score: High to Low</option>
          <option value="score-low">Score: Low to High</option>
        </select>

      </div>

      <div className="candidate-table">

        <div className="candidate-header">
          <span>Candidate</span>
          <span>Requisition</span>
          <span>Score</span>
          <span>Top Skill</span>
          <span>Consent</span>
          <span>Last Updated</span>
        </div>

        {filteredCandidates.map((candidate) => (

          <Link
            key={candidate.id}
            to={`/candidates/${candidate.id}`}
            className="candidate-row"
          >

            <span>
              <strong>{candidate.name}</strong>
            </span>

            <span>
              {candidate.requisition}
            </span>

            <span>
              <strong>{candidate.score}/100</strong>
            </span>

            <span>
              {candidate.skill}
            </span>

            <span>
              {candidate.consent === "Consented & Linked" && "🟢 "}
              {candidate.consent === "Pending" && "🟡 "}
              {candidate.consent === "Not Requested" && "⚪ "}
              {candidate.consent === "Declined/Revoked" && "🔴 "}
              {candidate.consent}
            </span>

            <span>
              {candidate.date}
            </span>

          </Link>

        ))}

        {filteredCandidates.length === 0 && (
          <div className="no-candidates">
            No candidates found.
          </div>
        )}

      </div>

    </div>
  )
}

export default Candidates