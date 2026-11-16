interface SkeletonProps {
  className?: string;
  variant?: "rectangular" | "circular" | "arch";
}

export function Skeleton({
  className = "",
  variant = "rectangular",
}: SkeletonProps) {
  const variantStyles = {
    rectangular: "rounded-[10px]",
    circular: "rounded-full",
    arch: "rounded-t-[140px] rounded-b-[14px]",
  };

  return (
    <div
      className={`relative overflow-hidden bg-charcoal/80 border border-white/5 ${variantStyles[variant]} ${className}`}
    >
      {/* Transform-only shimmer gradient bar */}
      <div
        className="absolute inset-0 w-full h-full -translate-x-full animate-sweep"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(201, 162, 75, 0.08) 50%, transparent 100%)",
        }}
      />
    </div>
  );
}
