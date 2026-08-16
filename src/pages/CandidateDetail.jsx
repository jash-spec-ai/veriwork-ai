import { useState } from "react"
import { useParams, Link } from "react-router-dom"

const candidateData = {
  rahul: {
    name: "Rahul Sharma",
    role: "Backend Engineer Candidate",
    score: 82,
    consent: "Consented & Linked",
    linkedin: "https://www.linkedin.com/",
    github: "https://github.com/",
    resumeVerified: true,

    scoreBreakdown: {
      skills: 90,
      experience: 84,
      education: 80,
      jobMatch: 83,
      resumeQuality: 75
    },

    strengths: [
      "Strong Python and FastAPI experience",
      "Relevant backend development projects",
      "Good alignment with the required technical skills"
    ],

    gaps: [
      "SQL experience requires additional verification",
      "No strong evidence of cloud deployment experience"
    ],

    skills: [
      {
        name: "Python",
        score: 90,
        status: "Verified",
        evidence:
          "Developed REST APIs using Python and FastAPI."
      },
      {
        name: "FastAPI",
        score: 86,
        status: "Verified",
        evidence:
          "FastAPI projects found in GitHub repositories."
      },
      {
        name: "SQL",
        score: 65,
        status: "Claimed",
        evidence:
          "SQL appears on the candidate resume but needs further verification."
      }
    ]
  },

  priya: {
    name: "Priya Patel",
    role: "Backend Engineer Candidate",
    score: 74,
    consent: "Pending",
    linkedin: "https://www.linkedin.com/",
    github: "https://github.com/",
    resumeVerified: true,

    scoreBreakdown: {
      skills: 84,
      experience: 75,
      education: 78,
      jobMatch: 73,
      resumeQuality: 70
    },

    strengths: [
      "Good Java backend experience",
      "Spring Boot experience is relevant to the role",
      "Demonstrates practical backend development"
    ],

    gaps: [
      "SQL evidence is limited",
      "Candidate consent is still pending"
    ],

    skills: [
      {
        name: "Java",
        score: 84,
        status: "Verified",
        evidence:
          "Java backend projects listed in candidate evidence."
      },
      {
        name: "Spring Boot",
        score: 78,
        status: "Verified",
        evidence:
          "Spring Boot experience identified in project history."
      },
      {
        name: "SQL",
        score: 62,
        status: "Claimed",
        evidence:
          "SQL mentioned in resume but supporting evidence is limited."
      }
    ]
  },

  arjun: {
    name: "Arjun Mehta",
    role: "ML Engineer Candidate",
    score: 91,
    consent: "Consented & Linked",
    linkedin: "https://www.linkedin.com/",
    github: "https://github.com/",
    resumeVerified: true,

    scoreBreakdown: {
      skills: 94,
      experience: 91,
      education: 89,
      jobMatch: 94,
      resumeQuality: 88
    },

    strengths: [
      "Excellent Python and machine learning evidence",
      "Multiple relevant ML projects",
      "Very strong alignment with the role"
    ],

    gaps: [
      "TensorFlow experience requires additional verification"
    ],

    skills: [
      {
        name: "Python",
        score: 94,
        status: "Verified",
        evidence:
          "Multiple Python machine learning projects found."
      },
      {
        name: "Machine Learning",
        score: 92,
        status: "Verified",
        evidence:
          "Machine learning projects and related repositories identified."
      },
      {
        name: "TensorFlow",
        score: 76,
        status: "Claimed",
        evidence:
          "TensorFlow appears in the candidate profile but needs additional verification."
      }
    ]
  },

  neha: {
    name: "Neha Shah",
    role: "Frontend Developer Candidate",
    score: 68,
    consent: "Not Requested",
    linkedin: "https://www.linkedin.com/",
    github: "https://github.com/",
    resumeVerified: true,

    scoreBreakdown: {
      skills: 82,
      experience: 65,
      education: 72,
      jobMatch: 67,
      resumeQuality: 60
    },

    strengths: [
      "Strong React fundamentals",
      "Good JavaScript experience",
      "Relevant frontend projects"
    ],

    gaps: [
      "TypeScript experience requires verification",
      "Limited evidence of advanced frontend architecture"
    ],

    skills: [
      {
        name: "React",
        score: 82,
        status: "Verified",
        evidence:
          "React projects identified in candidate work."
      },
      {
        name: "JavaScript",
        score: 78,
        status: "Verified",
        evidence:
          "JavaScript experience found across candidate projects."
      },
      {
        name: "TypeScript",
        score: 58,
        status: "Claimed",
        evidence:
          "TypeScript appears on the resume but requires verification."
      }
    ]
  },

  rohan: {
    name: "Rohan Desai",
    role: "Backend Engineer Candidate",
    score: 56,
    consent: "Declined/Revoked",
    linkedin: "https://www.linkedin.com/",
    github: "https://github.com/",
    resumeVerified: false,

    scoreBreakdown: {
      skills: 72,
      experience: 55,
      education: 60,
      jobMatch: 52,
      resumeQuality: 48
    },

    strengths: [
      "Some relevant Node.js experience",
      "Express projects provide useful evidence"
    ],

    gaps: [
      "MongoDB evidence is insufficient",
      "Candidate consent has been declined or revoked",
      "Overall evidence is currently limited"
    ],

    skills: [
      {
        name: "Node.js",
        score: 72,
        status: "Verified",
        evidence:
          "Node.js backend projects identified."
      },
      {
        name: "Express",
        score: 64,
        status: "Verified",
        evidence:
          "Express-based applications found in candidate projects."
      },
      {
        name: "MongoDB",
        score: 52,
        status: "Claimed",
        evidence:
          "MongoDB appears in the resume but lacks sufficient evidence."
      }
    ]
  }
}

function CandidateDetail() {
  const { candidateId } = useParams()

  const [activeTab, setActiveTab] = useState("overview")
  const [linkedinVerified, setLinkedinVerified] = useState(false)
  const [githubVerified, setGithubVerified] = useState(false)
  const [questions, setQuestions] = useState([])

  const candidate = candidateData[candidateId]

  if (!candidate) {
    return (
      <div className="detail-card">
        <h2>Candidate Not Found</h2>
        <p>The requested candidate does not exist.</p>
        <Link to="/candidates">
          Back to Candidates
        </Link>
      </div>
    )
  }

  const generateQuestions = () => {
    const generatedQuestions = [
      {
        category: "Technical",
        question:
          `You have listed ${candidate.skills[0].name} as a key skill. Describe a real project where you used it and explain the most difficult technical problem you solved.`,
        evaluate:
          "Practical knowledge, technical depth and ability to explain real implementation decisions."
      },
      {
        category: "Experience",
        question:
          `Your profile shows experience relevant to ${candidate.role}. What was your most significant contribution to a previous project?`,
        evaluate:
          "Ownership, problem-solving ability and relevance of previous experience."
      },
      {
        category: "Verification",
        question:
          `Can you walk us through the evidence behind your ${candidate.skills[2].name} experience and explain how you used it in a real project?`,
        evaluate:
          "Whether the claimed skill reflects genuine practical experience."
      },
      {
        category: "Behavioral",
        question:
          "Tell us about a time when you encountered a difficult technical problem and had to find a solution with limited information.",
        evaluate:
          "Problem solving, communication, adaptability and ownership."
      }
    ]

    setQuestions(generatedQuestions)
  }

  return (
    <div className="candidate-detail">

      <div className="candidate-detail-header">

        <div>
          <Link
            to="/candidates"
            className="back-link"
          >
            ← Back to Candidates
          </Link>

          <h1>{candidate.name}</h1>

          <p>{candidate.role}</p>
        </div>

        <div className="header-score">
          <span>AI Match Score</span>
          <strong>{candidate.score}%</strong>

          <small>
            {candidate.score >= 80
              ? "Strong Match"
              : candidate.score >= 60
              ? "Good Match"
              : "Needs Review"}
          </small>
        </div>

      </div>

      <div className="professional-profile-bar">

        <div className="profile-verification-item">
          <span className="profile-icon linkedin-icon">
            in
          </span>

          <div>
            <strong>LinkedIn</strong>
            <small>
              {linkedinVerified
                ? "Manually verified"
                : "Available for review"}
            </small>
          </div>

          <a
            href={candidate.linkedin}
            target="_blank"
            rel="noreferrer"
            className="outline-button"
          >
            Open
          </a>

          <button
            className={
              linkedinVerified
                ? "verified-button"
                : "outline-button"
            }
            onClick={() =>
              setLinkedinVerified(!linkedinVerified)
            }
          >
            {linkedinVerified
              ? "✓ Verified"
              : "Verify"}
          </button>
        </div>

        <div className="profile-verification-item">

          <span className="profile-icon github-icon">
            GH
          </span>

          <div>
            <strong>GitHub</strong>

            <small>
              {githubVerified
                ? "Manually verified"
                : "Available for review"}
            </small>
          </div>

          <a
            href={candidate.github}
            target="_blank"
            rel="noreferrer"
            className="outline-button"
          >
            Open
          </a>

          <button
            className={
              githubVerified
                ? "verified-button"
                : "outline-button"
            }
            onClick={() =>
              setGithubVerified(!githubVerified)
            }
          >
            {githubVerified
              ? "✓ Verified"
              : "Verify"}
          </button>

        </div>

        <div className="profile-verification-item">

          <span className="profile-icon resume-icon">
            ✓
          </span>

          <div>
            <strong>Resume</strong>

            <small>
              {candidate.resumeVerified
                ? "Resume verified"
                : "Verification required"}
            </small>
          </div>

          <span
            className={
              candidate.resumeVerified
                ? "verification-pill verified"
                : "verification-pill pending"
            }
          >
            {candidate.resumeVerified
              ? "✓ Verified"
              : "Review"}
          </span>

        </div>

      </div>

      <div className="detail-grid">

        <div className="detail-card score-card enhanced-score-card">

          <div className="score-card-heading">
            <div>
              <h3>AI Match Score</h3>
              <p>
                Based on available candidate evidence
              </p>
            </div>

            <span className="score-info">
              i
            </span>
          </div>

          <div className="big-score">
            {candidate.score}
            <span>/100</span>
          </div>

          <div className="score-label">
            {candidate.score >= 80
              ? "Strong Match"
              : candidate.score >= 60
              ? "Good Match"
              : "Needs Review"}
          </div>

          <p className="score-explanation">
            This score compares the candidate's available
            evidence against the requirements of the role.
            Verified skills and relevant experience have more
            influence than unverified claims.
          </p>

        </div>

        <div className="detail-card">

          <h3>Score Breakdown</h3>

          <div className="score-breakdown">

            {Object.entries(candidate.scoreBreakdown).map(
              ([name, score]) => (

                <div
                  className="score-breakdown-item"
                  key={name}
                >

                  <div className="score-breakdown-label">
                    <span>
                      {name === "jobMatch"
                        ? "Job Description Match"
                        : name === "resumeQuality"
                        ? "Resume Quality"
                        : name.charAt(0).toUpperCase() +
                          name.slice(1)}
                    </span>

                    <strong>{score}%</strong>
                  </div>

                  <div className="score-progress">
                    <div
                      style={{
                        width: `${score}%`
                      }}
                    />
                  </div>

                </div>

              )
            )}

          </div>

        </div>

      </div>

      <div className="detail-card score-method-card">

        <h2>Why this score?</h2>

        <p className="section-description">
          VeriWork AI breaks the overall recommendation into
          understandable factors so recruiters can see why a
          candidate received their score.
        </p>

        <div className="score-method-grid">

          <div>
            <strong>1. Required Skills</strong>
            <p>
              Checks how closely the candidate's demonstrated
              skills match the skills required for the role.
            </p>
          </div>

          <div>
            <strong>2. Relevant Experience</strong>
            <p>
              Looks at experience and projects that are
              relevant to the position.
            </p>
          </div>

          <div>
            <strong>3. Job Match</strong>
            <p>
              Compares candidate evidence with the job
              description and role requirements.
            </p>
          </div>

          <div>
            <strong>4. Evidence Quality</strong>
            <p>
              Verified evidence carries more confidence than
              skills that are only claimed on a resume.
            </p>
          </div>

        </div>

        <div className="score-disclaimer">
          <strong>Important:</strong> The score is a decision-support
          recommendation, not a final hiring decision. Recruiters
          should review the underlying evidence before making a decision.
        </div>

      </div>

      <div className="strength-gap-grid">

        <div className="detail-card">

          <h2>Candidate Strengths</h2>

          <div className="strength-list">

            {candidate.strengths.map((strength) => (
              <div key={strength}>
                <span>✓</span>
                <p>{strength}</p>
              </div>
            ))}

          </div>

        </div>

        <div className="detail-card">

          <h2>Potential Gaps</h2>

          <div className="gap-list">

            {candidate.gaps.map((gap) => (
              <div key={gap}>
                <span>!</span>
                <p>{gap}</p>
              </div>
            ))}

          </div>

        </div>

      </div>

      <div className="candidate-tabs">

        <button
          className={
            activeTab === "overview"
              ? "active-tab"
              : ""
          }
          onClick={() => setActiveTab("overview")}
        >
          Overview
        </button>

        <button
          className={
            activeTab === "evidence"
              ? "active-tab"
              : ""
          }
          onClick={() => setActiveTab("evidence")}
        >
          Evidence Explorer
        </button>

        <button
          className={
            activeTab === "questions"
              ? "active-tab"
              : ""
          }
          onClick={() => setActiveTab("questions")}
        >
          Interview Questions
        </button>

        <button
          className={
            activeTab === "consent"
              ? "active-tab"
              : ""
          }
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

            <div
              className="skill-row enhanced-skill-row"
              key={skill.name}
            >

              <div>
                <strong>{skill.name}</strong>

                <p>
                  {skill.score}/100 evidence score
                </p>

                <small>
                  {skill.evidence}
                </small>
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

            <div
              className="evidence-card"
              key={skill.name}
            >

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

          <div className="questions-heading">

            <div>
              <h2>AI Interview Questions</h2>

              <p className="section-description">
                Questions designed around this candidate's
                evidence, strengths and potential gaps.
              </p>
            </div>

            <button
              className="primary-button"
              onClick={generateQuestions}
            >
              + Generate Questions
            </button>

          </div>

          {questions.length === 0 ? (

            <div className="question-empty">

              <div className="question-empty-icon">
                ?
              </div>

              <h3>Generate candidate-specific questions</h3>

              <p>
                VeriWork will create technical, experience,
                verification and behavioral questions based
                on this candidate's profile.
              </p>

              <button
                className="primary-button"
                onClick={generateQuestions}
              >
                Generate Interview Questions
              </button>

            </div>

          ) : (

            <div className="question-list">

              {questions.map((item, index) => (

                <div
                  className="question-card"
                  key={index}
                >

                  <div className="question-number">
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  <div className="question-content">

                    <span className="question-category">
                      {item.category}
                    </span>

                    <h3>
                      {item.question}
                    </h3>

                    <div className="evaluate-box">
                      <strong>What to evaluate</strong>
                      <p>{item.evaluate}</p>
                    </div>

                  </div>

                </div>

              ))}

            </div>

          )}

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
              <p>
                Resume, Candidate Profile,
                LinkedIn and GitHub where available
              </p>
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