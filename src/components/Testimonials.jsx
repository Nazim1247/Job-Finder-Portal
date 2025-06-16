"use client";

import { FaUserTie } from "react-icons/fa6";

const Testimonials = () => {

 const testimonials = [
  {
    id: 1,
    name: "Ayesha Rahman",
    image: "/users/ayesha.jpg",
    role: "Frontend Developer at TechCorp",
    message:
      "I got my dream job within a week of applying! This platform made it so easy and fast.",
  },
  {
    id: 2,
    name: "Tanvir Hossain",
    image: "https://images.app.goo.gl/yrAPt91trV6vG8uh7",
    role: "Digital Marketer at Growth Agency",
    message:
      "Thanks to this platform, I’m now working remotely for a global company. Highly recommended!",
  },
  {
    id: 3,
    name: "Sharmin Akter",
    image: "/users/sharmin.jpg",
    role: "Nurse at GreenLife Hospital",
    message:
      "After months of searching, I finally found a job that values my skills and dedication. Thank you!",
  },
  {
    id: 4,
    name: "Mehedi Hasan",
    image: "/users/mehedi.jpg",
    role: "Backend Developer at CodeCraft",
    message:
      "Smooth application process and genuine job postings. This platform is a game-changer for developers.",
  },
  {
    id: 5,
    name: "Sabina Yasmin",
    image: "/users/sabina.jpg",
    role: "School Teacher at Sunrise School",
    message:
      "As a teacher, it’s hard to find trusted job portals. This one helped me land the perfect role.",
  },
  {
    id: 6,
    name: "Rafiq Chowdhury",
    image: "/users/rafiq.jpg",
    role: "Logistics Coordinator at QuickShip Ltd.",
    message:
      "A friend recommended this site — I applied and got hired in 10 days. I’m truly grateful!",
  },
];

  return (
    <section className="bg-gray-100 dark:bg-gray-900 py-10">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-indigo-600 mb-8">
          Success Stories
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 shadow"
            >
              
              <FaUserTie className="w-12 h-12 rounded-full mb-2 mx-auto"/>
              <p className="text-indigo-600 font-semibold text-center text-2xl">{t.name}</p>
              <p className="text-sm text-gray-400 text-center">{t.role}</p>
              <p className="text-gray-500 dark:text-gray-200 mt-2 text-center">“{t.message}”</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
