import { BrowserRouter, Routes, Route, Link, useLocation, useNavigate } from "react-router-dom"
import { useState } from "react"
import "./App.css"

// ===============================
// RECRUITER PAGES
// ===============================

import Dashboard from "./pages/Dashboard"
import Candidates from "./pages/Candidates"
import CandidateDetail from "./pages/CandidateDetail"
import Requisitions from "./pages/Requisitions"
import RequisitionDetail from "./pages/RequisitionDetail"
import Reports from "./pages/Reports"
import ResumeVerification from "./pages/ResumeVerification"
import Profile from "./pages/Profile"
import Contact from "./pages/Contact"

// ===============================
// CANDIDATE PAGES
// ===============================

import CandidateDashboard from "./pages/CandidateDashboard"
import CandidateProfile from "./pages/CandidateProfile"
import CandidateProjects from "./pages/CandidateProjects"
import CandidateSkills from "./pages/CandidateSkills"
import CandidateVerifiedSkills from "./pages/CandidateVerifiedSkills"
import CandidateProfilesLinks from "./pages/CandidateProfilesLinks"
import CandidateAchievements from "./pages/CandidateAchievements"
import CandidateCertifications from "./pages/CandidateCertifications"
import CandidateResearch from "./pages/CandidateResearch"


// =====================================================
// LOGIN SCREEN
// =====================================================

function LoginScreen({ onLogin }) {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [role, setRole] = useState("recruiter")

  const [mode, setMode] = useState("login")

  const [error, setError] = useState("")


  const handleSubmit = (event) => {

    event.preventDefault()

    if (!email || !password) {
      setError("Please enter your email and password.")
      return
    }

    if (!email.includes("@")) {
      setError("Please enter a valid email address.")
      return
    }

    localStorage.setItem("veriwork_logged_in", "true")
    localStorage.setItem("veriwork_user_email", email)
    localStorage.setItem("veriwork_user_role", role)

    onLogin(email, role)
  }


  const handleDemoLogin = () => {

    const demoEmail =
      role === "recruiter"
        ? "recruiter@veriwork.ai"
        : "candidate@veriwork.ai"

    localStorage.setItem("veriwork_logged_in", "true")
    localStorage.setItem("veriwork_user_email", demoEmail)
    localStorage.setItem("veriwork_user_role", role)

    onLogin(demoEmail, role)
  }


  return (
    <div className="login-page">

      {/* BRANDING */}

      <div className="login-branding">

        <div className="login-brand-name">

          <span>VeriWork</span>

          <span className="login-brand-ai">
            AI
          </span>

        </div>

        <p>
          Evidence-based hiring powered by AI
        </p>

      </div>


      {/* LOGIN CARD */}

      <div className="login-card">

        <div className="login-header">

          <h1>
            {mode === "login"
              ? "Welcome back"
              : "Create your account"}
          </h1>

          <p>
            {mode === "login"
              ? "Sign in to continue to VeriWork AI."
              : "Create your VeriWork AI account."}
          </p>

        </div>


        {/* ROLE SELECTOR */}

        <div className="login-role-section">

          <p className="login-role-title">
            I am signing in as
          </p>

          <div className="login-role-buttons">

            <button
              type="button"
              className={
                role === "recruiter"
                  ? "login-role active"
                  : "login-role"
              }
              onClick={() => {
                setRole("recruiter")
                setError("")
              }}
            >
              <span className="role-icon">
                👔
              </span>

              <span>
                Recruiter
              </span>
            </button>


            <button
              type="button"
              className={
                role === "candidate"
                  ? "login-role active"
                  : "login-role"
              }
              onClick={() => {
                setRole("candidate")
                setError("")
              }}
            >
              <span className="role-icon">
                🎓
              </span>

              <span>
                Candidate
              </span>
            </button>

          </div>

        </div>


        {/* FORM */}

        <form onSubmit={handleSubmit}>

          <label>

            Email address

            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value)
                setError("")
              }}
            />

          </label>


          <label>

            Password

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value)
                setError("")
              }}
            />

          </label>


          {error && (
            <div className="login-error">
              {error}
            </div>
          )}


          <button
            type="submit"
            className="login-submit"
          >
            {mode === "login"
              ? `Sign In as ${
                  role === "recruiter"
                    ? "Recruiter"
                    : "Candidate"
                }`
              : "Create Account"}
          </button>

        </form>


        {/* DEMO LOGIN */}

        <div className="login-divider">
          <span>OR</span>
        </div>


        <button
          className="demo-login"
          onClick={handleDemoLogin}
        >
          Continue with Demo{" "}
          {role === "recruiter"
            ? "Recruiter"
            : "Candidate"}{" "}
          Account
        </button>


        {/* SWITCH LOGIN / SIGNUP */}

        <div className="login-switch">

          {mode === "login" ? (

            <>
              Don't have an account?

              <button
                onClick={() => {
                  setMode("signup")
                  setError("")
                }}
              >
                Sign Up
              </button>
            </>

          ) : (

            <>
              Already have an account?

              <button
                onClick={() => {
                  setMode("login")
                  setError("")
                }}
              >
                Sign In
              </button>
            </>

          )}

        </div>

      </div>


      <div className="login-footer">
        VeriWork AI • Intelligent Candidate Verification
      </div>

    </div>
  )
}


// =====================================================
// SIDEBAR ITEM
// =====================================================

function SidebarLink({ to, children }) {

  const location = useLocation()

  const active =
    location.pathname === to ||
    (
      to !== "/" &&
      location.pathname.startsWith(to)
    )

  return (
    <Link
      to={to}
      className={
        active
          ? "nav-item active"
          : "nav-item"
      }
    >
      {children}
    </Link>
  )
}


// =====================================================
// RECRUITER APPLICATION
// =====================================================

function RecruiterApplication({
  userEmail,
  onLogout
}) {

  const [showUserMenu, setShowUserMenu] =
    useState(false)

  const navigate = useNavigate()


  const displayName =
    userEmail === "recruiter@veriwork.ai"
      ? "Recruiter"
      : userEmail
        ? userEmail.split("@")[0]
        : "Recruiter"


  return (

    <div className="app recruiter-app">


      {/* RECRUITER SIDEBAR */}

      <aside className="sidebar">

        <div className="logo">
          VeriWork AI
        </div>


        <div className="sidebar-section-title">
          RECRUITER
        </div>


        <nav>

          <SidebarLink to="/">
            Dashboard
          </SidebarLink>

          <SidebarLink to="/candidates">
            Candidates
          </SidebarLink>

          <SidebarLink to="/requisitions">
            Requisitions
          </SidebarLink>

          <SidebarLink to="/reports">
            Reports
          </SidebarLink>

          <SidebarLink to="/resume-verification">
            Resume Verification
          </SidebarLink>

          <SidebarLink to="/contact">
            Contact Us
          </SidebarLink>

        </nav>

      </aside>


      {/* MAIN */}

      <main className="main">


        {/* TOPBAR */}

        <header className="topbar">

          <div className="topbar-title">
            VeriWork AI
          </div>


          <div className="user-area">

            <button
              className="user-button"
              onClick={() =>
                setShowUserMenu(!showUserMenu)
              }
            >

              <span className="user-avatar">
                {displayName
                  .charAt(0)
                  .toUpperCase()}
              </span>

              <span>
                {displayName}
              </span>

              <span className="user-role-label">
                Recruiter
              </span>

              <span className="user-arrow">
                ▾
              </span>

            </button>


            {showUserMenu && (

              <div className="user-menu">

                <div className="user-menu-header">

                  <strong>
                    {displayName}
                  </strong>

                  <span>
                    {userEmail}
                  </span>

                  <small>
                    Recruiter Account
                  </small>

                </div>


                <div className="user-menu-divider" />


                <button
                  onClick={() => {
                    setShowUserMenu(false)
                    navigate("/profile")
                  }}
                >
                  My Profile
                </button>


                <button
                  onClick={() => {
                    setShowUserMenu(false)
                    navigate("/contact")
                  }}
                >
                  Contact Us
                </button>


                <button
                  onClick={onLogout}
                  className="logout-button"
                >
                  Log Out
                </button>

              </div>

            )}

          </div>

        </header>


        {/* CONTENT */}

        <div className="content">

          <Routes>

            {/* RECRUITER */}

            <Route
              path="/"
              element={<Dashboard />}
            />

            <Route
              path="/candidates"
              element={<Candidates />}
            />

            <Route
              path="/candidates/:candidateId"
              element={<CandidateDetail />}
            />

            <Route
              path="/requisitions"
              element={<Requisitions />}
            />

            <Route
              path="/requisitions/:requisitionId"
              element={<RequisitionDetail />}
            />

            <Route
              path="/reports"
              element={<Reports />}
            />

            <Route
              path="/resume-verification"
              element={<ResumeVerification />}
            />

            <Route
              path="/profile"
              element={<Profile />}
            />

            <Route
              path="/contact"
              element={<Contact />}
            />

          </Routes>

        </div>

      </main>

    </div>
  )
}


// =====================================================
// CANDIDATE APPLICATION
// =====================================================

function CandidateApplication({
  userEmail,
  onLogout
}) {

  const [showUserMenu, setShowUserMenu] =
    useState(false)

  const navigate = useNavigate()


  const displayName =
    userEmail === "candidate@veriwork.ai"
      ? "Candidate"
      : userEmail
        ? userEmail.split("@")[0]
        : "Candidate"


  return (

    <div className="app candidate-app">


      {/* CANDIDATE SIDEBAR */}

      <aside className="sidebar candidate-sidebar">

        <div className="logo">
          VeriWork AI
        </div>


        <div className="candidate-portal-label">
          CANDIDATE PORTAL
        </div>


        <nav>

          <SidebarLink to="/candidate">
            Dashboard
          </SidebarLink>

          <SidebarLink to="/candidate/profile">
            My Profile
          </SidebarLink>

          <SidebarLink to="/candidate/projects">
            Projects
          </SidebarLink>

          <SidebarLink to="/candidate/skills">
            Skills
          </SidebarLink>

          <SidebarLink to="/candidate/verified-skills">
            Verified Skills
          </SidebarLink>

          <SidebarLink to="/candidate/profiles-links">
            Profiles & Links
          </SidebarLink>

          <SidebarLink to="/candidate/achievements">
            Achievements
          </SidebarLink>

          <SidebarLink to="/candidate/certifications">
            Certifications
          </SidebarLink>

          <SidebarLink to="/candidate/research">
            Research
          </SidebarLink>

        </nav>

      </aside>


      {/* MAIN */}

      <main className="main">


        {/* TOPBAR */}

        <header className="topbar">

          <div className="topbar-title">
            Candidate Portal
          </div>


          <div className="user-area">

            <button
              className="user-button"
              onClick={() =>
                setShowUserMenu(!showUserMenu)
              }
            >

              <span className="user-avatar">
                {displayName
                  .charAt(0)
                  .toUpperCase()}
              </span>

              <span>
                {displayName}
              </span>

              <span className="user-role-label">
                Candidate
              </span>

              <span className="user-arrow">
                ▾
              </span>

            </button>


            {showUserMenu && (

              <div className="user-menu">

                <div className="user-menu-header">

                  <strong>
                    {displayName}
                  </strong>

                  <span>
                    {userEmail}
                  </span>

                  <small>
                    Candidate Account
                  </small>

                </div>


                <div className="user-menu-divider" />


                <button
                  onClick={() => {
                    setShowUserMenu(false)
                    navigate("/candidate/profile")
                  }}
                >
                  My Profile
                </button>


                <button
                  onClick={() => {
                    setShowUserMenu(false)
                    navigate("/candidate/profiles-links")
                  }}
                >
                  Profiles & Links
                </button>


                <button
                  onClick={onLogout}
                  className="logout-button"
                >
                  Log Out
                </button>

              </div>

            )}

          </div>

        </header>


        {/* CANDIDATE CONTENT */}

        <div className="content">

          <Routes>

            <Route
              path="/candidate"
              element={<CandidateDashboard />}
            />

            <Route
              path="/candidate/profile"
              element={<CandidateProfile />}
            />

            <Route
              path="/candidate/projects"
              element={<CandidateProjects />}
            />

            <Route
              path="/candidate/skills"
              element={<CandidateSkills />}
            />

            <Route
              path="/candidate/verified-skills"
              element={<CandidateVerifiedSkills />}
            />

            <Route
              path="/candidate/profiles-links"
              element={<CandidateProfilesLinks />}
            />

            <Route
              path="/candidate/achievements"
              element={<CandidateAchievements />}
            />

            <Route
              path="/candidate/certifications"
              element={<CandidateCertifications />}
            />

            <Route
              path="/candidate/research"
              element={<CandidateResearch />}
            />

          </Routes>

        </div>

      </main>

    </div>
  )
}


// =====================================================
// MAIN APP
// =====================================================

function App() {

  const [loggedIn, setLoggedIn] = useState(
    localStorage.getItem(
      "veriwork_logged_in"
    ) === "true"
  )


  const [userEmail, setUserEmail] = useState(
    localStorage.getItem(
      "veriwork_user_email"
    ) || ""
  )


  const [userRole, setUserRole] = useState(
    localStorage.getItem(
      "veriwork_user_role"
    ) || "recruiter"
  )


  const handleLogin = (
    email,
    role
  ) => {

    setUserEmail(email)

    setUserRole(role)

    setLoggedIn(true)
  }


  const handleLogout = () => {

    localStorage.removeItem(
      "veriwork_logged_in"
    )

    localStorage.removeItem(
      "veriwork_user_email"
    )

    localStorage.removeItem(
      "veriwork_user_role"
    )

    setLoggedIn(false)

    setUserEmail("")

    setUserRole("recruiter")
  }


  if (!loggedIn) {

    return (
      <LoginScreen
        onLogin={handleLogin}
      />
    )
  }


  return (

    <BrowserRouter>

      {userRole === "candidate" ? (

        <CandidateApplication
          userEmail={userEmail}
          onLogout={handleLogout}
        />

      ) : (

        <RecruiterApplication
          userEmail={userEmail}
          onLogout={handleLogout}
        />

      )}

    </BrowserRouter>
  )
}


export default App