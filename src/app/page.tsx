import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import Dashboard from '@/components/Dashboard';
import Pricing from '@/components/Pricing';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <Hero />
        <Dashboard />
        <Pricing />
      </main>
      <Footer />
    </div>
  );
}
