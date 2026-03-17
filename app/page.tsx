import Header from "@/components/site/Header";
import Hero from "@/components/site/Hero";
import Categories from "@/components/site/Categories";
import ProductCarousel from "@/components/site/ProductCarousel";
import Trends from "@/components/site/Trends";
import InfoBar from "@/components/site/InfoBar";
import Footer from "@/components/site/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <Categories />
      <ProductCarousel />
      <Trends />
      <InfoBar />
      <Footer />
    </div>
  );
}
