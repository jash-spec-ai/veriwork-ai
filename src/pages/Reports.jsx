import { useMemo, useState } from "react"

const reportData = [
  {
    id: 1,
    candidate: "Aarav Patel",
    requisition: "Senior Python Developer",
    skill: "Python",
    score: 82,
    status: "Verified",
    repositories: 4,
    commits: 340,
  },
  {
    id: 2,
    candidate: "Riya Shah",
    requisition: "Machine Learning Engineer",
    skill: "Machine Learning",
    score: 76,
    status: "Verified",
    repositories: 5,
    commits: 286,
  },
  {
    id: 3,
    candidate: "Dev Mehta",
    requisition: "Frontend Engineer",
    skill: "React",
    score: 68,
    status: "Pending",
    repositories: 2,
    commits: 144,
  },
  {
    id: 4,
    candidate: "Neha Sharma",
    requisition: "Senior Python Developer",
    skill: "Python",
    score: 91,
    status: "Verified",
    repositories: 7,
    commits: 510,
  },
]

function getScoreLabel(score) {
  if (score >= 80) {
    return "Strong Evidence"
  }

  if (score >= 60) {
    return "Moderate Evidence"
  }

  return "Limited Evidence"
}

function Reports() {
  const [statusFilter, setStatusFilter] =
    useState("All")

  const [skillFilter, setSkillFilter] =
    useState("All")

  const [selectedCandidate, setSelectedCandidate] =
    useState(null)

  const filteredRows = useMemo(() => {
    return reportData.filter((row) => {

      const statusMatches =
        statusFilter === "All" ||
        row.status === statusFilter

      const skillMatches =
        skillFilter === "All" ||
        row.skill === skillFilter

      return statusMatches && skillMatches
    })
  }, [statusFilter, skillFilter])

  const totalCandidates = reportData.length

  const verifiedCandidates =
    reportData.filter(
      (candidate) =>
        candidate.status === "Verified"
    ).length

  const pendingCandidates =
    reportData.filter(
      (candidate) =>
        candidate.status === "Pending"
    ).length

  const averageScore =
    reportData.length > 0
      ? Math.round(
          reportData.reduce(
            (total, candidate) =>
              total + candidate.score,
            0
          ) / reportData.length
        )
      : 0

  const exportCSV = () => {
    const headers = [
      "Candidate",
      "Requisition",
      "Skill",
      "Score",
      "Status",
      "Repositories",
      "Commits",
    ]

    const rows = filteredRows.map((row) => [
      row.candidate,
      row.requisition,
      row.skill,
      row.score,
      row.status,
      row.repositories,
      row.commits,
    ])

    const csv = [
      headers,
      ...rows,
    ]
      .map((row) =>
        row
          .map((value) =>
            `"${String(value).replace(
              /"/g,
              '""'
            )}"`
          )
          .join(",")
      )
      .join("\n")

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    })

    const url = URL.createObjectURL(blob)

    const link =
      document.createElement("a")

    link.href = url
    link.download =
      "veriwork-candidate-report.csv"

    document.body.appendChild(link)

    link.click()

    document.body.removeChild(link)

    URL.revokeObjectURL(url)
  }

  const exportPDF = () => {
    window.print()
  }

  return (
    <div className="reports-page">

      <div className="page-heading">

        <div>

          <h1>
            Reports & Exports
          </h1>

          <p>
            Review candidate verification results
            and supporting evidence.
          </p>

        </div>

        <div className="report-actions">

          <button
            className="secondary-button"
            onClick={exportCSV}
          >
            Export CSV
          </button>

          <button
            className="primary-button"
            onClick={exportPDF}
          >
            Export PDF
          </button>

        </div>

      </div>

      <div className="report-filters">

        <select
          value={skillFilter}
          onChange={(event) =>
            setSkillFilter(
              event.target.value
            )
          }
        >
          <option value="All">
            All Skills
          </option>

          <option value="Python">
            Python
          </option>

          <option value="Machine Learning">
            Machine Learning
          </option>

          <option value="React">
            React
          </option>

        </select>

        <select
          value={statusFilter}
          onChange={(event) =>
            setStatusFilter(
              event.target.value
            )
          }
        >
          <option value="All">
            All Status
          </option>

          <option value="Verified">
            Verified
          </option>

          <option value="Pending">
            Pending
          </option>

        </select>

      </div>

      <div className="report-stats">

        <div className="metric-card">

          <p className="metric-label">
            Total Candidates
          </p>

          <h2 className="metric-value">
            {totalCandidates}
          </h2>

          <p className="metric-description">
            Included in reports
          </p>

        </div>

        <div className="metric-card">

          <p className="metric-label">
            Verified
          </p>

          <h2 className="metric-value">
            {verifiedCandidates}
          </h2>

          <p className="metric-description">
            Verification completed
          </p>

        </div>

        <div className="metric-card">

          <p className="metric-label">
            Pending
          </p>

          <h2 className="metric-value">
            {pendingCandidates}
          </h2>

          <p className="metric-description">
            Awaiting candidate action
          </p>

        </div>

        <div className="metric-card">

          <p className="metric-label">
            Average Score
          </p>

          <h2 className="metric-value">
            {averageScore}/100
          </h2>

          <p className="metric-description">
            Across all candidates
          </p>

        </div>

      </div>

      <section className="report-panel">

        <div className="panel-heading">

          <div>

            <h2>
              Candidate Results
            </h2>

            <p>
              {filteredRows.length} candidate
              {filteredRows.length !== 1
                ? "s"
                : ""}{" "}
              shown
            </p>

          </div>

        </div>

        <div className="report-table-wrapper">

          <table className="report-table">

            <thead>

              <tr>
                <th>
                  Candidate
                </th>

                <th>
                  Requisition
                </th>

                <th>
                  Skill
                </th>

                <th>
                  Score
                </th>

                <th>
                  Status
                </th>

                <th>
                  Evidence
                </th>
              </tr>

            </thead>

            <tbody>

              {filteredRows.length > 0 ? (

                filteredRows.map((row) => (

                  <tr key={row.id}>

                    <td>
                      <strong>
                        {row.candidate}
                      </strong>
                    </td>

                    <td>
                      {row.requisition}
                    </td>

                    <td>
                      {row.skill}
                    </td>

                    <td>

                      <div className="score-cell">

                        <strong>
                          {row.score}/100
                        </strong>

                        <span>
                          {getScoreLabel(
                            row.score
                          )}
                        </span>

                      </div>

                    </td>

                    <td>

                      <span
                        className={`status-pill ${row.status.toLowerCase()}`}
                      >
                        {row.status}
                      </span>

                    </td>

                    <td>

                      <button
                        className="evidence-button"
                        onClick={() =>
                          setSelectedCandidate(
                            row
                          )
                        }
                      >
                        View Evidence
                      </button>

                    </td>

                  </tr>

                ))

              ) : (

                <tr>

                  <td
                    colSpan="6"
                    className="empty-table"
                  >
                    No candidates match the
                    selected filters.
                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

      </section>

      {selectedCandidate && (

        <div
          className="drawer-overlay"
          onClick={() =>
            setSelectedCandidate(null)
          }
        >

          <aside
            className="evidence-drawer"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <div className="drawer-header">

              <div>

                <h2>
                  Evidence Explorer
                </h2>

                <p>
                  {selectedCandidate.candidate}
                </p>

              </div>

              <button
                className="drawer-close"
                onClick={() =>
                  setSelectedCandidate(null)
                }
              >
                ×
              </button>

            </div>

            <div className="drawer-content">

              <div className="evidence-score">

                <span>
                  {selectedCandidate.skill}
                </span>

                <strong>
                  {selectedCandidate.score}/100
                </strong>

                <p>
                  {getScoreLabel(
                    selectedCandidate.score
                  )}
                </p>

              </div>

              <div className="evidence-item">

                <span>
                  Repositories analyzed
                </span>

                <strong>
                  {selectedCandidate.repositories}
                </strong>

              </div>

              <div className="evidence-item">

                <span>
                  Commits analyzed
                </span>

                <strong>
                  {selectedCandidate.commits}
                </strong>

              </div>

              <div className="evidence-note">

                Demo frontend evidence.
                Your team's backend can
                replace this data later.

              </div>

            </div>

          </aside>

        </div>

      )}

    </div>
  )
}

export default Reports