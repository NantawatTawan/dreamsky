import HeroSection from '@/components/home/HeroSection';
import WhyChiangMai from '@/components/home/WhyChiangMai';
import Services from '@/components/home/Services';
import Highlights from '@/components/home/Highlights';
import Experience from '@/components/home/Experience';
import Gallery from '@/components/home/Gallery';
import Steps from '@/components/home/Steps';
import Reviews from '@/components/home/Reviews';
import CTASection from '@/components/home/CTASection';
import SectionDivider from '@/components/shared/SectionDivider';
import ScrollReveal from '@/components/shared/ScrollReveal';

const LIGHT = '#F8F9FA';
const WHITE = '#FFFFFF';
const NAVY = '#1B3A5C';
const SKY = '#e6f2fa';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <SectionDivider variant="cloud" color={LIGHT} />
      <WhyChiangMai />
      <SectionDivider variant="wave" color={WHITE} />
      <Services />
      <SectionDivider variant="mist" color={NAVY} />
      <Highlights />
      <SectionDivider variant="wave" color={LIGHT} flip />
      <Experience />
      <SectionDivider variant="wave" color={WHITE} />
      <ScrollReveal>
        <Gallery />
      </ScrollReveal>
      <SectionDivider variant="cloud" color={SKY} />
      <Steps />
      <SectionDivider variant="wave" color={WHITE} />
      <Reviews />
      <SectionDivider variant="mist" color={NAVY} />
      <CTASection />
    </>
  );
}
