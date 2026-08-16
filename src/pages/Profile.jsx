import { useState } from "react"

function Profile() {

  const [profile, setProfile] = useState({
    name: "Jash",
    role: "Recruiter",
    email: "jash@example.com",
    phone: "+91 98765 43210",
    location: "Vadodara, Gujarat",
    bio: "Recruitment professional focused on finding and evaluating the right talent.",
    linkedin: "https://linkedin.com/in/yourprofile",
    github: "https://github.com/yourprofile",
  })


  const [editing, setEditing] = useState(false)


  const updateProfile = (field, value) => {

    setProfile({
      ...profile,
      [field]: value,
    })

  }


  return (
    <div className="page">

      <div className="page-header">

        <div>

          <h1>
            My Profile
          </h1>

          <p>
            Manage your professional information and account details.
          </p>

        </div>


        <button
          className="primary-button"
          onClick={() => setEditing(!editing)}
        >
          {editing ? "Save Changes" : "Edit Profile"}
        </button>

      </div>


      <div className="profile-grid">


        <section className="card profile-main">

          <div className="profile-cover"></div>


          <div className="profile-avatar">
            {profile.name.charAt(0)}
          </div>


          <div className="profile-info">

            {editing ? (

              <input
                className="profile-input name-input"
                value={profile.name}
                onChange={(e) =>
                  updateProfile("name", e.target.value)
                }
              />

            ) : (

              <h2>
                {profile.name}
              </h2>

            )}


            <p className="profile-role">
              {profile.role}
            </p>


            <p className="profile-location">
              📍 {profile.location}
            </p>

          </div>


          <div className="profile-divider"></div>


          <h3>
            About
          </h3>


          {editing ? (

            <textarea
              className="profile-textarea"
              value={profile.bio}
              onChange={(e) =>
                updateProfile("bio", e.target.value)
              }
            />

          ) : (

            <p className="profile-bio">
              {profile.bio}
            </p>

          )}

        </section>



        <section className="card completion-card">

          <div className="card-title">

            <h3>
              Profile Completion
            </h3>

            <span>
              80%
            </span>

          </div>


          <div className="progress-bar">

            <div className="progress-fill"></div>

          </div>


          <p>
            Complete your profile to improve your visibility and
            candidate management experience.
          </p>


          <div className="completion-list">

            <div>
              ✓ Basic information
            </div>

            <div>
              ✓ Contact information
            </div>

            <div>
              ✓ Professional information
            </div>

            <div className="incomplete">
              ◌ Profile photo
            </div>

            <div className="incomplete">
              ◌ Resume
            </div>

          </div>

        </section>



        <section className="card">

          <h3>
            Contact Information
          </h3>


          <div className="detail-list">

            <div>

              <span>
                Email
              </span>

              {editing ? (

                <input
                  className="profile-input"
                  value={profile.email}
                  onChange={(e) =>
                    updateProfile("email", e.target.value)
                  }
                />

              ) : (

                <strong>
                  {profile.email}
                </strong>

              )}

            </div>


            <div>

              <span>
                Phone
              </span>

              <strong>
                {profile.phone}
              </strong>

            </div>


            <div>

              <span>
                Location
              </span>

              <strong>
                {profile.location}
              </strong>

            </div>

          </div>

        </section>



        <section className="card">

          <h3>
            Professional Links
          </h3>


          <div className="social-links">

            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
            >
              <span>
                in
              </span>

              LinkedIn
            </a>


            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
            >
              <span>
                GH
              </span>

              GitHub
            </a>

          </div>

        </section>

      </div>

    </div>
  )
}


export default Profile