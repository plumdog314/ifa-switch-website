interface PageHeroProps {
  tag?: string;
  title: string;
  description: string;
  illustration: "service" | "pricing" | "blog" | "about" | "faq" | "contact";
}

function ServiceIllustration() {
  return (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <circle cx="100" cy="100" r="80" fill="#e0f2fe" opacity="0.5" />
      <rect x="60" y="50" width="80" height="100" rx="8" fill="white" stroke="#0ea5e9" strokeWidth="2" />
      <line x1="75" y1="75" x2="125" y2="75" stroke="#0ea5e9" strokeWidth="2" strokeLinecap="round" />
      <line x1="75" y1="90" x2="115" y2="90" stroke="#bae6fd" strokeWidth="2" strokeLinecap="round" />
      <line x1="75" y1="105" x2="120" y2="105" stroke="#bae6fd" strokeWidth="2" strokeLinecap="round" />
      <polyline points="75,135 90,120 105,128 125,110" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="125" cy="110" r="3" fill="#10b981" />
      <circle cx="150" cy="45" r="15" fill="#d1fae5" opacity="0.7" />
      <circle cx="45" cy="140" r="10" fill="#e0f2fe" opacity="0.7" />
    </svg>
  );
}

function PricingIllustration() {
  return (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <circle cx="100" cy="100" r="80" fill="#d1fae5" opacity="0.4" />
      <circle cx="100" cy="90" r="45" fill="white" stroke="#10b981" strokeWidth="2" />
      <text x="100" y="85" textAnchor="middle" fill="#10b981" fontSize="16" fontWeight="bold">¥</text>
      <text x="100" y="105" textAnchor="middle" fill="#1e293b" fontSize="11" fontWeight="600">49,800</text>
      <rect x="55" y="145" width="90" height="24" rx="12" fill="#0ea5e9" />
      <text x="100" y="161" textAnchor="middle" fill="white" fontSize="10" fontWeight="500">定額制</text>
      <circle cx="155" cy="50" r="12" fill="#e0f2fe" opacity="0.7" />
      <circle cx="40" cy="70" r="8" fill="#d1fae5" opacity="0.7" />
      <path d="M65 55 L60 50 L70 50 Z" fill="#fcd34d" opacity="0.6" />
      <path d="M140 130 L135 125 L145 125 Z" fill="#fcd34d" opacity="0.6" />
    </svg>
  );
}

function BlogIllustration() {
  return (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <circle cx="100" cy="100" r="80" fill="#e0f2fe" opacity="0.4" />
      <rect x="40" y="55" width="70" height="90" rx="6" fill="white" stroke="#0ea5e9" strokeWidth="2" />
      <line x1="52" y1="75" x2="98" y2="75" stroke="#bae6fd" strokeWidth="2" strokeLinecap="round" />
      <line x1="52" y1="88" x2="90" y2="88" stroke="#bae6fd" strokeWidth="2" strokeLinecap="round" />
      <line x1="52" y1="101" x2="95" y2="101" stroke="#e2e8f0" strokeWidth="2" strokeLinecap="round" />
      <line x1="52" y1="114" x2="85" y2="114" stroke="#e2e8f0" strokeWidth="2" strokeLinecap="round" />
      <rect x="90" y="70" width="70" height="90" rx="6" fill="white" stroke="#10b981" strokeWidth="2" />
      <line x1="102" y1="90" x2="148" y2="90" stroke="#d1fae5" strokeWidth="2" strokeLinecap="round" />
      <line x1="102" y1="103" x2="140" y2="103" stroke="#d1fae5" strokeWidth="2" strokeLinecap="round" />
      <line x1="102" y1="116" x2="145" y2="116" stroke="#e2e8f0" strokeWidth="2" strokeLinecap="round" />
      <line x1="102" y1="129" x2="135" y2="129" stroke="#e2e8f0" strokeWidth="2" strokeLinecap="round" />
      <circle cx="160" cy="50" r="10" fill="#d1fae5" opacity="0.7" />
      <circle cx="35" cy="160" r="8" fill="#e0f2fe" opacity="0.7" />
    </svg>
  );
}

function AboutIllustration() {
  return (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <circle cx="100" cy="100" r="80" fill="#e0f2fe" opacity="0.4" />
      <rect x="55" y="80" width="90" height="65" rx="6" fill="white" stroke="#0ea5e9" strokeWidth="2" />
      <rect x="65" y="70" width="70" height="8" rx="4" fill="#0ea5e9" />
      <circle cx="100" cy="50" r="18" fill="white" stroke="#10b981" strokeWidth="2" />
      <path d="M100 42 L100 58" stroke="#10b981" strokeWidth="2" strokeLinecap="round" />
      <path d="M92 50 L108 50" stroke="#10b981" strokeWidth="2" strokeLinecap="round" />
      <circle cx="80" cy="105" r="3" fill="#0ea5e9" opacity="0.5" />
      <circle cx="100" cy="105" r="3" fill="#10b981" opacity="0.5" />
      <circle cx="120" cy="105" r="3" fill="#0ea5e9" opacity="0.5" />
      <line x1="70" y1="120" x2="130" y2="120" stroke="#e2e8f0" strokeWidth="1.5" />
      <line x1="75" y1="130" x2="125" y2="130" stroke="#e2e8f0" strokeWidth="1.5" />
      <circle cx="155" cy="55" r="12" fill="#d1fae5" opacity="0.6" />
      <circle cx="40" cy="130" r="8" fill="#e0f2fe" opacity="0.6" />
    </svg>
  );
}

function FaqIllustration() {
  return (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <circle cx="100" cy="100" r="80" fill="#d1fae5" opacity="0.4" />
      <rect x="45" y="50" width="80" height="55" rx="10" fill="white" stroke="#0ea5e9" strokeWidth="2" />
      <text x="85" y="85" textAnchor="middle" fill="#0ea5e9" fontSize="28" fontWeight="bold">?</text>
      <polygon points="55,105 70,105 60,120" fill="white" stroke="#0ea5e9" strokeWidth="2" strokeLinejoin="round" />
      <rect x="75" y="115" width="80" height="45" rx="10" fill="white" stroke="#10b981" strokeWidth="2" />
      <text x="115" y="143" textAnchor="middle" fill="#10b981" fontSize="22" fontWeight="bold">!</text>
      <polygon points="145,160 130,160 140,175" fill="white" stroke="#10b981" strokeWidth="2" strokeLinejoin="round" />
      <circle cx="160" cy="45" r="10" fill="#e0f2fe" opacity="0.7" />
      <circle cx="35" cy="145" r="8" fill="#d1fae5" opacity="0.7" />
    </svg>
  );
}

function ContactIllustration() {
  return (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <circle cx="100" cy="100" r="80" fill="#e0f2fe" opacity="0.4" />
      <rect x="45" y="65" width="110" height="75" rx="8" fill="white" stroke="#0ea5e9" strokeWidth="2" />
      <polyline points="45,73 100,110 155,73" fill="none" stroke="#0ea5e9" strokeWidth="2" strokeLinejoin="round" />
      <line x1="45" y1="140" x2="75" y2="110" stroke="#bae6fd" strokeWidth="1.5" />
      <line x1="155" y1="140" x2="125" y2="110" stroke="#bae6fd" strokeWidth="1.5" />
      <circle cx="160" cy="50" r="12" fill="#d1fae5" opacity="0.6" />
      <circle cx="35" cy="150" r="8" fill="#e0f2fe" opacity="0.6" />
      <circle cx="100" cy="160" r="5" fill="#10b981" opacity="0.4" />
    </svg>
  );
}

const illustrations = {
  service: ServiceIllustration,
  pricing: PricingIllustration,
  blog: BlogIllustration,
  about: AboutIllustration,
  faq: FaqIllustration,
  contact: ContactIllustration,
};

export default function PageHero({ tag, title, description, illustration }: PageHeroProps) {
  const Illustration = illustrations[illustration];

  return (
    <section className="bg-gradient-to-br from-primary-light via-white to-accent-light py-16 sm:py-20 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          <div className="flex-1 text-center md:text-left">
            {tag && (
              <p className="text-primary font-medium mb-4 text-sm tracking-wide">
                {tag}
              </p>
            )}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-text leading-tight mb-4">
              {title}
            </h1>
            <p className="text-text-light text-base sm:text-lg max-w-xl leading-relaxed">
              {description}
            </p>
          </div>
          <div className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 shrink-0 opacity-80">
            <Illustration />
          </div>
        </div>
      </div>
    </section>
  );
}
