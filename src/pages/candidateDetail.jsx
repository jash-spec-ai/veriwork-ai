function candidateDetail() {
  return (
    <div>

      <div className="page-header">
        <h1>Rahul Sharma</h1>
        <p>Backend Engineer Candidate</p>
      </div>

      <div className="detail-grid">

        <div className="detail-card">
          <h3>Overall Score</h3>
          <div className="big-score">82/100</div>
          <p>Strong candidate match</p>
        </div>

        <div className="detail-card">
          <h3>Consent Status</h3>
          <div className="status success">
            Consented & Linked
          </div>
          <p>GitHub account linked</p>
        </div>

      </div>

      <div className="detail-card">
        <h2>Skills</h2>

        <div className="skill-row">
          <strong>Python</strong>
          <span>Verified</span>
        </div>

        <div className="skill-row">
          <strong>FastAPI</strong>
          <span>Verified</span>
        </div>

        <div className="skill-row">
          <strong>SQL</strong>
          <span>Claimed</span>
        </div>

      </div>

    </div>
  )
}

export default candidateDetail