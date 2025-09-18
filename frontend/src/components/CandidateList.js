import React, { useEffect, useState } from "react";
import { fetchCandidates, createCandidate, updateCandidate, deleteCandidate } from "../api";
import CandidateForm from "./CandidateForm";

export default function CandidateList() {
  const [candidates, setCandidates] = useState([]);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);

  async function load() {
    try {
      const res = await fetchCandidates();
      setCandidates(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch candidates");
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function handleCreate(data) {
    try {
      await createCandidate(data);
      setShowForm(false);
      load();
    } catch (err) {
      console.error(err);
      alert("Create failed: " + JSON.stringify(err.response?.data || err.message));
    }
  }

  async function handleUpdate(data) {
    try {
      await updateCandidate(editing.id, data);
      setEditing(null);
      setShowForm(false);
      load();
    } catch (err) {
      console.error(err);
      alert("Update failed");
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Delete candidate?")) return;
    try {
      await deleteCandidate(id);
      load();
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  }

  return (
    <div>
      <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
        <h2>Candidates</h2>
        <button className="button" onClick={() => { setEditing(null); setShowForm(true); }}>Add Candidate</button>
      </div>

      {showForm && (
        <CandidateForm
          initial={editing || null}
          onSave={editing ? handleUpdate : handleCreate}
          onCancel={() => { setEditing(null); setShowForm(false); }}
        />
      )}

      <table className="table">
        <thead>
          <tr>
            <th>#</th><th>Name</th><th>Email</th><th>Phone</th><th>Status</th><th>Resume</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {candidates.map((c, idx) => (
            <tr key={c.id}>
              <td>{idx+1}</td>
              <td>{c.name}</td>
              <td>{c.email}</td>
              <td>{c.phone_number}</td>
              <td>{c.current_status}</td>
              <td>{c.resume_link ? <a href={c.resume_link} target="_blank" rel="noreferrer">Resume</a> : "-"}</td>
              <td>
                <button className="button" onClick={() => { setEditing(c); setShowForm(true); }}>Edit</button>
                <button className="button" onClick={() => handleDelete(c.id)}>Delete</button>
              </td>
            </tr>
          ))}
          {candidates.length === 0 && (
            <tr><td colSpan={7}>No candidates found</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
