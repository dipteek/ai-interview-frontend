
import DataDrivenResults from '@/components/wedigit/DataDrivenResults';
import HomeBanner from '@/components/wedigit/HomeBanner';
import IntervueHero from '@/components/wedigit/IntervueHero';
import ProductsSection from '@/components/wedigit/ProductsSection';

export default function Home() {
  return (
    <main className="min-h-screen">
      <div className="pt-20">
        <HomeBanner />
      </div>
      
      {/* You can add more sections below the banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-center text-gray-900">
          Our Features
        </h2>
        {/* Add more content here */}
        <ProductsSection/>
        <IntervueHero/>
        <DataDrivenResults/>
      </div>
    </main>
  );
}