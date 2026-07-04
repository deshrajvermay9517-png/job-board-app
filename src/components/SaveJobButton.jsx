"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "jobboard-saved-jobs";

function getSavedJobs() {
  try {
    const savedJobs = localStorage.getItem(STORAGE_KEY);
    return savedJobs ? JSON.parse(savedJobs) : [];
  } catch {
    return [];
  }
}

function SaveJobButton({ job }) {
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const savedJobs = getSavedJobs();
    const exists = savedJobs.some((savedJob) => savedJob.id === job.id);
    setIsSaved(exists);
  }, [job.id]);

  function handleToggleSave() {
    const savedJobs = getSavedJobs();
    const exists = savedJobs.some((savedJob) => savedJob.id === job.id);

    let updatedJobs;

    if (exists) {
      updatedJobs = savedJobs.filter((savedJob) => savedJob.id !== job.id);
      setIsSaved(false);
    } else {
      const jobToSave = {
        id: job.id,
        title: job.title,
        company: job.company,
        location: job.location,
        type: job.type,
        salary: job.salary,
      };

      updatedJobs = [...savedJobs, jobToSave];
      setIsSaved(true);
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedJobs));
    window.dispatchEvent(new Event("savedJobsUpdated"));
  }

  return (
    <button
      className={isSaved ? "saved-btn" : "secondary-btn"}
      onClick={handleToggleSave}
    >
      {isSaved ? "Saved" : "Save Job"}
    </button>
  );
}

export default SaveJobButton;