import Link from "next/link";
import { notFound } from "next/navigation";
import ApplyForm from "../../../components/ApplyForm";
import SaveJobButton from "../../../components/SaveJobButton";
import { getJobById, jobs } from "../../../lib/jobs";

export function generateStaticParams() {
  return jobs.map((job) => ({
    id: job.id,
  }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const job = getJobById(id);

  if (!job) {
    return {
      title: "Job Not Found",
    };
  }

  return {
    title: `${job.title} at ${job.company}`,
    description: job.description,
  };
}

async function JobDetailsPage({ params }) {
  const { id } = await params;
  const job = getJobById(id);

  if (!job) {
    notFound();
  }

  return (
    <main>
      <section className="details-hero">
        <Link href="/" className="back-link">
          ← Back to jobs
        </Link>

        <div className="details-header">
          <div>
            <p className="company">{job.company}</p>
            <h1>{job.title}</h1>

            <div className="job-meta">
              <span>📍 {job.location}</span>
              <span>💼 {job.type}</span>
              <span>🎯 {job.level}</span>
              <span>💰 {job.salary}</span>
            </div>
          </div>

          <SaveJobButton job={job} />
        </div>
      </section>

      <section className="details-layout">
        <article className="details-content">
          <h2>Job Description</h2>
          <p>{job.description}</p>

          <h2>Responsibilities</h2>
          <ul>
            {job.responsibilities.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <h2>Requirements</h2>
          <ul>
            {job.requirements.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <h2>Required Skills</h2>
          <div className="skill-list">
            {job.skills.map((skill) => (
              <span key={skill}>{skill}</span>
            ))}
          </div>
        </article>

        <ApplyForm jobTitle={job.title} />
      </section>
    </main>
  );
}

export default JobDetailsPage;