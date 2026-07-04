import JobBoardClient from "../components/JobBoardClient";
import { jobs } from "../lib/jobs";

function HomePage() {
  return <JobBoardClient jobs={jobs} />;
}

export default HomePage;