import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import "./App.css"

import Dashboard from "./pages/dashboard";
import Candidates from "./pages/candidates";
import Requisitions from "./pages/requisitions";
import Reports from "./pages/reports";
import candidateDetail from "./pages/candidateDetail"

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