
import CTASection from '@/components/wedigit/CTASection';
import DataDrivenResults from '@/components/wedigit/DataDrivenResults';
import FAQSection from '@/components/wedigit/FAQSection';
import FeaturesSection from '@/components/wedigit/FeaturesSection';
import GradientHeroBanner from '@/components/wedigit/GradientHeroBanner';
import HomeBanner from '@/components/wedigit/HomeBanner';
import HomepageComponents from '@/components/wedigit/HomepageComponents';
import HowItWorksSection from '@/components/wedigit/HowItWorksSection';
import InterviewProcessCTA from '@/components/wedigit/InterviewProcessCTA';
import IntervueHero from '@/components/wedigit/IntervueHero';
import LogoCarousel from '@/components/wedigit/LogoCarousel';
import MinimalModernBanner from '@/components/wedigit/MinimalModernBanner';
import ModernCTABanner from '@/components/wedigit/ModernCTABanner';
import ProductsSection from '@/components/wedigit/ProductsSection';
import SplitScreenBanner from '@/components/wedigit/SplitScreenBanner';
import TestimonialsSection from '@/components/wedigit/TestimonialsSection';

export default function Home() {
  return (
    <main className="min-h-screen">
      <div className="pt-20">
        <HomeBanner />
        <LogoCarousel/>
        <FeaturesSection/>
        <HowItWorksSection/>
        <IntervueHero/>
        <FAQSection/>
        <CTASection/>
        <MinimalModernBanner/>
        <GradientHeroBanner/>
        <SplitScreenBanner/>
        <ModernCTABanner/>
        <HomepageComponents/>
        {/* <TestimonialsSection/> */}
      </div>
      
      {/* You can add more sections below the banner */}
      {/* <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-center text-gray-900">
          Our Features
        </h2>
        {/* Add more content here */}
        {/* <ProductsSection/> */}
        {/* <DataDrivenResults/> */}
        {/* <InterviewProcessCTA/> 
      </div> */}
    </main>
  );
}