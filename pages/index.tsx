import { Wrapper } from "../components/Wrapper";
import React from "react";
import {
  GraphicSection1,
  GraphicSection2,
  GraphicSection3,
} from "../components/GraphicSections";
import Partners from "../components/Partners";
import TestimonialsSection from "../components/Testimonials";
import WriteWithUs from "../components/WriteWithUs";
import HeroSection from "../components/HeroSection";
import { useEffect } from "react";
import { logPageView } from '../lib/analytics';

export default function Home() {
  useEffect(() => {
    logPageView();
  }, []);
  
  return (
    <Wrapper>
      <div className="max-w-5xl mx-auto flex flex-col gap-12 sm:gap-16 sm:px-6 py-6 overflow-clip">
        <HeroSection />
        {/* <GraphicSection3 /> */}
        <GraphicSection1 />
        <TestimonialsSection />
        <GraphicSection2 />
        <WriteWithUs />
        <Partners />
      </div>
    </Wrapper>
  );
}
