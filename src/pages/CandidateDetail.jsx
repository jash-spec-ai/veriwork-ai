import { useState } from "react"
import { useParams } from "react-router-dom"

const candidateData = {
  rahul: {
    name: "Rahul Sharma",
    role: "Backend Engineer Candidate",
    score: 82,
    consent: "Consented & Linked",
    skills: [
      {
        name: "Python",
        score: 90,
        status: "Verified",
        evidence: "Developed REST APIs using Python and FastAPI."
      },
      {
        name: "FastAPI",
        score: 86,
        status: "Verified",
        evidence: "FastAPI projects found in GitHub repositories."
      },
      {
        name: "SQL",
        score: 65,
        status: "Claimed",
        evidence: "SQL appears on the candidate resume but needs further verification."
      }
    ]
  },

  priya: {
    name: "Priya Patel",
    role: "Backend Engineer Candidate",
    score: 74,
    consent: "Pending",
    skills: [
      {
        name: "Java",
        score: 84,
        status: "Verified",
        evidence: "Java backend projects listed in candidate evidence."
      },
      {
        name: "Spring Boot",
        score: 78,
        status: "Verified",
        evidence: "Spring Boot experience identified in project history."
      },
      {
        name: "SQL",
        score: 62,
        status: "Claimed",
        evidence: "SQL mentioned in resume but supporting evidence is limited."
      }
    ]
  },

  arjun: {
    name: "Arjun Mehta",
    role: "ML Engineer Candidate",
    score: 91,
    consent: "Consented & Linked",
    skills: [
      {
        name: "Python",
        score: 94,
        status: "Verified",
        evidence: "Multiple Python machine learning projects found."
      },
      {
        name: "Machine Learning",
        score: 92,
        status: "Verified",
        evidence: "Machine learning projects and related repositories identified."
      },
      {
        name: "TensorFlow",
        score: 76,
        status: "Claimed",
        evidence: "TensorFlow appears in the candidate profile but needs additional verification."
      }
    ]
  },

  neha: {
    name: "Neha Shah",
    role: "Frontend Developer Candidate",
    score: 68,
    consent: "Not Requested",
    skills: [
      {
        name: "React",
        score: 82,
        status: "Verified",
        evidence: "React projects identified in candidate work."
      },
      {
        name: "JavaScript",
        score: 78,
        status: "Verified",
        evidence: "JavaScript experience found across candidate projects."
      },
      {
        name: "TypeScript",
        score: 58,
        status: "Claimed",
        evidence: "TypeScript appears on the resume but requires verification."
      }
    ]
  },

  rohan: {
    name: "Rohan Desai",
    role: "Backend Engineer Candidate",
    score: 56,
    consent: "Declined/Revoked",
    skills: [
      {
        name: "Node.js",
        score: 72,
        status: "Verified",
        evidence: "Node.js backend projects identified."
      },
      {
        name: "Express",
        score: 64,
        status: "Verified",
        evidence: "Express-based applications found in candidate projects."
      },
      {
        name: "MongoDB",
        score: 52,
        status: "Claimed",
        evidence: "MongoDB appears in the resume but lacks sufficient evidence."
      }
    ]
  }
}

function CandidateDetail() {
  const { candidateId } = useParams()
  const [activeTab, setActiveTab] = useState("overview")

  const candidate = candidateData[candidateId]

  if (!candidate) {
    return (
      <div className="detail-card">
        <h2>Candidate Not Found</h2>
        <p>The requested candidate does not exist.</p>
      </div>
    )
  }

  return (
    <div className="candidate-detail">

      <div className="page-header">
        <h1>{candidate.name}</h1>
        <p>{candidate.role}</p>
      </div>

      <div className="detail-grid">

        <div className="detail-card score-card">
          <h3>Overall Score</h3>

          <div className="big-score">
            {candidate.score}<span>/100</span>
          </div>

          <div className="score-label">
            {candidate.score >= 80
              ? "Strong Evidence"
              : candidate.score >= 60
              ? "Moderate Evidence"
              : "Limited Evidence"}
          </div>

          <p>
            Candidate match based on available verified evidence.
          </p>
        </div>

        <div className="detail-card">
          <h3>Consent Status</h3>

          <div className="status success">
            {candidate.consent === "Consented & Linked" && "🟢 "}
            {candidate.consent === "Pending" && "🟡 "}
            {candidate.consent === "Not Requested" && "⚪ "}
            {candidate.consent === "Declined/Revoked" && "🔴 "}
            {candidate.consent}
          </div>

          <p>
            Candidate consent information.
          </p>
        </div>

      </div>

      <div className="candidate-tabs">

        <button
          className={activeTab === "overview" ? "active-tab" : ""}
          onClick={() => setActiveTab("overview")}
        >
          Overview
        </button>

        <button
          className={activeTab === "evidence" ? "active-tab" : ""}
          onClick={() => setActiveTab("evidence")}
        >
          Evidence Explorer
        </button>

        <button
          className={activeTab === "questions" ? "active-tab" : ""}
          onClick={() => setActiveTab("questions")}
        >
          Interview Questions
        </button>

        <button
          className={activeTab === "consent" ? "active-tab" : ""}
          onClick={() => setActiveTab("consent")}
        >
          Consent & Data
        </button>

      </div>

      {activeTab === "overview" && (

        <div className="detail-card">

          <h2>Verified Skills</h2>

          <p className="section-description">
            Skills identified from candidate evidence.
          </p>

          {candidate.skills.map((skill) => (

            <div className="skill-row" key={skill.name}>

              <div>
                <strong>{skill.name}</strong>
                <p>{skill.score}/100 evidence score</p>
              </div>

              <span
                className={
                  skill.status === "Verified"
                    ? "verified"
                    : "claimed"
                }
              >
                {skill.status === "Verified"
                  ? "✓ Verified"
                  : "⚠ Claimed"}
              </span>

            </div>

          ))}

        </div>

      )}

      {activeTab === "evidence" && (

        <div className="detail-card">

          <h2>Evidence Explorer</h2>

          <p className="section-description">
            Evidence supporting the candidate's skills.
          </p>

          {candidate.skills.map((skill) => (

            <div className="evidence-card" key={skill.name}>

              <div className="evidence-header">

                <div>
                  <h3>{skill.name}</h3>
                  <span>
                    Evidence Score: {skill.score}/100
                  </span>
                </div>

                <span
                  className={
                    skill.status === "Verified"
                      ? "verified"
                      : "claimed"
                  }
                >
                  {skill.status === "Verified"
                    ? "✓ Verified"
                    : "⚠ Claimed"}
                </span>

              </div>

              <p>
                {skill.evidence}
              </p>

              <div className="evidence-source">
                Source: Candidate Profile
              </div>

            </div>

          ))}

        </div>

      )}

      {activeTab === "questions" && (

        <div className="detail-card">

          <h2>Recommended Interview Questions</h2>

          <p className="section-description">
            Questions generated to validate candidate skills.
          </p>

          {candidate.skills.map((skill, index) => (

            <div className="question" key={skill.name}>

              <strong>
                {index + 1}. How would you demonstrate your
                experience with {skill.name}?
              </strong>

              <p>
                This question helps validate the candidate's
                {skill.name} knowledge and practical experience.
              </p>

            </div>

          ))}

        </div>

      )}

      {activeTab === "consent" && (

        <div className="detail-card">

          <h2>Consent & Data</h2>

          <div className="consent-info">

            <div>
              <strong>Consent Status</strong>
              <p>{candidate.consent}</p>
            </div>

            <div>
              <strong>Data Sources</strong>
              <p>Resume, Candidate Profile</p>
            </div>

            <div>
              <strong>Data Retention</strong>
              <p>180 days</p>
            </div>

          </div>

        </div>

      )}

    </div>
  )
}

export default CandidateDetail