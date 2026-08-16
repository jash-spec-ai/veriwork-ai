import { useState } from "react"

function CandidateAchievements() {
  const [achievements, setAchievements] = useState([
    {
      id: 1,
      title: "Hackathon Finalist",
      organization: "University Hackathon",
      year: "2026",
    },
    {
      id: 2,
      title: "Programming Competition",
      organization: "Coding Club",
      year: "2025",
    },
  ])

  const [title, setTitle] = useState("")
  const [organization, setOrganization] = useState("")
  const [year, setYear] = useState("")

  const addAchievement = () => {
    if (!title.trim()) return

    setAchievements([
      ...achievements,
      {
        id: Date.now(),
        title,
        organization,
        year,
      },
    ])

    setTitle("")
    setOrganization("")
    setYear("")
  }

  return (
    <div className="candidate-page">

      <div className="candidate-page-header">
        <div>
          <span className="candidate-eyebrow">
            ACHIEVEMENTS
          </span>
          <h1>Achievements</h1>
          <p>
            Highlight awards, competitions and other accomplishments.
          </p>
        </div>
      </div>

      <section className="candidate-card">

        <h2>Add Achievement</h2>

        <div className="candidate-form-grid">

          <input
            className="candidate-input"
            placeholder="Achievement"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            className="candidate-input"
            placeholder="Organization"
            value={organization}
            onChange={(e) =>
              setOrganization(e.target.value)
            }
          />

          <input
            className="candidate-input"
            placeholder="Year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />

        </div>

        <button
          className="candidate-primary-button"
          onClick={addAchievement}
        >
          + Add Achievement
        </button>

      </section>

      <div className="candidate-achievement-list">

        {achievements.map((achievement) => (
          <section
            className="candidate-card candidate-achievement-card"
            key={achievement.id}
          >

            <div className="achievement-icon">
              ★
            </div>

            <div>
              <h2>{achievement.title}</h2>
              <p>{achievement.organization}</p>
            </div>

            <span className="achievement-year">
              {achievement.year}
            </span>

          </section>
        ))}

      </div>

    </div>
  )
}

export default CandidateAchievements