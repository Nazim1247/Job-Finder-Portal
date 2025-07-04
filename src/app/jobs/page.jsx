import { Suspense } from "react";
import JobsPage from "./JobsPage";

export default function JobsWrapper() {
  return (
    <Suspense fallback={<div className="text-center p-8 text-xl">Loading jobs...</div>}>
      <JobsPage />
    </Suspense>
  );
}
