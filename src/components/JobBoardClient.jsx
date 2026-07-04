"use client";

import { useMemo, useState } from "react";
import JobCard from "./JobCard";
import SavedJobs from "./SavedJobs";

function JobBoardClient({ jobs }) {
  const [searchText, setSearchText] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedType, setSelectedType] = useState("All");
  const [selectedLevel, setSelectedLevel] = useState("All");
  const [sortBy, setSortBy] = useState("latest");

  const locations = ["All", ...new Set(jobs.map((job) => job.location))];
  const categories = ["All", ...new Set(jobs.map((job) => job.category))];
  const types = ["All", ...new Set(jobs.map((job) => job.type))];
  const levels = ["All", ...new Set(jobs.map((job) => job.level))];

  const filteredJobs = useMemo(() => {
    let result = jobs.filter((job) => {
      const search = searchText.toLowerCase();

      const matchesSearch =
        job.title.toLowerCase().includes(search) ||
        job.company.toLowerCase().includes(search) ||
        job.skills.join(" ").toLowerCase().includes(search);

      const matchesLocation =
        selectedLocation === "All" || job.location === selectedLocation;

      const matchesCategory =
        selectedCategory === "All" || job.category === selectedCategory;

      const matchesType = selectedType === "All" || job.type === selectedType;

      const matchesLevel =
        selectedLevel === "All" || job.level === selectedLevel;

      return (
        matchesSearch &&
        matchesLocation &&
        matchesCategory &&
        matchesType &&
        matchesLevel
      );
    });

    if (sortBy === "salary-high") {
      result = [...result].sort((a, b) => b.minSalary - a.minSalary);
    }

    if (sortBy === "salary-low") {
      result = [...result].sort((a, b) => a.minSalary - b.minSalary);
    }

    if (sortBy === "latest") {
      result = [...result].sort((a, b) => a.postedDays - b.postedDays);
    }

    return result;
  }, [
    jobs,
    searchText,
    selectedLocation,
    selectedCategory,
    selectedType,
    selectedLevel,
    sortBy,
  ]);

  function resetFilters() {
    setSearchText("");
    setSelectedLocation("All");
    setSelectedCategory("All");
    setSelectedType("All");
    setSelectedLevel("All");
    setSortBy("latest");
  }

  return (
    <main>
      <section className="hero">
        <div>
          <p className="badge">Developer Jobs</p>
          <h1>Find internships and entry-level developer jobs</h1>
          <p>
            Search frontend, backend, MERN, and Next.js jobs. Filter by
            location, role, level, and job type.
          </p>
        </div>
      </section>

      <section className="stats-grid">
        <div>
          <strong>{jobs.length}</strong>
          <span>Total Jobs</span>
        </div>

        <div>
          <strong>{locations.length - 1}</strong>
          <span>Locations</span>
        </div>

        <div>
          <strong>{categories.length - 1}</strong>
          <span>Categories</span>
        </div>

        <div>
          <strong>{filteredJobs.length}</strong>
          <span>Matched Jobs</span>
        </div>
      </section>

      <section className="filters-card">
        <input
          type="text"
          placeholder="Search by title, company, or skill..."
          value={searchText}
          onChange={(event) => setSearchText(event.target.value)}
        />

        <select
          value={selectedLocation}
          onChange={(event) => setSelectedLocation(event.target.value)}
        >
          {locations.map((location) => (
            <option value={location} key={location}>
              {location}
            </option>
          ))}
        </select>

        <select
          value={selectedCategory}
          onChange={(event) => setSelectedCategory(event.target.value)}
        >
          {categories.map((category) => (
            <option value={category} key={category}>
              {category}
            </option>
          ))}
        </select>

        <select
          value={selectedType}
          onChange={(event) => setSelectedType(event.target.value)}
        >
          {types.map((type) => (
            <option value={type} key={type}>
              {type}
            </option>
          ))}
        </select>

        <select
          value={selectedLevel}
          onChange={(event) => setSelectedLevel(event.target.value)}
        >
          {levels.map((level) => (
            <option value={level} key={level}>
              {level}
            </option>
          ))}
        </select>

        <select value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
          <option value="latest">Latest Jobs</option>
          <option value="salary-high">Salary: High to Low</option>
          <option value="salary-low">Salary: Low to High</option>
        </select>

        <button onClick={resetFilters} className="secondary-btn">
          Reset Filters
        </button>
      </section>

      <section className="section-heading">
        <h2>Available Jobs</h2>
        <p>
          Showing {filteredJobs.length} out of {jobs.length} jobs
        </p>
      </section>

      {filteredJobs.length === 0 ? (
        <p className="empty-message">No jobs found. Try changing filters.</p>
      ) : (
        <section className="jobs-grid">
          {filteredJobs.map((job) => (
            <JobCard job={job} key={job.id} />
          ))}
        </section>
      )}

      <SavedJobs />
    </main>
  );
}

export default JobBoardClient;