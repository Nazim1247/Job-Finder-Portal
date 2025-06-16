import CategoryFilter from "@/components/CategoryFilter";
import ContactForm from "@/components/ContactForm";
import FeaturedJobs from "@/components/FeaturedJobs";
import HeroSection from "@/components/HeroSection";
import LatestJobs from "@/components/LatestJobs";
import NewsletterSignup from "@/components/Newsletter";
import Testimonials from "@/components/Testimonials";

export default function Home() {
  return (
    <div className="min-h-80">
      <HeroSection />
      <CategoryFilter />
      <LatestJobs />
      <FeaturedJobs />
      <Testimonials />
      <ContactForm />
      <NewsletterSignup />
    </div>
  );
}
