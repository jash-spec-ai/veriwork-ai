import { useState } from "react"

function CandidateProjects() {
  const [projects, setProjects] = useState([
    {
      id: 1,
      title: "AI Resume Analyzer",
      description:
        "A system that analyzes resumes and extracts relevant professional information.",
      link: "https://github.com/",
      technologies: "Python, React, Machine Learning",
    },
    {
      id: 2,
      title: "Candidate Verification Platform",
      description:
        "A web application for validating candidate skills using professional evidence.",
      link: "https://github.com/",
      technologies: "React, JavaScript, Node.js",
    },
  ])

  const [showForm, setShowForm] = useState(false)

  const [form, setForm] = useState({
    title: "",
    description: "",
    technologies: "",
    link: "",
  })

  const addProject = (event) => {
    event.preventDefault()

    if (!form.title.trim()) return

    setProjects((current) => [
      ...current,
      {
        id: Date.now(),
        title: form.title,
        description: form.description,
        technologies: form.technologies,
        link: form.link,
      },
    ])

    setForm({
      title: "",
      description: "",
      technologies: "",
      link: "",
    })

    setShowForm(false)
  }

  return (
    <div className="candidate-page">

      <div className="candidate-page-header">

        <div>
          <p className="candidate-eyebrow">
            PROFESSIONAL WORK
          </p>

          <h1>Projects</h1>

          <p>
            Showcase projects that demonstrate your technical skills.
          </p>
        </div>

        <button
          className="candidate-primary-button"
          onClick={() => setShowForm(!showForm)}
        >
          + Add Project
        </button>

      </div>

      {showForm && (
        <section className="candidate-card candidate-form-card">

          <h2>Add Project</h2>

          <form onSubmit={addProject}>

            <label>Project Name</label>

            <input
              value={form.title}
              onChange={(event) =>
                setForm({
                  ...form,
                  title: event.target.value,
                })
              }
              placeholder="e.g. AI Resume Analyzer"
            />

            <label>Description</label>

            <textarea
              value={form.description}
              onChange={(event) =>
                setForm({
                  ...form,
                  description: event.target.value,
                })
              }
              placeholder="Describe your project..."
            />

            <label>Technologies Used</label>

            <input
              value={form.technologies}
              onChange={(event) =>
                setForm({
                  ...form,
                  technologies: event.target.value,
                })
              }
              placeholder="React, Python, SQL..."
            />

            <label>Project / GitHub URL</label>

            <input
              type="url"
              value={form.link}
              onChange={(event) =>
                setForm({
                  ...form,
                  link: event.target.value,
                })
              }
              placeholder="https://github.com/..."
            />

            <div className="candidate-form-actions">

              <button
                type="submit"
                className="candidate-primary-button"
              >
                Save Project
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

      <div className="candidate-project-grid">

        {projects.map((project) => (

          <section
            className="candidate-card candidate-project-card"
            key={project.id}
          >

            <div className="candidate-project-icon">
              &lt;/&gt;
            </div>

            <h2>{project.title}</h2>

            <p>
              {project.description}
            </p>

            {project.technologies && (
              <div className="candidate-tags">

                {project.technologies
                  .split(",")
                  .map((technology) => (
                    <span key={technology}>
                      {technology.trim()}
                    </span>
                  ))}

              </div>
            )}

            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="candidate-link-button"
              >
                View Project ↗
              </a>
            )}

          </section>

        ))}

      </div>

    </div>
  )
}

export default CandidateProjects