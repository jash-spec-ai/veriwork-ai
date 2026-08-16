import { useState } from "react"

function CandidateResearch() {
  const [research, setResearch] = useState([
    {
      id: 1,
      title: "AI-Based Resume Analysis",
      publication: "University Research Project",
      year: "2026",
      type: "Research Project",
    },
  ])

  const [title, setTitle] = useState("")
  const [publication, setPublication] = useState("")
  const [year, setYear] = useState("")

  const addResearch = () => {
    if (!title.trim()) return

    setResearch([
      ...research,
      {
        id: Date.now(),
        title,
        publication,
        year,
        type: "Research",
      },
    ])

    setTitle("")
    setPublication("")
    setYear("")
  }

  return (
    <div className="candidate-page">

      <div className="candidate-page-header">
        <div>
          <span className="candidate-eyebrow">
            RESEARCH
          </span>
          <h1>Research & Publications</h1>
          <p>
            Showcase research projects, papers and academic work.
          </p>
        </div>
      </div>

      <section className="candidate-card">

        <h2>Add Research</h2>

        <div className="candidate-form-grid">

          <input
            className="candidate-input"
            placeholder="Research title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            className="candidate-input"
            placeholder="Publication / Institution"
            value={publication}
            onChange={(e) =>
              setPublication(e.target.value)
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
          onClick={addResearch}
        >
          + Add Research
        </button>

      </section>

      <div className="candidate-research-list">

        {research.map((item) => (
          <section
            className="candidate-card candidate-research-card"
            key={item.id}
          >

            <div className="research-icon">
              R
            </div>

            <div className="research-content">

              <div className="research-heading">
                <span>{item.type}</span>
                <small>{item.year}</small>
              </div>

              <h2>{item.title}</h2>

              <p>{item.publication}</p>

              <button className="candidate-outline-button">
                View Research
              </button>

            </div>

          </section>
        ))}

      </div>

    </div>
  )
}

export default CandidateResearch