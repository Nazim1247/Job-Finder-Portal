import CategoryFilter from "@/components/CategoryFilter";
import HeroSection from "@/components/HeroSection";
import LatestJobs from "@/components/LatestJobs";

export default function Home() {
  return (
    <div className="min-h-80">
      <HeroSection />
      <CategoryFilter />
      <LatestJobs />
    </div>
  );
}
