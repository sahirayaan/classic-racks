"use client";

import React, { useState } from "react";

export default function Contact() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !message) {
      alert("Please fill in Name, Phone, and Requirements.");
      return;
    }

    // Format for email body
    let text = `Hello Classic Racks Sales,\n\nI am contacting you from the website with the following request:\n\n`;
    text += `Subject: ${subject || "General Inquiry"}\n`;
    text += `Message: ${message}\n\n`;
    text += `--- Contact Details ---\n`;
    text += `Name: ${name}\n`;
    text += `Phone: ${phone}\n`;
    text += `Email: ${email || "Not Provided"}\n`;

    const mailtoUrl = `mailto:info@displayrack.co.in?subject=Contact Inquiry: ${encodeURIComponent(
      subject || "Quote Request"
    )}&body=${encodeURIComponent(text)}`;
    
    window.location.href = mailtoUrl;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setName("");
      setPhone("");
      setEmail("");
      setSubject("");
      setMessage("");
    }, 4000);
  };

  return (
    <div className="contact-container animate-fade">
      {/* Page Header */}
      <section className="contact-hero">
        <div className="container">
          <span className="badge">Get in Touch</span>
          <h2>Contact Classic Racks</h2>
          <p>
            Have requirements for custom display racks or warehouse storage? Send us an inquiry 
            or visit our manufacturing facility in New Delhi.
          </p>
        </div>
      </section>

      <section className="section container contact-body-layout">
        {/* Contact Form */}
        <div className="contact-form-card">
          {submitted ? (
            <div className="contact-success">
              <span className="success-icon">✓</span>
              <h3>Message Formatted!</h3>
              <p>
                Opening your email client to send the requirements to our sales desk. 
                We will get back to you shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <h3>Send Inquiry Email</h3>
              <p style={{ color: "var(--fg-muted)", fontSize: "0.9rem", marginBottom: "1.5rem" }}>
                Fill out the details below. Submitting will draft a structured email to our sales desk.
              </p>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Your Name *</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Phone / WhatsApp *</label>
                  <input
                    type="tel"
                    className="form-control"
                    placeholder="Enter phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Email Address</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Subject</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. Supermarket Rack Quote"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Detailed Requirements *</label>
                <textarea
                  className="form-control"
                  rows={5}
                  placeholder="Describe dimensions, quantity, load capacity or custom sizes needed..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: "100%" }}>
                Compose Inquiry Email
              </button>
            </form>
          )}
        </div>

        {/* Contact Info Sidebar */}
        <div className="contact-info-sidebar">
          {/* Office Details */}
          <div className="info-card">
            <h4>Factory & Office</h4>
            <div className="info-item">
              <span className="info-icon">📍</span>
              <p>
                <strong>Classic Racks</strong>
                <br />
                G/F, Plot No-16, Bindapur Village,
                <br />
                Uttam Nagar, New Delhi - 110059, Delhi, India
              </p>
            </div>
            <div className="info-item">
              <span className="info-icon">📞</span>
              <a href="tel:+919871718151">+91 9871718151</a>
            </div>
            <div className="info-item">
              <span className="info-icon">💬</span>
              <a href="https://wa.me/919971464447" target="_blank" rel="noopener noreferrer">+91 9971464447 (WhatsApp)</a>
            </div>
            <div className="info-item">
              <span className="info-icon">✉️</span>
              <a href="mailto:info@displayrack.co.in">info@displayrack.co.in</a>
            </div>
            <div className="info-item">
              <span className="info-icon">📋</span>
              <p>GSTIN: 07ACDPH0124M1ZX</p>
            </div>
          </div>

          {/* Interactive Map directions Card */}
          <div className="map-directions-card">
            <h4>Location Map</h4>
            <p>Our manufacturing unit is located in Uttam Nagar, West Delhi.</p>
            <a
              href="https://maps.google.com?q=28.61265000,77.06780000"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline"
              style={{ width: "100%", marginTop: "1rem" }}
            >
              🗺️ Open in Google Maps
            </a>
          </div>
        </div>
      </section>

      <style jsx>{`
        .contact-hero {
          background-color: var(--bg-card);
          border-bottom: 1px solid var(--border);
          padding: 4rem 0;
          text-align: center;
        }

        .contact-hero h2 {
          font-size: 2.5rem;
          margin: 0.75rem 0;
          color: var(--fg-main);
        }

        .contact-hero p {
          max-width: 600px;
          margin: 0 auto;
          color: var(--fg-muted);
          line-height: 1.6;
        }

        .contact-body-layout {
          display: grid;
          grid-template-columns: 1.5fr 1fr;
          gap: 3rem;
          padding-bottom: 6rem;
        }

        @media (max-width: 900px) {
          .contact-body-layout {
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }
        }

        .contact-form-card {
          background-color: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 1rem;
          padding: 2.5rem;
          box-shadow: var(--shadow-sm);
        }

        .contact-form-card h3 {
          font-size: 1.5rem;
          margin-bottom: 0.5rem;
          color: var(--fg-main);
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
        }

        @media (max-width: 640px) {
          .form-row {
            grid-template-columns: 1fr;
            gap: 0;
          }
        }

        .contact-success {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 3rem 1.5rem;
        }

        .success-icon {
          font-size: 3.5rem;
          color: #25D366;
          margin-bottom: 1.5rem;
        }

        .contact-success h3 {
          font-size: 1.5rem;
          color: var(--fg-main);
          margin-bottom: 0.5rem;
        }

        .contact-info-sidebar {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .info-card, .map-directions-card {
          background-color: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 1rem;
          padding: 2rem;
        }

        .info-card h4, .map-directions-card h4 {
          font-size: 1.15rem;
          margin-bottom: 1.5rem;
          color: var(--fg-main);
          border-bottom: 1px solid var(--border);
          padding-bottom: 0.5rem;
        }

        .info-item {
          display: flex;
          gap: 1rem;
          margin-bottom: 1.25rem;
          font-size: 0.95rem;
          line-height: 1.5;
          color: var(--fg-muted);
        }

        .info-item:last-child {
          margin-bottom: 0;
        }

        .info-icon {
          font-size: 1.2rem;
          flex-shrink: 0;
        }

        .info-item a:hover {
          color: var(--primary);
        }

        .map-directions-card p {
          font-size: 0.9rem;
          color: var(--fg-muted);
          line-height: 1.5;
        }
      `}</style>
    </div>
  );
}
