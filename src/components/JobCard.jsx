import Link from "next/link";
import SaveJobButton from "./SaveJobButton";

function JobCard({ job }) {
  return (
    <article className="job-card">
      <div className="job-card-top">
        <div>
          <p className="company">{job.company}</p>
          <h3>{job.title}</h3>
        </div>

        <span className="job-type">{job.type}</span>
      </div>

      <div className="job-meta">
        <span>📍 {job.location}</span>
        <span>🎯 {job.level}</span>
        <span>💰 {job.salary}</span>
        <span>🕒 {job.postedDays} day(s) ago</span>
      </div>

      <div className="skill-list">
        {job.skills.slice(0, 4).map((skill) => (
          <span key={skill}>{skill}</span>
        ))}
      </div>

      <p className="job-description">{job.description}</p>

      <div className="card-actions">
        <Link href={`/jobs/${job.id}`} className="details-link">
          View Details
        </Link>

        <SaveJobButton job={job} />
      </div>
    </article>
  );
}

export default JobCard;