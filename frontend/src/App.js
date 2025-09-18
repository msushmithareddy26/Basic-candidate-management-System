import React, { useState, useEffect } from "react";
import { fetchCandidates, createCandidate, updateCandidate, deleteCandidate } from "./api";

function App() {
  const [candidates, setCandidates] = useState([]);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", phone_number: "", current_status: "", resume_link: "" });

  // Load candidates
  async function load() {
    const res = await fetchCandidates();
    setCandidates(res.data);
  }

  useEffect(() => { load(); }, []);

  function openModal(candidate = null) {
    setEditing(candidate);
    setForm(candidate || { name: "", email: "", phone_number: "", current_status: "", resume_link: "" });
    setModalOpen(true);
  }

  async function saveCandidate() {
    if (editing) {
      await updateCandidate(editing.id, form);
    } else {
      await createCandidate(form);
    }
    setModalOpen(false);
    load();
  }

  async function removeCandidate(id) {
    if (window.confirm("Are you sure?")) {
      await deleteCandidate(id);
      load();
    }
  }

  const filtered = candidates.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container">
      <header>
        <h1>Candidate Management</h1>
        <div className="actions">
          <input
            type="text"
            className="search-box"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="button" onClick={() => openModal()}>+ Add Candidate</button>
        </div>
      </header>

      <table className="table">
        <thead>
          <tr>
            <th>#</th><th>Name</th><th>Email</th><th>Phone</th><th>Status</th><th>Resume</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((c, i) => (
            <tr key={c.id}>
              <td>{i+1}</td>
              <td>{c.name}</td>
              <td>{c.email}</td>
              <td>{c.phone_number}</td>
              <td>{c.current_status}</td>
              <td>{c.resume_link ? <a href={c.resume_link} target="_blank" rel="noreferrer">View</a> : "-"}</td>
              <td>
                <button className="button secondary" onClick={() => openModal(c)}>Edit</button>
                <button className="button danger" onClick={() => removeCandidate(c.id)}>Delete</button>
              </td>
            </tr>
          ))}
          {filtered.length === 0 && (
            <tr><td colSpan="7" style={{ textAlign: "center" }}>No candidates found</td></tr>
          )}
        </tbody>
      </table>

      {modalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h3>{editing ? "Edit Candidate" : "Add Candidate"}</h3>
            <input placeholder="Name" value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} />
            <input type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} />
            <input placeholder="Phone" value={form.phone_number} onChange={(e) => setForm({...form, phone_number: e.target.value})} />
            <input placeholder="Status" value={form.current_status} onChange={(e) => setForm({...form, current_status: e.target.value})} />
            <input placeholder="Resume URL" value={form.resume_link} onChange={(e) => setForm({...form, resume_link: e.target.value})} />

            <div className="form-actions">
              <button className="button secondary" onClick={() => setModalOpen(false)}>Cancel</button>
              <button className="button" onClick={saveCandidate}>{editing ? "Update" : "Create"}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
