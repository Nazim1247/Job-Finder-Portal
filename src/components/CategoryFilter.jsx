"use client";

import { useRouter } from "next/navigation";

const categories = [
  { name: "Tech", icon: "💻", slug: "tech" },
  { name: "Marketing", icon: "📢", slug: "marketing" },
  { name: "Logistics", icon: "📦", slug: "logistics" },
  { name: "Education", icon: "🧑‍🏫", slug: "education" },
  { name: "Healthcare", icon: "💊", slug: "healthcare" },
  { name: "Science", icon: "💻", slug: "science" },
];

export default function CategoryFilter() {
  const router = useRouter();

  const handleClick = (slug) => {
    router.push(`/jobs?category=${slug}`);
  };

  return (
    <div className="w-full overflow-x-auto py-4 max-w-6xl mx-auto mt-4">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 w-max mx-auto">
        {categories.map((cat) => (
          <button
            key={cat.slug}
            onClick={() => handleClick(cat.slug)}
            className="flex-shrink-0 px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition whitespace-nowrap lg:animate-bounce animate-pulse"
          >
            {cat.icon} {cat.name}
          </button>
        ))}
      </div>
    </div>
  );
}
