function CandidateVerifiedSkills() {
  const verifiedSkills = [
    {
      name: "Python",
      score: 91,
      evidence: "GitHub repositories and project activity",
    },
    {
      name: "React",
      score: 88,
      evidence: "Multiple frontend projects",
    },
    {
      name: "JavaScript",
      score: 84,
      evidence: "Repository activity and projects",
    },
    {
      name: "SQL",
      score: 79,
      evidence: "Database projects and coursework",
    },
  ]

  return (
    <div className="candidate-page">

      <div className="candidate-page-header">
        <div>
          <span className="candidate-eyebrow">
            VERIFIED SKILLS
          </span>
          <h1>Verified Skills</h1>
          <p>
            Skills supported by evidence from your professional activity.
          </p>
        </div>
      </div>

      <section className="candidate-card verified-banner">
        <div className="verified-banner-icon">✓</div>

        <div>
          <h2>Evidence-backed skills</h2>
          <p>
            These skills have supporting evidence that can be reviewed
            by recruiters.
          </p>
        </div>
      </section>

      <div className="candidate-verified-grid">

        {verifiedSkills.map((skill) => (
          <section
            className="candidate-card verified-skill-card"
            key={skill.name}
          >

            <div className="verified-skill-header">
              <div className="candidate-skill-icon">
                ✓
              </div>

              <span className="verified-badge">
                VERIFIED
              </span>
            </div>

            <h2>{skill.name}</h2>

            <div className="verified-score">
              <strong>{skill.score}</strong>
              <span>/100 evidence score</span>
            </div>

            <div className="candidate-progress">
              <div style={{ width: `${skill.score}%` }}></div>
            </div>

            <p>{skill.evidence}</p>

            <button className="candidate-outline-button">
              View Evidence
            </button>

          </section>
        ))}

      </div>

    </div>
  )
}

export default CandidateVerifiedSkills