import { useState } from "react"

function CandidateProfile() {
  const [editing, setEditing] = useState(false)

  const [profile, setProfile] = useState({
    name: "Demo Candidate",
    role: "AI Engineer",
    email: "candidate@example.com",
    phone: "+91 98765 43210",
    location: "Vadodara, Gujarat",
    bio: "AI Engineer interested in machine learning, software development and emerging technologies.",
    linkedin: "https://linkedin.com/",
    github: "https://github.com/",
  })

  const updateField = (field, value) => {
    setProfile((current) => ({
      ...current,
      [field]: value,
    }))
  }

  return (
    <div className="candidate-page">

      <div className="candidate-page-header">

        <div>
          <p className="candidate-eyebrow">
            PERSONAL INFORMATION
          </p>

          <h1>My Profile</h1>

          <p>
            Manage your professional identity and personal information.
          </p>
        </div>

        <button
          className="candidate-primary-button"
          onClick={() => setEditing(!editing)}
        >
          {editing ? "Save Changes" : "Edit Profile"}
        </button>

      </div>

      <div className="candidate-profile-grid">

        <section className="candidate-card candidate-profile-card">

          <div className="candidate-profile-cover" />

          <div className="candidate-avatar">
            {profile.name.charAt(0).toUpperCase()}
          </div>

          <div className="candidate-profile-main">

            {editing ? (
              <input
                className="candidate-input"
                value={profile.name}
                onChange={(event) =>
                  updateField("name", event.target.value)
                }
              />
            ) : (
              <h2>{profile.name}</h2>
            )}

            <p className="candidate-profile-role">
              {profile.role}
            </p>

            <p className="candidate-profile-location">
              📍 {profile.location}
            </p>

          </div>

          <div className="candidate-divider" />

          <h3>About Me</h3>

          {editing ? (
            <textarea
              className="candidate-textarea"
              value={profile.bio}
              onChange={(event) =>
                updateField("bio", event.target.value)
              }
            />
          ) : (
            <p className="candidate-bio">
              {profile.bio}
            </p>
          )}

        </section>

        <section className="candidate-card">

          <p className="candidate-card-label">
            PROFILE COMPLETION
          </p>

          <h2>80%</h2>

          <div className="candidate-progress">
            <div
              className="candidate-progress-fill"
              style={{ width: "80%" }}
            />
          </div>

          <p>
            Add supporting information to make your profile more complete.
          </p>

          <div className="candidate-completion-list">
            <div>✓ Basic information</div>
            <div>✓ Contact information</div>
            <div>✓ Professional information</div>
            <div>✓ Professional links</div>
            <div className="incomplete">○ Profile photo</div>
          </div>

        </section>

      </div>

      <div className="candidate-two-column">

        <section className="candidate-card">

          <h2>Contact Information</h2>

          <div className="candidate-detail-list">

            <div>
              <span>Email</span>

              {editing ? (
                <input
                  className="candidate-input"
                  value={profile.email}
                  onChange={(event) =>
                    updateField("email", event.target.value)
                  }
                />
              ) : (
                <strong>{profile.email}</strong>
              )}
            </div>

            <div>
              <span>Phone</span>
              <strong>{profile.phone}</strong>
            </div>

            <div>
              <span>Location</span>
              <strong>{profile.location}</strong>
            </div>

          </div>

        </section>

        <section className="candidate-card">

          <h2>Professional Links</h2>

          <div className="candidate-social-links">

            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>in</span>
              LinkedIn
            </a>

            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>GH</span>
              GitHub
            </a>

          </div>

        </section>

      </div>

    </div>
  )
}

export default CandidateProfile