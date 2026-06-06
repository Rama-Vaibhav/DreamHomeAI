import { Hero } from "@/components/landing/Hero";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { FeaturedHomes } from "@/components/landing/FeaturedHomes";
import { SocialProof } from "@/components/landing/SocialProof";
import { WhyDreamHome } from "@/components/landing/WhyDreamHome";
import { Footer } from "@/components/landing/Footer";

export default function Home() {
  return (
    <main className="bg-[#0B1020]">
      <Hero />
      <HowItWorks />
      <FeaturedHomes />
      <WhyDreamHome />
      <SocialProof />
      <Footer />
    </main>
  );
}
