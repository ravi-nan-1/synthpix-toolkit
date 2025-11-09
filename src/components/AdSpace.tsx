import { memo } from "react";

interface AdSpaceProps {
  slot: "hero" | "sidebar" | "footer";
  className?: string;
}

const AdSpace = memo(({ slot, className = "" }: AdSpaceProps) => {
  // Placeholder for Google AdSense - Replace with actual AdSense code
  return (
    <div 
      className={`flex items-center justify-center bg-muted/30 border border-border rounded-2xl p-4 ${className}`}
      data-ad-slot={slot}
    >
      <div className="text-center">
        <p className="text-sm text-muted-foreground">Advertisement</p>
        <p className="text-xs text-muted-foreground mt-1">AdSense Slot: {slot}</p>
      </div>
    </div>
  );
});

AdSpace.displayName = "AdSpace";

export default AdSpace;
