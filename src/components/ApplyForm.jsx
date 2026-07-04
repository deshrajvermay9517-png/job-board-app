"use client";

import { useState } from "react";

function ApplyForm({ jobTitle }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    portfolio: "",
    message: "",
  });

  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setSubmitted(false);

    if (!formData.name.trim()) {
      setError("Please enter your name.");
      return;
    }

    if (!formData.email.includes("@")) {
      setError("Please enter a valid email.");
      return;
    }

    if (formData.message.trim().length < 20) {
      setError("Please write at least 20 characters in your message.");
      return;
    }

    setSubmitted(true);

    setFormData({
      name: "",
      email: "",
      portfolio: "",
      message: "",
    });
  }

  return (
    <section className="apply-card">
      <h2>Apply for this role</h2>
      <p>
        This is a frontend-only form. Later, it can be connected with backend or
        email service.
      </p>

      {error && <p className="error-message">{error}</p>}

      {submitted && (
        <p className="success-message">
          Application submitted successfully for {jobTitle}.
        </p>
      )}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Your name"
          value={formData.name}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Your email"
          value={formData.email}
          onChange={handleChange}
        />

        <input
          type="url"
          name="portfolio"
          placeholder="Portfolio or GitHub link"
          value={formData.portfolio}
          onChange={handleChange}
        />

        <textarea
          name="message"
          placeholder="Why are you interested in this role?"
          value={formData.message}
          onChange={handleChange}
        />

        <button type="submit">Submit Application</button>
      </form>
    </section>
  );
}

export default ApplyForm;