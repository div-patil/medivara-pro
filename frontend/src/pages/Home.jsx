import FeaturesGrid from "@/components/FeaturesGrid";
import HeroSection from "../components/HeroSection";
import ParallaxWrapper from "../components/ParallaxWrapper";
import DoctorList from "./DoctorList";
import SearchSection from "./SearchSection";
import HowItWorksSection from "./HowItWorksSection";
import DoctorForm from "../components/Doctor/DoctorForm";
export default function Home() {
  return (
    <>
      <>
        <HeroSection />
      </>
      <FeaturesGrid title={"Our"} subtitle={"Services"} />
      {/* <DoctorForm /> */}
        {/* <DoctorList /> */}
        <HowItWorksSection />
        <SearchSection />
    </>
  );
}
