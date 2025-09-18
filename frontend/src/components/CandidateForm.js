import React, { useState, useEffect } from "react";

export default function CandidateForm({ onSave, initial = null, onCancel }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone_number: "",
    current_status: "Applied",
    resume_link: "",
  });

  useEffect(() => {
    if (initial) setForm(initial);
  }, [initial]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  function submit(e) {
    e.preventDefault();
    onSave(form);
    // keep form filled for edits; caller decides to clear or not
  }

  return (
    <form className="form" onSubmit={submit}>
      <h3>{initial ? "Edit Candidate" : "Add Candidate"}</h3>
      <input className="input" name="name" value={form.name} onChange={handleChange} placeholder="Full name" required />
      <input className="input" name="email" type="email" value={form.email} onChange={handleChange} placeholder="Email" required />
      <input className="input" name="phone_number" value={form.phone_number} onChange={handleChange} placeholder="Phone number" />
      <input className="input" name="current_status" value={form.current_status} onChange={handleChange} placeholder="Status" />
      <input className="input" name="resume_link" value={form.resume_link} onChange={handleChange} placeholder="Resume URL" />
      <div>
        <button className="button" type="submit">{initial ? "Update" : "Create"}</button>
        {onCancel && <button type="button" className="button" onClick={onCancel}>Cancel</button>}
      </div>
    </form>
  );
}
