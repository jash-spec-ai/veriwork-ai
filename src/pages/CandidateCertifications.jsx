import { useState } from "react"

function CandidateCertifications() {
  const [certifications, setCertifications] = useState([
    {
      id: 1,
      name: "AWS Cloud Practitioner",
      issuer: "Amazon Web Services",
      year: "2025",
      status: "Verified",
    },
    {
      id: 2,
      name: "Python Programming",
      issuer: "Professional Certification Board",
      year: "2025",
      status: "Verified",
    },
  ])

  const [name, setName] = useState("")
  const [issuer, setIssuer] = useState("")
  const [year, setYear] = useState("")

  const addCertification = () => {
    if (!name.trim()) return

    setCertifications([
      ...certifications,
      {
        id: Date.now(),
        name,
        issuer,
        year,
        status: "Pending",
      },
    ])

    setName("")
    setIssuer("")
    setYear("")
  }

  return (
    <div className="candidate-page">

      <div className="candidate-page-header">
        <div>
          <span className="candidate-eyebrow">
            CERTIFICATIONS
          </span>
          <h1>Certifications</h1>
          <p>
            Add professional certifications and credentials.
          </p>
        </div>
      </div>

      <section className="candidate-card">

        <h2>Add Certification</h2>

        <div className="candidate-form-grid">

          <input
            className="candidate-input"
            placeholder="Certification name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            className="candidate-input"
            placeholder="Issuing organization"
            value={issuer}
            onChange={(e) => setIssuer(e.target.value)}
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
          onClick={addCertification}
        >
          + Add Certification
        </button>

      </section>

      <div className="candidate-certification-grid">

        {certifications.map((cert) => (
          <section
            className="candidate-card certification-card"
            key={cert.id}
          >

            <div className="certification-icon">
              ★
            </div>

            <div className="certification-header">
              <h2>{cert.name}</h2>

              <span
                className={
                  cert.status === "Verified"
                    ? "verified-badge"
                    : "pending-badge"
                }
              >
                {cert.status}
              </span>
            </div>

            <p>{cert.issuer}</p>

            <span className="certification-year">
              Issued {cert.year}
            </span>

            <button className="candidate-outline-button">
              View Credential
            </button>

          </section>
        ))}

      </div>

    </div>
  )
}

export default CandidateCertifications