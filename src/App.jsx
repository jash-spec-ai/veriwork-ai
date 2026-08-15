import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import "./App.css"

import dashboard from "./pages/Dashboard"
import candidates from "./pages/Candidates"
import requisitions from "./pages/Requisitions"
import reports from "./pages/Reports"
import candidateDetail from "./pages/CandidateDetail"

function App() {
  return (
    <BrowserRouter>

      <div className="app">

        <aside className="sidebar">

          <div className="logo">
            VeriWork AI
          </div>

          <nav>

            <Link to="/" className="nav-item">
              Dashboard
            </Link>

            <Link to="/candidates" className="nav-item">
              Candidates
            </Link>

            <Link to="/requisitions" className="nav-item">
              Requisitions
            </Link>

            <Link to="/reports" className="nav-item">
              Reports
            </Link>

          </nav>

        </aside>

        <main className="main">

          <header className="topbar">
            <div>VeriWork AI</div>
            <div>Recruiter</div>
          </header>

          <div className="content">

            <Routes>

              <Route path="/" element={<Dashboard />} />

              <Route
                path="/candidates"
                element={<Candidates />}
              />

              <Route
                path="/requisitions"
                element={<Requisitions />}
              />

              <Route
                path="/reports"
                element={<Reports />}
              />
              <Route
                path="/candidates/rahul"
                element={<CandidateDetail />}
              />

            </Routes>

          </div>
        </main>

      </div>

    </BrowserRouter>
  )
}

export default App