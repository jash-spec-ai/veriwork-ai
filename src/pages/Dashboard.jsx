import { useEffect, useMemo, useRef, useState } from "react"

function Dashboard() {
  const resumeInputRef = useRef(null)

  const [user, setUser] = useState({
    name: "Demo Candidate",
    jobTitle: "AI Engineer",
    location: "Vadodara, Gujarat",

    profileCompleted: true,

    resume: {
      uploaded: false,
      fileName: "",
    },

    github: {
      connected: false,
      url: "",
    },

    projects: [],
    skills: [],
    experience: [],
    certifications: [],
  })

  const [activeForm, setActiveForm] = useState(null)

  const [githubUrl, setGithubUrl] = useState("")

  const [projectForm, setProjectForm] = useState({
    title: "",
    link: "",
    description: "",
    file: null,
  })

  const [skillForm, setSkillForm] = useState({
    name: "",
    evidence: "",
    file: null,
  })

  const [experienceForm, setExperienceForm] = useState({
    company: "",
    role: "",
    duration: "",
    file: null,
  })

  const [certificationForm, setCertificationForm] = useState({
    name: "",
    issuer: "",
    credentialUrl: "",
    file: null,
  })

  useEffect(() => {
    const savedUser = localStorage.getItem(
      "veriwork_candidate_profile"
    )

    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch {
        localStorage.removeItem(
          "veriwork_candidate_profile"
        )
      }
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(
      "veriwork_candidate_profile",
      JSON.stringify(user)
    )
  }, [user])

  const completionItems = useMemo(
    () => [
      {
        title: "Profile",
        completed: user.profileCompleted,
      },
      {
        title: "Resume",
        completed: user.resume.uploaded,
      },
      {
        title: "GitHub",
        completed: user.github.connected,
      },
      {
        title: "Projects",
        completed: user.projects.length > 0,
      },
      {
        title: "Skills",
        completed: user.skills.length > 0,
      },
      {
        title: "Experience",
        completed: user.experience.length > 0,
      },
      {
        title: "Certifications",
        completed: user.certifications.length > 0,
      },
    ],
    [user]
  )

  const completion = useMemo(() => {
    const completed = completionItems.filter(
      (item) => item.completed
    ).length

    return Math.round(
      (completed / completionItems.length) * 100
    )
  }, [completionItems])

  const handleResumeUpload = (event) => {
    const file = event.target.files?.[0]

    if (!file) return

    setUser((current) => ({
      ...current,
      resume: {
        uploaded: true,
        fileName: file.name,
      },
    }))

    event.target.value = ""
  }

  const connectGithub = () => {
    if (!githubUrl.trim()) return

    setUser((current) => ({
      ...current,
      github: {
        connected: true,
        url: githubUrl.trim(),
      },
    }))

    setGithubUrl("")
    setActiveForm(null)
  }

  const addProject = () => {
    if (!projectForm.title.trim()) return

    setUser((current) => ({
      ...current,
      projects: [
        ...current.projects,
        {
          id: Date.now(),
          title: projectForm.title.trim(),
          link: projectForm.link.trim(),
          description: projectForm.description.trim(),
          fileName: projectForm.file?.name || "",
        },
      ],
    }))

    setProjectForm({
      title: "",
      link: "",
      description: "",
      file: null,
    })

    setActiveForm(null)
  }

  const addSkill = () => {
    if (!skillForm.name.trim()) return

    setUser((current) => ({
      ...current,
      skills: [
        ...current.skills,
        {
          id: Date.now(),
          name: skillForm.name.trim(),
          evidence: skillForm.evidence.trim(),
          fileName: skillForm.file?.name || "",
        },
      ],
    }))

    setSkillForm({
      name: "",
      evidence: "",
      file: null,
    })

    setActiveForm(null)
  }

  const addExperience = () => {
    if (
      !experienceForm.company.trim() ||
      !experienceForm.role.trim()
    ) {
      return
    }

    setUser((current) => ({
      ...current,
      experience: [
        ...current.experience,
        {
          id: Date.now(),
          company: experienceForm.company.trim(),
          role: experienceForm.role.trim(),
          duration: experienceForm.duration.trim(),
          fileName: experienceForm.file?.name || "",
        },
      ],
    }))

    setExperienceForm({
      company: "",
      role: "",
      duration: "",
      file: null,
    })

    setActiveForm(null)
  }

  const addCertification = () => {
    if (!certificationForm.name.trim()) return

    setUser((current) => ({
      ...current,
      certifications: [
        ...current.certifications,
        {
          id: Date.now(),
          name: certificationForm.name.trim(),
          issuer: certificationForm.issuer.trim(),
          credentialUrl:
            certificationForm.credentialUrl.trim(),
          fileName:
            certificationForm.file?.name || "",
        },
      ],
    }))

    setCertificationForm({
      name: "",
      issuer: "",
      credentialUrl: "",
      file: null,
    })

    setActiveForm(null)
  }

  return (
    <div className="pro-dashboard">

      <div className="pro-dashboard-heading">
        <div>
          <p className="pro-dashboard-eyebrow">
            OVERVIEW
          </p>

          <h1>
            Welcome back, {user.name}
          </h1>

          <p className="pro-dashboard-subtitle">
            {user.jobTitle} · {user.location}
          </p>
        </div>
      </div>

      <section className="pro-card pro-readiness-card">

        <div className="pro-card-header">

          <div>
            <p className="pro-card-label">
              PROFILE READINESS
            </p>

            <h2>
              Complete your professional profile
            </h2>

            <p>
              Add your information and supporting
              evidence to strengthen your profile.
            </p>
          </div>

          <div className="pro-readiness-score">
            {completion}%
          </div>

        </div>

        <div className="pro-progress-track">
          <div
            className="pro-progress-fill"
            style={{
              width: `${completion}%`,
            }}
          />
        </div>

        <div className="pro-status-grid">

          {completionItems.map((item) => (
            <StatusBox
              key={item.title}
              title={item.title}
              completed={item.completed}
            />
          ))}

        </div>

      </section>

      <section className="pro-card">

        <div className="pro-section-header">

          <div>
            <p className="pro-card-label">
              QUICK ACTIONS
            </p>

            <h2>
              Update your profile
            </h2>
          </div>

        </div>

        <div className="pro-action-grid">

          <ActionButton
            icon="↑"
            title={
              user.resume.uploaded
                ? "Replace Resume"
                : "Upload Resume"
            }
            subtitle="Upload your latest resume"
            onClick={() =>
              resumeInputRef.current?.click()
            }
          />

          <ActionButton
            icon="↗"
            title={
              user.github.connected
                ? "Update GitHub"
                : "Link GitHub"
            }
            subtitle="Connect your GitHub profile"
            onClick={() =>
              setActiveForm("github")
            }
          />

          <ActionButton
            icon="+"
            title="Add Project"
            subtitle="Add project details and evidence"
            onClick={() =>
              setActiveForm("project")
            }
          />

          <ActionButton
            icon="+"
            title="Add Skill"
            subtitle="Add skill and proof"
            onClick={() =>
              setActiveForm("skill")
            }
          />

          <ActionButton
            icon="+"
            title="Add Experience"
            subtitle="Add role and supporting document"
            onClick={() =>
              setActiveForm("experience")
            }
          />

          <ActionButton
            icon="+"
            title="Add Certification"
            subtitle="Add credential and certificate"
            onClick={() =>
              setActiveForm("certification")
            }
          />

        </div>

        <input
          ref={resumeInputRef}
          hidden
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={handleResumeUpload}
        />

      </section>

      <div className="pro-overview-grid">

        <MetricCard
          title="Projects"
          value={user.projects.length}
          subtitle="Professional work"
        />

        <MetricCard
          title="Skills"
          value={user.skills.length}
          subtitle="Skills added"
        />

        <MetricCard
          title="Experience"
          value={user.experience.length}
          subtitle="Professional roles"
        />

        <MetricCard
          title="Certifications"
          value={user.certifications.length}
          subtitle="Credentials added"
        />

      </div>

      <div className="pro-two-column">

        <section className="pro-card">

          <div className="pro-section-header">

            <div>
              <p className="pro-card-label">
                RESUME
              </p>

              <h2>
                Resume Status
              </h2>
            </div>

          </div>

          {user.resume.uploaded ? (

            <div className="pro-connected-panel">

              <div className="pro-status-icon success">
                ✓
              </div>

              <div className="pro-connected-content">

                <strong>
                  {user.resume.fileName}
                </strong>

                <span>
                  Resume selected for this profile
                </span>

              </div>

              <button
                className="pro-link-button"
                onClick={() =>
                  resumeInputRef.current?.click()
                }
              >
                Replace
              </button>

            </div>

          ) : (

            <div className="pro-empty-state">

              <div className="pro-empty-icon">
                ↑
              </div>

              <h3>
                No resume uploaded
              </h3>

              <p>
                Upload your resume to strengthen
                your profile.
              </p>

              <button
                className="pro-primary-button"
                onClick={() =>
                  resumeInputRef.current?.click()
                }
              >
                Upload Resume
              </button>

            </div>

          )}

        </section>

        <section className="pro-card">

          <div className="pro-section-header">

            <div>
              <p className="pro-card-label">
                PROFESSIONAL PROFILE
              </p>

              <h2>
                GitHub Connection
              </h2>
            </div>

          </div>

          {user.github.connected ? (

            <div className="pro-connected-panel">

              <div className="pro-status-icon success">
                ✓
              </div>

              <div className="pro-connected-content">

                <strong>
                  GitHub connected
                </strong>

                <a
                  href={user.github.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {user.github.url}
                </a>

              </div>

              <a
                href={user.github.url}
                target="_blank"
                rel="noopener noreferrer"
                className="pro-link-button"
              >
                Open ↗
              </a>

            </div>

          ) : (

            <div className="pro-empty-state">

              <div className="pro-empty-icon">
                ↗
              </div>

              <h3>
                GitHub not connected
              </h3>

              <p>
                Connect your GitHub profile to
                link repository evidence.
              </p>

              <button
                className="pro-primary-button"
                onClick={() =>
                  setActiveForm("github")
                }
              >
                Connect GitHub
              </button>

            </div>

          )}

        </section>

      </div>

      {activeForm === "github" && (
        <FormPanel
          title="Connect GitHub"
          onClose={() => setActiveForm(null)}
        >

          <label>
            GitHub profile URL
          </label>

          <input
            type="url"
            placeholder="https://github.com/username"
            value={githubUrl}
            onChange={(event) =>
              setGithubUrl(event.target.value)
            }
          />

          <FormActions
            onSave={connectGithub}
            onCancel={() =>
              setActiveForm(null)
            }
            saveText="Save GitHub"
          />

        </FormPanel>
      )}

      {activeForm === "project" && (
        <FormPanel
          title="Add Project"
          onClose={() => setActiveForm(null)}
        >

          <label>
            Project title
          </label>

          <input
            type="text"
            placeholder="e.g. AI Resume Analyzer"
            value={projectForm.title}
            onChange={(event) =>
              setProjectForm({
                ...projectForm,
                title: event.target.value,
              })
            }
          />

          <label>
            Description
          </label>

          <textarea
            placeholder="Briefly describe your project"
            value={projectForm.description}
            onChange={(event) =>
              setProjectForm({
                ...projectForm,
                description:
                  event.target.value,
              })
            }
          />

          <label>
            Project / GitHub URL
          </label>

          <input
            type="url"
            placeholder="https://github.com/..."
            value={projectForm.link}
            onChange={(event) =>
              setProjectForm({
                ...projectForm,
                link: event.target.value,
              })
            }
          />

          <label>
            Supporting file
          </label>

          <input
            type="file"
            accept=".pdf,.zip,.png,.jpg,.jpeg,.ppt,.pptx,.doc,.docx"
            onChange={(event) =>
              setProjectForm({
                ...projectForm,
                file:
                  event.target.files?.[0] || null,
              })
            }
          />

          {projectForm.file && (
            <p className="pro-selected-file">
              Selected: {projectForm.file.name}
            </p>
          )}

          <FormActions
            onSave={addProject}
            onCancel={() =>
              setActiveForm(null)
            }
            saveText="Save Project"
          />

        </FormPanel>
      )}

      {activeForm === "skill" && (
        <FormPanel
          title="Add Skill"
          onClose={() => setActiveForm(null)}
        >

          <label>
            Skill name
          </label>

          <input
            type="text"
            placeholder="e.g. React"
            value={skillForm.name}
            onChange={(event) =>
              setSkillForm({
                ...skillForm,
                name: event.target.value,
              })
            }
          />

          <label>
            Evidence note
          </label>

          <textarea
            placeholder="Describe where you used this skill"
            value={skillForm.evidence}
            onChange={(event) =>
              setSkillForm({
                ...skillForm,
                evidence:
                  event.target.value,
              })
            }
          />

          <label>
            Supporting file
          </label>

          <input
            type="file"
            accept=".pdf,.png,.jpg,.jpeg,.doc,.docx,.ppt,.pptx"
            onChange={(event) =>
              setSkillForm({
                ...skillForm,
                file:
                  event.target.files?.[0] || null,
              })
            }
          />

          {skillForm.file && (
            <p className="pro-selected-file">
              Selected: {skillForm.file.name}
            </p>
          )}

          <FormActions
            onSave={addSkill}
            onCancel={() =>
              setActiveForm(null)
            }
            saveText="Save Skill"
          />

        </FormPanel>
      )}

      {activeForm === "experience" && (
        <FormPanel
          title="Add Experience"
          onClose={() => setActiveForm(null)}
        >

          <label>
            Company
          </label>

          <input
            type="text"
            placeholder="Company name"
            value={experienceForm.company}
            onChange={(event) =>
              setExperienceForm({
                ...experienceForm,
                company: event.target.value,
              })
            }
          />

          <label>
            Role
          </label>

          <input
            type="text"
            placeholder="Job title"
            value={experienceForm.role}
            onChange={(event) =>
              setExperienceForm({
                ...experienceForm,
                role: event.target.value,
              })
            }
          />

          <label>
            Duration
          </label>

          <input
            type="text"
            placeholder="e.g. Jan 2024 - Present"
            value={experienceForm.duration}
            onChange={(event) =>
              setExperienceForm({
                ...experienceForm,
                duration:
                  event.target.value,
              })
            }
          />

          <label>
            Supporting document
          </label>

          <input
            type="file"
            accept=".pdf,.png,.jpg,.jpeg,.doc,.docx"
            onChange={(event) =>
              setExperienceForm({
                ...experienceForm,
                file:
                  event.target.files?.[0] || null,
              })
            }
          />

          {experienceForm.file && (
            <p className="pro-selected-file">
              Selected: {experienceForm.file.name}
            </p>
          )}

          <FormActions
            onSave={addExperience}
            onCancel={() =>
              setActiveForm(null)
            }
            saveText="Save Experience"
          />

        </FormPanel>
      )}

      {activeForm === "certification" && (
        <FormPanel
          title="Add Certification"
          onClose={() => setActiveForm(null)}
        >

          <label>
            Certification name
          </label>

          <input
            type="text"
            placeholder="e.g. AWS Certified Developer"
            value={certificationForm.name}
            onChange={(event) =>
              setCertificationForm({
                ...certificationForm,
                name: event.target.value,
              })
            }
          />

          <label>
            Issuer
          </label>

          <input
            type="text"
            placeholder="e.g. Amazon Web Services"
            value={certificationForm.issuer}
            onChange={(event) =>
              setCertificationForm({
                ...certificationForm,
                issuer: event.target.value,
              })
            }
          />

          <label>
            Credential URL
          </label>

          <input
            type="url"
            placeholder="https://..."
            value={certificationForm.credentialUrl}
            onChange={(event) =>
              setCertificationForm({
                ...certificationForm,
                credentialUrl:
                  event.target.value,
              })
            }
          />

          <label>
            Certificate file
          </label>

          <input
            type="file"
            accept=".pdf,.png,.jpg,.jpeg"
            onChange={(event) =>
              setCertificationForm({
                ...certificationForm,
                file:
                  event.target.files?.[0] || null,
              })
            }
          />

          {certificationForm.file && (
            <p className="pro-selected-file">
              Selected: {certificationForm.file.name}
            </p>
          )}

          <FormActions
            onSave={addCertification}
            onCancel={() =>
              setActiveForm(null)
            }
            saveText="Save Certification"
          />

        </FormPanel>
      )}

      {user.projects.length > 0 && (
        <section className="pro-card">

          <div className="pro-section-header">

            <div>
              <p className="pro-card-label">
                PROJECTS
              </p>

              <h2>
                Your Projects
              </h2>
            </div>

          </div>

          <div className="pro-list">

            {user.projects.map((project) => (
              <div
                className="pro-list-row"
                key={project.id}
              >

                <div>

                  <strong>
                    {project.title}
                  </strong>

                  {project.description && (
                    <span>
                      {project.description}
                    </span>
                  )}

                  {project.fileName && (
                    <span>
                      📎 {project.fileName}
                    </span>
                  )}

                </div>

                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pro-link-button"
                  >
                    Open Project ↗
                  </a>
                )}

              </div>
            ))}

          </div>

        </section>
      )}

      {user.skills.length > 0 && (
        <section className="pro-card">

          <div className="pro-section-header">

            <div>
              <p className="pro-card-label">
                SKILLS
              </p>

              <h2>
                Your Skills
              </h2>
            </div>

          </div>

          <div className="pro-list">

            {user.skills.map((skill) => (
              <div
                className="pro-list-row"
                key={skill.id}
              >

                <div>

                  <strong>
                    {skill.name}
                  </strong>

                  {skill.evidence && (
                    <span>
                      {skill.evidence}
                    </span>
                  )}

                  {skill.fileName && (
                    <span>
                      📎 {skill.fileName}
                    </span>
                  )}

                </div>

              </div>
            ))}

          </div>

        </section>
      )}

      {user.experience.length > 0 && (
        <section className="pro-card">

          <div className="pro-section-header">

            <div>
              <p className="pro-card-label">
                EXPERIENCE
              </p>

              <h2>
                Your Experience
              </h2>
            </div>

          </div>

          <div className="pro-list">

            {user.experience.map((item) => (
              <div
                className="pro-list-row"
                key={item.id}
              >

                <div>

                  <strong>
                    {item.role}
                  </strong>

                  <span>
                    {item.company}
                  </span>

                  {item.duration && (
                    <span>
                      {item.duration}
                    </span>
                  )}

                  {item.fileName && (
                    <span>
                      📎 {item.fileName}
                    </span>
                  )}

                </div>

              </div>
            ))}

          </div>

        </section>
      )}

      {user.certifications.length > 0 && (
        <section className="pro-card">

          <div className="pro-section-header">

            <div>
              <p className="pro-card-label">
                CERTIFICATIONS
              </p>

              <h2>
                Your Certifications
              </h2>
            </div>

          </div>

          <div className="pro-list">

            {user.certifications.map((item) => (
              <div
                className="pro-list-row"
                key={item.id}
              >

                <div>

                  <strong>
                    {item.name}
                  </strong>

                  {item.issuer && (
                    <span>
                      {item.issuer}
                    </span>
                  )}

                  {item.fileName && (
                    <span>
                      📎 {item.fileName}
                    </span>
                  )}

                </div>

                {item.credentialUrl && (
                  <a
                    href={item.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pro-link-button"
                  >
                    Open Credential ↗
                  </a>
                )}

              </div>
            ))}

          </div>

        </section>
      )}

    </div>
  )
}

function StatusBox({ title, completed }) {
  return (
    <div
      className={
        completed
          ? "pro-status-box completed"
          : "pro-status-box incomplete"
      }
    >

      <span className="pro-status-dot">
        {completed ? "✓" : "○"}
      </span>

      <div>

        <strong>
          {title}
        </strong>

        <small>
          {completed
            ? "Completed"
            : "Needs attention"}
        </small>

      </div>

    </div>
  )
}

function ActionButton({
  icon,
  title,
  subtitle,
  onClick,
}) {
  return (
    <button
      className="pro-action-button"
      onClick={onClick}
    >

      <span className="pro-action-icon">
        {icon}
      </span>

      <div>
        <strong>
          {title}
        </strong>

        <small>
          {subtitle}
        </small>
      </div>

    </button>
  )
}

function MetricCard({
  title,
  value,
  subtitle,
}) {
  return (
    <div className="pro-metric-card">

      <span>
        {title}
      </span>

      <strong>
        {value}
      </strong>

      <small>
        {subtitle}
      </small>

    </div>
  )
}

function FormPanel({
  title,
  children,
  onClose,
}) {
  return (
    <section className="pro-card pro-form-panel">

      <div className="pro-section-header">

        <h2>
          {title}
        </h2>

        <button
          className="pro-close-button"
          onClick={onClose}
          type="button"
        >
          ×
        </button>

      </div>

      <div className="pro-form">
        {children}
      </div>

    </section>
  )
}

function FormActions({
  onSave,
  onCancel,
  saveText,
}) {
  return (
    <div className="pro-form-actions">

      <button
        className="pro-primary-button"
        onClick={onSave}
        type="button"
      >
        {saveText}
      </button>

      <button
        className="pro-secondary-button"
        onClick={onCancel}
        type="button"
      >
        Cancel
      </button>

    </div>
  )
}

export default Dashboard