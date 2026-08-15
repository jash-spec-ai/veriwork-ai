const stats = [
  {
    title: "Active Requisitions",
    value: "12",
    description: "Currently hiring",
  },
  {
    title: "Total Candidates",
    value: "148",
    description: "Across all requisitions",
  },
  {
    title: "Verified Candidates",
    value: "96",
    description: "Verification completed",
  },
  {
    title: "Pending Verification",
    value: "24",
    description: "Awaiting candidate action",
  },
]

const requisitions = [
  {
    id: 1,
    title: "Senior Python Developer",
    candidates: 24,
    verified: 18,
    status: "Active",
  },
  {
    id: 2,
    title: "Machine Learning Engineer",
    candidates: 18,
    verified: 12,
    status: "Active",
  },
  {
    id: 3,
    title: "Frontend Engineer",
    candidates: 21,
    verified: 15,
    status: "Active",
  },
]

const recentActivity = [
  {
    id: 1,
    candidate: "Aarav Patel",
    action: "GitHub verification completed",
    time: "10 min ago",
    status: "Verified",
  },
  {
    id: 2,
    candidate: "Riya Shah",
    action: "Consent request sent",
    time: "35 min ago",
    status: "Pending",
  },
  {
    id: 3,
    candidate: "Dev Mehta",
    action: "Candidate added",
    time: "1 hour ago",
    status: "New",
  },
]

function Dashboard() {
  return (
    <div className="dashboard-page">

      <div className="page-heading">
        <div>
          <h1>Dashboard</h1>
          <p>
            Overview of recruitment and candidate verification activity.
          </p>
        </div>
      </div>

      <div className="dashboard-stats">
        {stats.map((stat) => (
          <div className="metric-card" key={stat.title}>
            <p className="metric-label">
              {stat.title}
            </p>

            <h2 className="metric-value">
              {stat.value}
            </h2>

            <p className="metric-description">
              {stat.description}
            </p>
          </div>
        ))}
      </div>

      <section className="dashboard-panel">

        <div className="panel-heading">
          <div>
            <h2>Active Requisitions</h2>
            <p>Open roles currently being screened.</p>
          </div>

          <button className="secondary-button">
            View All
          </button>
        </div>

        <div className="dashboard-list">

          {requisitions.map((job) => (
            <div
              className="dashboard-list-row"
              key={job.id}
            >

              <div className="list-main">
                <strong>{job.title}</strong>

                <span>
                  {job.candidates} candidates
                </span>
              </div>

              <span>
                {job.verified} verified
              </span>

              <span className="status-pill active">
                {job.status}
              </span>

            </div>
          ))}

        </div>

      </section>

      <section className="dashboard-panel">

        <div className="panel-heading">
          <div>
            <h2>Recent Candidate Activity</h2>
            <p>Latest verification and consent updates.</p>
          </div>
        </div>

        <div className="dashboard-list">

          {recentActivity.map((activity) => (
            <div
              className="dashboard-list-row"
              key={activity.id}
            >

              <div className="list-main">
                <strong>
                  {activity.candidate}
                </strong>

                <span>
                  {activity.action}
                </span>
              </div>

              <span>
                {activity.time}
              </span>

              <span
                className={`status-pill ${activity.status.toLowerCase()}`}
              >
                {activity.status}
              </span>

            </div>
          ))}

        </div>

      </section>

    </div>
  )
}

export default Dashboard