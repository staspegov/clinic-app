// components/BrandMarquee.tsx
import Image from 'next/image';

type Logo = { src: string; alt: string };

const LOGOS: Logo[] = [
  { src: '/gsk.webp', alt: 'Brand 1' },
  { src: '/AstraZeneca.webp', alt: 'Brand 2' },
  { src: '/convance.webp', alt: 'Brand 3' },
  { src: '/parexel.webp', alt: 'Brand 4' },
  { src: '/ppd.webp', alt: 'Brand 5' },
  { src: '/sanofi.webp', alt: 'Brand 6' },
];

export default function BrandMarquee() {
  const items = [...LOGOS, ...LOGOS]; // duplicado para loop continuo
  return (
    <section className="py-2 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="relative overflow-hidden">
          <div className="flex gap-10 animate-[marquee_20s_linear_infinite] hover:[animation-play-state:paused]">
            {items.map((logo, idx) => (
              <div key={`${logo.src}-${idx}`} className="h-12 md:h-14 flex items-center justify-center shrink-0">
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={160}
                  height={56}
                  className="h-full w-auto object-contain opacity-80"
                  priority
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* keyframes inline (Tailwind arbitrary) */}
      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
