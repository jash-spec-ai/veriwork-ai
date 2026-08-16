import { useMemo } from "react"

function CandidateDashboard() {
  const user = {
    name: "Demo Candidate",
    role: "AI Engineer",
    location: "Vadodara, Gujarat",
    profileCompleted: true,
    resumeUploaded: true,
    githubConnected: true,
    projects: 4,
    skills: 7,
    verifiedSkills: 5,
    certifications: 2,
  }

  const completion = useMemo(() => {
    const items = [
      user.profileCompleted,
      user.resumeUploaded,
      user.githubConnected,
      user.projects > 0,
      user.skills > 0,
      user.certifications > 0,
    ]

    return Math.round(
      (items.filter(Boolean).length / items.length) * 100
    )
  }, [])

  return (
    <div className="candidate-dashboard">

      <div className="candidate-dashboard-header">
        <div>
          <p className="candidate-eyebrow">
            CANDIDATE DASHBOARD
          </p>

          <h1>
            Welcome back, {user.name}
          </h1>

          <p>
            {user.role} · {user.location}
          </p>
        </div>
      </div>

      <section className="candidate-card candidate-readiness">

        <div className="candidate-readiness-header">

          <div>
            <p className="candidate-card-label">
              PROFILE READINESS
            </p>

            <h2>
              Your professional profile is {completion}% complete
            </h2>

            <p>
              Keep your profile updated to make your professional
              information easier to verify.
            </p>
          </div>

          <div className="candidate-readiness-score">
            {completion}%
          </div>

        </div>

        <div className="candidate-progress">
          <div
            className="candidate-progress-fill"
            style={{ width: `${completion}%` }}
          />
        </div>

      </section>

      <div className="candidate-stat-grid">

        <div className="candidate-stat-card">
          <span>Projects</span>
          <strong>{user.projects}</strong>
          <small>Projects added</small>
        </div>

        <div className="candidate-stat-card">
          <span>Skills</span>
          <strong>{user.skills}</strong>
          <small>Skills listed</small>
        </div>

        <div className="candidate-stat-card">
          <span>Verified Skills</span>
          <strong>{user.verifiedSkills}</strong>
          <small>Evidence verified</small>
        </div>

        <div className="candidate-stat-card">
          <span>Certifications</span>
          <strong>{user.certifications}</strong>
          <small>Credentials added</small>
        </div>

      </div>

      <div className="candidate-two-column">

        <section className="candidate-card">

          <p className="candidate-card-label">
            PROFILE STATUS
          </p>

          <h2>Verification Overview</h2>

          <div className="candidate-status-list">

            <StatusItem
              title="Profile"
              completed={user.profileCompleted}
            />

            <StatusItem
              title="Resume"
              completed={user.resumeUploaded}
            />

            <StatusItem
              title="GitHub"
              completed={user.githubConnected}
            />

            <StatusItem
              title="Skills"
              completed={user.skills > 0}
            />

            <StatusItem
              title="Projects"
              completed={user.projects > 0}
            />

          </div>

        </section>

        <section className="candidate-card">

          <p className="candidate-card-label">
            NEXT STEPS
          </p>

          <h2>Improve your profile</h2>

          <div className="candidate-next-step">
            <strong>Complete your professional profile</strong>
            <span>
              Add relevant information about your career.
            </span>
          </div>

          <div className="candidate-next-step">
            <strong>Add supporting evidence</strong>
            <span>
              Connect projects, certificates and profiles.
            </span>
          </div>

          <div className="candidate-next-step">
            <strong>Verify your skills</strong>
            <span>
              Provide evidence for your professional skills.
            </span>
          </div>

        </section>

      </div>

    </div>
  )
}

function StatusItem({ title, completed }) {
  return (
    <div className="candidate-status-item">

      <span
        className={
          completed
            ? "status-check completed"
            : "status-check"
        }
      >
        {completed ? "✓" : "○"}
      </span>

      <div>
        <strong>{title}</strong>

        <small>
          {completed
            ? "Completed"
            : "Needs attention"}
        </small>
      </div>

    </div>
  )
}

export default CandidateDashboard