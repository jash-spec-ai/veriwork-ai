import { useState } from "react"

function ResumeVerification() {
  const [file, setFile] = useState(null)
  const [verified, setVerified] = useState(false)
  const [dragging, setDragging] = useState(false)

  const handleFile = (selectedFile) => {
    if (!selectedFile) return

    const fileName = selectedFile.name.toLowerCase()

    const validFile =
      fileName.endsWith(".pdf") ||
      fileName.endsWith(".doc") ||
      fileName.endsWith(".docx")

    if (!validFile) {
      alert("Please upload a PDF, DOC, or DOCX resume.")
      return
    }

    if (selectedFile.size > 10 * 1024 * 1024) {
      alert("File size must be less than 10MB.")
      return
    }

    setFile(selectedFile)
    setVerified(false)

    setTimeout(() => {
      setVerified(true)
    }, 1500)
  }

  const handleDrop = (event) => {
    event.preventDefault()
    setDragging(false)

    const droppedFile = event.dataTransfer.files[0]

    handleFile(droppedFile)
  }

  const removeFile = () => {
    setFile(null)
    setVerified(false)
  }

  return (
    <div className="page">

      <div className="page-header">
        <div>
          <h1>Resume Verification</h1>

          <p>
            Upload a candidate resume to verify and extract
            professional information.
          </p>
        </div>
      </div>

      {!file && (
        <div
          className={`resume-upload-card ${
            dragging ? "dragging" : ""
          }`}
          onDragOver={(event) => {
            event.preventDefault()
            setDragging(true)
          }}
          onDragLeave={() => {
            setDragging(false)
          }}
          onDrop={handleDrop}
        >

          <div className="upload-icon">
            📄
          </div>

          <h2>
            Upload Candidate Resume
          </h2>

          <p>
            Drag and drop a resume here, or choose a file
            from your computer.
          </p>

          <label className="upload-button">

            Choose Resume

            <input
              type="file"
              accept=".pdf,.doc,.docx"
              hidden
              onChange={(event) => {
                handleFile(event.target.files[0])
              }}
            />

          </label>

          <span className="upload-hint">
            PDF or DOCX • Maximum 10MB
          </span>

        </div>
      )}

      {file && (
        <div className="resume-result">

          <div className="card resume-file-card">

            <div className="resume-file-left">

              <div className="resume-file-icon">
                📄
              </div>

              <div>

                <h3>
                  {file.name}
                </h3>

                <p>
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>

              </div>

            </div>

            <button
              className="remove-file"
              onClick={removeFile}
            >
              Remove
            </button>

          </div>

          <div className="card verification-card">

            <div className="verification-header">

              <div>

                <h2>
                  Verification Status
                </h2>

                <p>
                  Resume processing and evidence verification
                </p>

              </div>

              {verified ? (
                <div className="verification-badge verified-badge">
                  ✓ Verified
                </div>
              ) : (
                <div className="verification-badge processing-badge">
                  Processing...
                </div>
              )}

            </div>

            {!verified && (
              <div className="verification-processing">

                <div className="processing-spinner"></div>

                <p>
                  Analyzing resume...
                </p>

              </div>
            )}

            {verified && (
              <div>

                <div className="verification-success">

                  <div className="success-check">
                    ✓
                  </div>

                  <div>

                    <strong>
                      Resume successfully verified
                    </strong>

                    <p>
                      The resume has passed the initial
                      verification check.
                    </p>

                  </div>

                </div>

                <h3 className="extracted-title">
                  Extracted Information
                </h3>

                <div className="resume-data-grid">

                  <div className="resume-data-item">

                    <span>
                      Candidate Name
                    </span>

                    <strong>
                      Rahul Sharma
                    </strong>

                  </div>

                  <div className="resume-data-item">

                    <span>
                      Target Role
                    </span>

                    <strong>
                      Backend Engineer
                    </strong>

                  </div>

                  <div className="resume-data-item">

                    <span>
                      Experience
                    </span>

                    <strong>
                      3+ Years
                    </strong>

                  </div>

                  <div className="resume-data-item">

                    <span>
                      Education
                    </span>

                    <strong>
                      Computer Science
                    </strong>

                  </div>

                </div>

                <div className="skills-section">

                  <h3>
                    Detected Skills
                  </h3>

                  <div className="skill-tags">

                    <span>Python</span>
                    <span>FastAPI</span>
                    <span>SQL</span>
                    <span>REST APIs</span>
                    <span>Git</span>

                  </div>

                </div>

                <div className="verification-note">

                  <strong>
                    ✓ Verification complete
                  </strong>

                  <p>
                    Resume information is ready to be reviewed
                    against candidate evidence.
                  </p>

                </div>

              </div>
            )}

          </div>

        </div>
      )}

    </div>
  )
}

export default ResumeVerification