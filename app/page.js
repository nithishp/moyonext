import { Divide } from "lucide-react";
import Image from "next/image";
import { ImageTrailHero } from "./_components/ImageHeroTrail";
import { CountUpStats } from "./_components/CounterUpStats";
import { TextParallaxContentExample } from "./_components/TextParallaxContent";
import { StaggerTestimonials } from "./_components/StagerTestimonials";
import Footer from "./_components/Footer";
import VerticalSlideFeatures from "./_components/VerticalSlideFeatures";

export default function Home() {
  return (
    
      <div className="w-full ">
        <ImageTrailHero />
        <CountUpStats />
        <TextParallaxContentExample />
        <VerticalSlideFeatures/>
        <StaggerTestimonials />
        <Footer />
      </div>

  );
}
