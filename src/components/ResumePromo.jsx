import Link from "next/link";

export default function ResumePromo() {
  return (
    <section className="bg-gradient-to-r from-indigo-900 to-purple-900 text-gray-300 py-12 px-6 my-6 max-w-6xl mx-auto rounded-2xl">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">🚀 Build a Professional Resume in Minutes!</h2>
        <p className="text-lg mb-6">
          Use our AI-powered resume builder to stand out and get hired faster.
        </p>
        <Link
          href="/resume-builder"
          className="bg-gray-300 text-indigo-600 font-semibold px-6 py-3 rounded shadow hover:bg-gray-400 transition"
        >
          Create Resume Now
        </Link>
      </div>
    </section>
  );
}
