import { NationalThreatGauge } from "@/components/home/NationalThreatGauge";
import { RegionalThreatMap } from "@/components/home/RegionalThreatMap";
import { AdvisoriesFeed } from "@/components/home/AdvisoriesFeed";
import { WhistleblowerSection } from "@/components/home/WhistleblowerSection";
import { InfoSections } from "@/components/home/InfoSections";
import { ShareSection } from "@/components/home/ShareSection";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-6 space-y-8">
      {/* Top Section: Threat Intelligence */}
      <section className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-1 h-full">
          <NationalThreatGauge />
        </div>
        <div className="md:col-span-2 h-full">
          <RegionalThreatMap />
        </div>
      </section>

      {/* Advisories Feed */}
      <AdvisoriesFeed />

      {/* Reporting CTA */}
      <WhistleblowerSection />

      {/* Informational Areas */}
      <InfoSections />

      {/* Awareness & Sharing */}
      <ShareSection />
    </div>
  );
}
