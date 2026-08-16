import { useState } from "react"

function CandidateProfilesLinks() {
  const [github, setGithub] = useState(
    "https://github.com/example"
  )

  const [linkedin, setLinkedin] = useState(
    "https://linkedin.com/in/example"
  )

  const [saved, setSaved] = useState(false)

  const saveLinks = () => {
    setSaved(true)

    setTimeout(() => {
      setSaved(false)
    }, 2500)
  }

  return (
    <div className="candidate-page">

      <div className="candidate-page-header">
        <div>
          <span className="candidate-eyebrow">
            PROFILES & LINKS
          </span>
          <h1>Professional Profiles</h1>
          <p>
            Connect your external professional profiles.
          </p>
        </div>
      </div>

      <section className="candidate-card">

        <div className="candidate-social-row">

          <div className="candidate-social-icon github">
            GH
          </div>

          <div className="candidate-social-content">
            <h2>GitHub</h2>
            <p>Showcase your repositories and coding activity.</p>

            <input
              className="candidate-input"
              value={github}
              onChange={(e) => setGithub(e.target.value)}
            />
          </div>

          <span className="candidate-connected">
            Connected
          </span>

        </div>

        <hr />

        <div className="candidate-social-row">

          <div className="candidate-social-icon linkedin">
            in
          </div>

          <div className="candidate-social-content">
            <h2>LinkedIn</h2>
            <p>Connect your professional networking profile.</p>

            <input
              className="candidate-input"
              value={linkedin}
              onChange={(e) => setLinkedin(e.target.value)}
            />
          </div>

          <span className="candidate-connected">
            Connected
          </span>

        </div>

        <button
          className="candidate-primary-button"
          onClick={saveLinks}
        >
          Save Profiles
        </button>

        {saved && (
          <div className="candidate-success">
            ✓ Profiles updated successfully.
          </div>
        )}

      </section>

    </div>
  )
}

export default CandidateProfilesLinks