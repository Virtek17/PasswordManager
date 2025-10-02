"use client";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const GlassCard = ({
  children,
  className = "",
  onClick
}: GlassCardProps) => {
  return (
    <div
      onClick={onClick}
      className={`
                backdrop-blur-xl bg-card-bg/80
                border border-secondary/20 
                rounded-2xl shadow-lg
                transition-all duration-300
                hover:bg-card-bg/90 hover:shadow-xl hover:border-primary/30
                ${onClick ? "cursor-pointer" : ""}
                ${className}
            `}
      data-oid="dkcs4j-">

      {children}
    </div>);

};