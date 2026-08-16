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
    date: "Aug 14, 2026",
    linkedin: "https://www.linkedin.com/",
    github: "https://github.com/",
    verified: true,
  },
  {
    id: "priya",
    name: "Priya Patel",
    requisition: "Backend Engineer",
    score: 74,
    skill: "Java",
    consent: "Pending",
    date: "Aug 13, 2026",
    linkedin: "https://www.linkedin.com/",
    github: "https://github.com/",
    verified: false,
  },
  {
    id: "arjun",
    name: "Arjun Mehta",
    requisition: "ML Engineer",
    score: 91,
    skill: "Python",
    consent: "Consented & Linked",
    date: "Aug 12, 2026",
    linkedin: "https://www.linkedin.com/",
    github: "https://github.com/",
    verified: true,
  },
  {
    id: "neha",
    name: "Neha Shah",
    requisition: "Frontend Developer",
    score: 68,
    skill: "React",
    consent: "Not Requested",
    date: "Aug 10, 2026",
    linkedin: "https://www.linkedin.com/",
    github: "https://github.com/",
    verified: false,
  },
  {
    id: "rohan",
    name: "Rohan Desai",
    requisition: "Backend Engineer",
    score: 56,
    skill: "Node.js",
    consent: "Declined/Revoked",
    date: "Aug 8, 2026",
    linkedin: "https://www.linkedin.com/",
    github: "https://github.com/",
    verified: false,
  }
]

function getScoreClass(score) {
  if (score >= 80) return "score-high"
  if (score >= 65) return "score-medium"
  return "score-low"
}

function getScoreLabel(score) {
  if (score >= 80) return "Strong Match"
  if (score >= 65) return "Good Match"
  return "Low Match"
}
function CandidateUploadModal({ onClose }) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [resume, setResume] = useState(null)
  const [uploaded, setUploaded] = useState(false)

  const handleResume = (event) => {
    const file = event.target.files[0]

    if (!file) return

    setResume(file)
    setUploaded(true)
  }

  return (
    <div className="upload-modal-overlay">

      <div className="upload-modal">

        <div className="upload-modal-header">

          <div>
            <h2>Add Candidate</h2>

            <p>
              Add a candidate and upload their resume.
            </p>
          </div>

          <button
            className="modal-close"
            onClick={onClose}
          >
            ×
          </button>

        </div>

        <div className="upload-form">

          <label>
            Candidate Name

            <input
              type="text"
              placeholder="e.g. Rahul Sharma"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

          </label>

          <label>
            Email

            <input
              type="email"
              placeholder="candidate@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

          </label>

          <div className="resume-upload-section">

            <label>Resume</label>

            {!uploaded ? (

              <label className="resume-dropzone">

                <div className="upload-icon">
                  ↑
                </div>

                <strong>
                  Drop resume here
                </strong>

                <span>
                  or click to choose a file
                </span>

                <small>
                  PDF, DOC or DOCX • Max 10 MB
                </small>

                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleResume}
                  hidden
                />

              </label>

            ) : (

              <div className="uploaded-resume">

                <div className="resume-file-icon">
                  PDF
                </div>

                <div>
                  <strong>
                    {resume.name}
                  </strong>

                  <small>
                    {(resume.size / 1024 / 1024).toFixed(2)} MB
                  </small>
                </div>

                <span className="resume-uploaded-check">
                  ✓
                </span>

              </div>

            )}

          </div>

        </div>

        <div className="upload-modal-footer">

          <button
            className="secondary-button"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className="primary-button"
            disabled={!name || !resume}
            onClick={() => {
              alert(
                "Candidate added successfully. Resume is ready for verification."
              )

              onClose()
            }}
          >
            Add Candidate
          </button>

        </div>

      </div>

    </div>
  )
}
function Candidates() {
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [search, setSearch] = useState("")
  const [requisition, setRequisition] = useState("All")
  const [skill, setSkill] = useState("All")
  const [consent, setConsent] = useState("All")
  const [sort, setSort] = useState("name")

  let filteredCandidates = candidates.filter((candidate) => {
    const matchesSearch =
      candidate.name.toLowerCase().includes(search.toLowerCase())

    const matchesRequisition =
      requisition === "All" ||
      candidate.requisition === requisition

    const matchesSkill =
      skill === "All" ||
      candidate.skill === skill

    const matchesConsent =
      consent === "All" ||
      candidate.consent === consent

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
      <div className="candidates-heading">

  <div>
    <h1>Candidates</h1>

    <p>
      Review candidates, match scores and verified professional evidence.
    </p>
  </div>

  <div className="candidate-heading-actions">

    <div className="candidate-summary">
      <strong>{filteredCandidates.length}</strong>
      <span>Candidates</span>
    </div>

    <button
      className="primary-button"
      onClick={() => setShowUploadModal(true)}
    >
      + Add Candidate
    </button>

  </div>

</div>


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
          <option value="Consented & Linked">
            Consented & Linked
          </option>
          <option value="Pending">Pending</option>
          <option value="Not Requested">
            Not Requested
          </option>
          <option value="Declined/Revoked">
            Declined/Revoked
          </option>
        </select>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="name">Sort: Name</option>
          <option value="score-high">
            Score: High to Low
          </option>
          <option value="score-low">
            Score: Low to High
          </option>
        </select>

      </div>

      <div className="candidate-table">

        <div className="candidate-header">
          <span>Candidate</span>
          <span>Requisition</span>
          <span>Match Score</span>
          <span>Professional Profiles</span>
          <span>Verification</span>
          <span>Last Updated</span>
        </div>

        {filteredCandidates.map((candidate) => (

          <Link
            key={candidate.id}
            to={`/candidates/${candidate.id}`}
            className="candidate-row"
          >

            <span className="candidate-name-cell">
              <div className="candidate-avatar">
                {candidate.name.charAt(0)}
              </div>

              <div>
                <strong>{candidate.name}</strong>

                <small>
                  {candidate.skill} specialist
                </small>
              </div>
            </span>

            <span>
              {candidate.requisition}
            </span>

            <span className="candidate-score-cell">

              <strong
                className={`candidate-score ${getScoreClass(
                  candidate.score
                )}`}
              >
                {candidate.score}%
              </strong>

              <small>
                {getScoreLabel(candidate.score)}
              </small>

            </span>

            <span className="professional-links">

              <a
                href={candidate.linkedin}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="professional-link linkedin"
                title="Open LinkedIn"
              >
                in
              </a>

              <a
                href={candidate.github}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="professional-link github"
                title="Open GitHub"
              >
                GH
              </a>

            </span>

            <span>

              {candidate.verified ? (
                <span className="verification-badge verified">
                  ✓ Verified
                </span>
              ) : (
                <span className="verification-badge pending">
                  ○ Review Needed
                </span>
              )}

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
    {showUploadModal && (
        <CandidateUploadModal
          onClose={() => setShowUploadModal(false)}
        />
      )}
      </div>

    </div>
  )
}

export default Candidates