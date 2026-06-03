"use client";

import { useState } from "react";
import { IconMail, IconPhone, IconPin } from "@/components/Icons";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function Contact() {
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const data = {
      name: form.name.value,
      phone: form.phone.value,
      model: form.model.value,
      message: form.message.value,
    };

    setStatus("sending");
    setError("");
    try {
      const res = await fetch(`${API_URL}/api/enquiries`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(result.error || "Something went wrong.");
      form.reset();
      setStatus("sent");
    } catch (err) {
      setError(
        err.message === "Failed to fetch"
          ? "Could not reach the server. Please make sure the backend is running."
          : err.message
      );
      setStatus("error");
    }
  };

  return (
    <section className="section section-contact" id="contact">
      <div className="container contact-inner">
        <div className="contact-copy">
       
          <h2>Request a Quote or Schedule a Test Ride</h2>
          <p>
            Share your details and our team will contact you with the on-road price,
            available offers and a convenient test-ride appointment. You are also
            welcome to visit our showroom.
          </p>
          <ul className="contact-list">
            <li>
              <span className="contact-ic"><IconPin width={20} height={20} /></span>
              <span>Khasra No, 225/2, Gda Market, Arthala, Rajendra Nagar, Vasundhara, Ghaziabad, Uttar Pradesh 201012</span>
            </li>
            <li>
              <span className="contact-ic"><IconPhone width={20} height={20} /></span>
              <a href="tel:+919999279115">+91 99992 79115</a>,
              
              <a href="tel:+919873125802">+91 98731 25802</a>
            </li>
            <li>
              <span className="contact-ic"><IconMail width={20} height={20} /></span>
              <a href="mailto:info@mrelectricmobility.com">
                info@mrelectricmobility.com
              </a>
            </li>
          </ul>
        </div>
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <label>
              Name
              <input type="text" name="name" placeholder="Your full name" required />
            </label>
            <label>
              Phone
              <input type="tel" name="phone" placeholder="10-digit mobile" required />
            </label>
          </div>
          <label>
            Scooter you&apos;re interested in
            <select name="model" defaultValue="">
              <option value="">Not sure yet</option>
              <option>Sokudo Plus</option>
              <option>Sokudo Pace</option>
              <option>Sokudo Rapid 2.2</option>
              <option>Sokudo Select 2.2</option>
              <option>Sokudo Acute 2.2</option>
              <option>Sokudo Acute</option>
            </select>
          </label>
          <label>
            Message
            <textarea name="message" rows={3} placeholder="Anything you'd like to know" />
          </label>
          <button
            type="submit"
            className="btn btn-primary btn-block"
            disabled={status === "sending"}
          >
            {status === "sending" ? "Sending…" : "Send enquiry"}
          </button>
          {status === "sent" && (
            <p className="form-note">Thanks — we&apos;ve got your enquiry and will call you back shortly.</p>
          )}
          {status === "error" && <p className="form-note error">{error}</p>}
        </form>
      </div>
    </section>
  );
}
