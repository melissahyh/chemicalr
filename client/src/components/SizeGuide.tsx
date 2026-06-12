import React, { useState } from "react";
import { Ruler, Sparkles, ChevronRight } from "lucide-react";

export default function SizeGuide() {
  const [activeTab, setActiveTab] = useState<"ring" | "necklace" | "bracelet">("ring");
  
  // Interactive Ring Size Calculator State
  const [fingerCircumference, setFingerCircumference] = useState<string>("");
  const [calculatedRingSize, setCalculatedRingSize] = useState<string | null>(null);

  const calculateRingSize = (value: string) => {
    setFingerCircumference(value);
    const num = parseFloat(value);
    if (isNaN(num) || num <= 0) {
      setCalculatedRingSize(null);
      return;
    }
    // Simple US/SG ring size calculation based on standard millimeter circumference
    if (num < 44) setCalculatedRingSize("Under Size 3");
    else if (num >= 44 && num < 46.5) setCalculatedRingSize("US 3 / SG 6");
    else if (num >= 46.5 && num < 49) setCalculatedRingSize("US 4 / SG 8");
    else if (num >= 49 && num < 51.5) setCalculatedRingSize("US 5 / SG 10");
    else if (num >= 51.5 && num < 54) setCalculatedRingSize("US 6 / SG 12");
    else if (num >= 54 && num < 56.5) setCalculatedRingSize("US 7 / SG 14");
    else if (num >= 56.5 && num < 59) setCalculatedRingSize("US 8 / SG 16");
    else if (num >= 59 && num < 61.5) setCalculatedRingSize("US 9 / SG 18");
    else if (num >= 61.5 && num < 64) setCalculatedRingSize("US 10 / SG 20");
    else setCalculatedRingSize("Over Size 10 (Custom Order)");
  };

  return (
    <div className="bg-white border border-[#EFE1D3] p-4 sm:p-6 md:p-8 text-[#330505] space-y-6">
      <div className="flex items-center gap-3 border-b border-[#EFE1D3] pb-4">
        <Ruler className="text-[#7F0F1D] shrink-0" size={20} />
        <div>
          <h3 className="font-serif text-lg sm:text-xl md:text-2xl font-light">Atelier Size Guides</h3>
          <p className="text-[9px] sm:text-[10px] tracking-wider uppercase text-[#665555] font-sans font-light">
            Interactive measurements for your perfect fit
          </p>
        </div>
      </div>

      {/* Tabs optimized with generous touch padding */}
      <div className="flex border-b border-[#EFE1D3] overflow-x-auto scrollbar-none">
        {(["ring", "necklace", "bracelet"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 min-w-[80px] py-4 text-[10px] sm:text-xs tracking-widest uppercase font-sans transition-all duration-300 border-b-2 -mb-[2px] ${
              activeTab === tab
                ? "border-[#7F0F1D] text-[#7F0F1D] font-medium"
                : "border-transparent text-[#665555] hover:text-[#330505]"
            }`}
          >
            {tab}s
          </button>
        ))}
      </div>

      {/* Ring Size Tab */}
      {activeTab === "ring" && (
        <div className="space-y-6 animate-fade-in">
          <div className="bg-[#F9F6F0] p-4 border border-[#EFE1D3] rounded-none space-y-4">
            <h4 className="text-xs tracking-wider uppercase font-sans font-semibold text-[#7F0F1D] flex items-center gap-2">
              <Sparkles size={14} />
              Ring Size Calculator
            </h4>
            <p className="text-xs font-sans font-light leading-relaxed text-[#330505]/90">
              Measure the circumference of your finger in millimeters (mm) using a piece of string or paper, then enter it below to calculate your size.
            </p>
            <div className="flex gap-3 items-center">
              <input
                type="number"
                inputMode="decimal"
                value={fingerCircumference}
                onChange={(e) => calculateRingSize(e.target.value)}
                placeholder="e.g. 52"
                className="bg-white border border-[#EFE1D3] px-4 py-3 text-sm font-sans w-full max-w-[150px] focus:outline-none focus:border-[#7F0F1D] rounded-none appearance-none"
              />
              <span className="text-xs font-sans text-[#665555] font-medium">mm</span>
            </div>
            {calculatedRingSize && (
              <div className="pt-2 border-t border-[#EFE1D3] flex items-center gap-2 text-sm font-sans font-medium text-[#7F0F1D]">
                <span>Suggested Size:</span>
                <span className="bg-white border border-[#7F0F1D] px-2.5 py-1 text-xs tracking-wider uppercase font-semibold">
                  {calculatedRingSize}
                </span>
              </div>
            )}
          </div>

          {/* Standard Chart */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-sans font-light border-collapse">
              <thead>
                <tr className="border-b border-[#EFE1D3] text-[#665555] uppercase tracking-wider text-[10px]">
                  <th className="py-2">Circumference (mm)</th>
                  <th className="py-2">US Size</th>
                  <th className="py-2">SG / Asia Size</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EFE1D3]/50">
                <tr><td className="py-2">49.3</td><td className="py-2">5</td><td className="py-2">10</td></tr>
                <tr><td className="py-2">51.9</td><td className="py-2">6</td><td className="py-2">12</td></tr>
                <tr><td className="py-2">54.4</td><td className="py-2">7</td><td className="py-2">14</td></tr>
                <tr><td className="py-2">57.0</td><td className="py-2">8</td><td className="py-2">16</td></tr>
                <tr><td className="py-2">59.5</td><td className="py-2">9</td><td className="py-2">18</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Necklace Size Tab */}
      {activeTab === "necklace" && (
        <div className="space-y-6 animate-fade-in">
          <p className="text-xs font-sans font-light leading-relaxed text-[#330505]/90">
            Our necklaces are designed for beautiful layering. Use the guide below to visualize how different lengths sit on the chest.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border border-[#EFE1D3] p-4 text-center space-y-2 bg-[#F9F6F0]">
              <span className="font-serif italic text-lg text-[#7F0F1D]">16" (40cm)</span>
              <h5 className="text-[10px] tracking-widest uppercase font-sans font-semibold">Choker Length</h5>
              <p className="text-[11px] font-sans font-light text-[#665555]">Sits gracefully just above the collarbone. Ideal for delicate pendants.</p>
            </div>
            <div className="border border-[#EFE1D3] p-4 text-center space-y-2 bg-[#F9F6F0]">
              <span className="font-serif italic text-lg text-[#7F0F1D]">18" (45cm)</span>
              <h5 className="text-[10px] tracking-widest uppercase font-sans font-semibold">Princess Length</h5>
              <p className="text-[11px] font-sans font-light text-[#665555]">Sits on the collarbone. The most common length for everyday wear.</p>
            </div>
            <div className="border border-[#EFE1D3] p-4 text-center space-y-2 bg-[#F9F6F0]">
              <span className="font-serif italic text-lg text-[#7F0F1D]">20" (50cm)</span>
              <h5 className="text-[10px] tracking-widest uppercase font-sans font-semibold">Matinee Length</h5>
              <p className="text-[11px] font-sans font-light text-[#665555]">Sits below the collarbone. Beautiful for statement charms or plunging necklines.</p>
            </div>
          </div>
        </div>
      )}

      {/* Bracelet Size Tab */}
      {activeTab === "bracelet" && (
        <div className="space-y-6 animate-fade-in">
          <p className="text-xs font-sans font-light leading-relaxed text-[#330505]/90">
            For the ultimate comfort, find your perfect bracelet size by measuring your wrist circumference tightly and adding 1.5cm to 2cm for drape.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-sans font-light border-collapse">
              <thead>
                <tr className="border-b border-[#EFE1D3] text-[#665555] uppercase tracking-wider text-[10px]">
                  <th className="py-2">Wrist Measurement</th>
                  <th className="py-2">Recommended Bracelet Size</th>
                  <th className="py-2">Fit Style</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EFE1D3]/50">
                <tr><td className="py-2">14cm - 15cm</td><td className="py-2">16cm (6.3")</td><td className="py-2">Petite / Snug Fit</td></tr>
                <tr><td className="py-2">15.5cm - 16.5cm</td><td className="py-2">18cm (7.1")</td><td className="py-2">Standard / Comfort Fit</td></tr>
                <tr><td className="py-2">17cm - 18cm</td><td className="py-2">20cm (7.9")</td><td className="py-2">Large / Loose Fit</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
