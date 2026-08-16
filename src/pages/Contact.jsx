import { useState } from "react"

function Contact() {

  const [sent, setSent] = useState(false)


  const handleSubmit = (e) => {

    e.preventDefault()

    setSent(true)

  }


  return (
    <div className="page">

      <div className="page-header">

        <div>

          <h1>
            Contact Us
          </h1>

          <p>
            Have a question? Our team is here to help.
          </p>

        </div>

      </div>


      <div className="contact-grid">


        <div className="contact-info">

          <div className="card">

            <h2>
              Let's talk
            </h2>

            <p>
              Whether you need help with VeriWork AI or want to
              learn more about our platform, send us a message.
            </p>


            <div className="contact-item">

              <strong>
                Email
              </strong>

              <span>
                support@veriwork.ai
              </span>

            </div>


            <div className="contact-item">

              <strong>
                Phone
              </strong>

              <span>
                +91 98765 43210
              </span>

            </div>


            <div className="contact-item">

              <strong>
                Office
              </strong>

              <span>
                Vadodara, Gujarat, India
              </span>

            </div>

          </div>

        </div>



        <div className="card">

          {sent ? (

            <div className="success-message">

              <div className="success-icon">
                ✓
              </div>

              <h2>
                Message Sent!
              </h2>

              <p>
                Thanks for contacting us. Our team will get back
                to you soon.
              </p>


              <button
                className="primary-button"
                onClick={() => setSent(false)}
              >
                Send Another Message
              </button>

            </div>

          ) : (

            <form onSubmit={handleSubmit}>

              <h2>
                Send us a message
              </h2>


              <label>
                Name
              </label>

              <input
                required
                placeholder="Your name"
              />


              <label>
                Email
              </label>

              <input
                required
                type="email"
                placeholder="you@example.com"
              />


              <label>
                Subject
              </label>

              <input
                required
                placeholder="How can we help?"
              />


              <label>
                Message
              </label>

              <textarea
                required
                placeholder="Tell us how we can help..."
                rows="6"
              />


              <button
                className="primary-button"
                type="submit"
              >
                Send Message
              </button>

            </form>

          )}

        </div>

      </div>

    </div>
  )
}


export default Contact