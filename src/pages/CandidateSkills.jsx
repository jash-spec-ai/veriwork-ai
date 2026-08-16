import { useState } from "react"

function CandidateSkills() {
  const [skills, setSkills] = useState([
    {
      id: 1,
      name: "Python",
      level: "Advanced",
      category: "Programming",
    },
    {
      id: 2,
      name: "React",
      level: "Intermediate",
      category: "Frontend",
    },
    {
      id: 3,
      name: "Machine Learning",
      level: "Intermediate",
      category: "AI / ML",
    },
    {
      id: 4,
      name: "SQL",
      level: "Intermediate",
      category: "Database",
    },
  ])

  const [showForm, setShowForm] = useState(false)

  const [form, setForm] = useState({
    name: "",
    level: "Intermediate",
    category: "Programming",
  })

  const addSkill = (event) => {
    event.preventDefault()

    if (!form.name.trim()) return

    setSkills((current) => [
      ...current,
      {
        id: Date.now(),
        name: form.name,
        level: form.level,
        category: form.category,
      },
    ])

    setForm({
      name: "",
      level: "Intermediate",
      category: "Programming",
    })

    setShowForm(false)
  }

  const removeSkill = (id) => {
    setSkills((current) =>
      current.filter((skill) => skill.id !== id)
    )
  }

  return (
    <div className="candidate-page">

      <div className="candidate-page-header">

        <div>
          <p className="candidate-eyebrow">
            PROFESSIONAL SKILLS
          </p>

          <h1>Skills</h1>

          <p>
            Add and manage the skills you want to showcase on your profile.
          </p>
        </div>

        <button
          className="candidate-primary-button"
          onClick={() => setShowForm(!showForm)}
        >
          + Add Skill
        </button>

      </div>

      {showForm && (
        <section className="candidate-card candidate-form-card">

          <h2>Add Skill</h2>

          <form onSubmit={addSkill}>

            <label>Skill Name</label>

            <input
              value={form.name}
              onChange={(event) =>
                setForm({
                  ...form,
                  name: event.target.value,
                })
              }
              placeholder="e.g. Java, Python, React"
            />

            <label>Skill Level</label>

            <select
              value={form.level}
              onChange={(event) =>
                setForm({
                  ...form,
                  level: event.target.value,
                })
              }
            >
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
              <option>Expert</option>
            </select>

            <label>Category</label>

            <select
              value={form.category}
              onChange={(event) =>
                setForm({
                  ...form,
                  category: event.target.value,
                })
              }
            >
              <option>Programming</option>
              <option>Frontend</option>
              <option>Backend</option>
              <option>AI / ML</option>
              <option>Database</option>
              <option>Cloud</option>
              <option>Tools</option>
              <option>Other</option>
            </select>

            <div className="candidate-form-actions">

              <button
                type="submit"
                className="candidate-primary-button"
              >
                Add Skill
              </button>

              <button
                type="button"
                className="candidate-secondary-button"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>

            </div>

          </form>

        </section>
      )}

      <section className="candidate-card">

        <div className="candidate-section-heading">

          <div>
            <p className="candidate-card-label">
              SKILL INVENTORY
            </p>

            <h2>
              Your Skills
            </h2>

            <p>
              These skills are displayed on your candidate profile.
            </p>
          </div>

          <strong className="candidate-skill-count">
            {skills.length} Skills
          </strong>

        </div>

        <div className="candidate-skill-list">

          {skills.map((skill) => (

            <div
              className="candidate-skill-item"
              key={skill.id}
            >

              <div className="candidate-skill-icon">
                ✓
              </div>

              <div className="candidate-skill-content">

                <strong>
                  {skill.name}
                </strong>

                <span>
                  {skill.category}
                </span>

              </div>

              <div className="candidate-skill-level">
                {skill.level}
              </div>

              <button
                className="candidate-remove-button"
                onClick={() => removeSkill(skill.id)}
              >
                Remove
              </button>

            </div>

          ))}

        </div>

      </section>

      <section className="candidate-card candidate-tip-card">

        <div className="candidate-tip-icon">
          ✓
        </div>

        <div>
          <h3>
            Want to verify your skills?
          </h3>

          <p>
            Add supporting projects, certifications, GitHub repositories
            or other evidence. Verified skills can help recruiters
            understand your capabilities more confidently.
          </p>
        </div>

      </section>

    </div>
  )
}

export default CandidateSkills