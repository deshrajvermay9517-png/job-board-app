"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const STORAGE_KEY = "jobboard-saved-jobs";

function SavedJobs() {
  const [savedJobs, setSavedJobs] = useState([]);

  function loadSavedJobs() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      setSavedJobs(data ? JSON.parse(data) : []);
    } catch {
      setSavedJobs([]);
    }
  }

  useEffect(() => {
    loadSavedJobs();

    window.addEventListener("savedJobsUpdated", loadSavedJobs);
    window.addEventListener("storage", loadSavedJobs);

    return () => {
      window.removeEventListener("savedJobsUpdated", loadSavedJobs);
      window.removeEventListener("storage", loadSavedJobs);
    };
  }, []);

  function removeSavedJob(jobId) {
    const updatedJobs = savedJobs.filter((job) => job.id !== jobId);
    setSavedJobs(updatedJobs);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedJobs));
    window.dispatchEvent(new Event("savedJobsUpdated"));
  }

  return (
    <section className="saved-section">
      <div className="section-heading">
        <h2>Saved Jobs</h2>
        <p>Jobs saved in your browser</p>
      </div>

      {savedJobs.length === 0 ? (
        <p className="empty-message">No saved jobs yet.</p>
      ) : (
        <div className="saved-list">
          {savedJobs.map((job) => (
            <div className="saved-item" key={job.id}>
              <div>
                <h4>{job.title}</h4>
                <p>
                  {job.company} • {job.location}
                </p>
              </div>

              <div className="saved-actions">
                <Link href={`/jobs/${job.id}`} className="details-link">
                  Details
                </Link>

                <button
                  className="danger-btn"
                  onClick={() => removeSavedJob(job.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default SavedJobs;