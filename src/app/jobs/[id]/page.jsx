
import dbConnect, { collectionNameObj } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import { notFound } from "next/navigation";

// export const dynamic = "force-dynamic"; // optional but useful for dynamic routes

export default async function JobDetailsPage({ params }) {
  const { id } = params;

  const jobCollection = dbConnect(collectionNameObj.jobCollection);
  const job = await jobCollection.findOne({ _id: new ObjectId(id) });

  if (!job) return notFound();

  return (
    <div className="bg-color max-w-4xl mx-auto p-6 rounded-2xl shadow my-6">
      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <h1 className="text-2xl font-bold mb-2">
        {job.jobTitle}
      </h1>
      <p><strong>Company:</strong> {job.company}</p>
        <p><strong>Location:</strong> {job.location}</p>
        <p><strong>Job Type:</strong> {job.jobType}</p>
        <p><strong>Category:</strong> {job.category}</p>
        <p><strong>Salary:</strong> {job.salaryRange}</p>
        <p><strong>Experience:</strong> {job.experience}</p>
        <p><strong>Deadline:</strong> {job.deadline}</p>
        <p><strong>Email:</strong> {job.email}</p>
        <p><strong>Company Website:</strong> <a className="text-blue-600 underline" href={job.website} target="_blank">{job.website}</a></p>
      

      <div className="mb-4">
        <h2 className="text-lg font-semibold">Job Description</h2>
        <p>{job.description}</p>
      </div>

      <div className="mb-4">
        <h2 className="text-lg font-semibold">Responsibilities</h2>
        <ul className="list-disc list-inside">
          {job.responsibilities?.split("\n").map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="mb-4">
        <h2 className="text-lg font-semibold">Requirements</h2>
        <ul className="list-disc list-inside">
          {job.requirements?.split("\n").map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </div>

      {job.perks && (
        <div className="mb-4">
          <h2 className="text-lg font-semibold">Perks</h2>
          <ul className="list-disc list-inside">
            {job.perks?.split("\n").map((perk, idx) => (
              <li key={idx}>{perk}</li>
            ))}
          </ul>
        </div>
      )}
</div>
      <div className="text-right">
        <a
          href={job.applyLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          Apply Now
        </a>
      </div>
    </div>
  );
}
