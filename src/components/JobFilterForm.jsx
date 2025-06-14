"use client";

export default function JobFilterForm({ category, location, setCategory, setLocation }) {
  
  const handleSearch = (e) => {
    e.preventDefault();
    
  };

  return (
    <form onSubmit={handleSearch} className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
      <input
        type="text"
        placeholder="Category (e.g. Developer)"
        className="input input-bordered w-full"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <input
        type="text"
        placeholder="Location (e.g. Dhaka)"
        className="input input-bordered w-full"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <button type="submit" className="btn btn-primary col-span-1 lg:col-span-2 w-full">
        Search Jobs
      </button>
    </form>
  );
}
