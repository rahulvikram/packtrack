import { cn } from "@/src/lib/utils";
import { LucideIcon, Package } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { RainbowButton } from "./ui/rainbow-button";

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

export function EmptyState({
  icon: Icon = Package,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-lg border border-dashed p-12 text-center",
        className
      )}
    >
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
        <Icon className="h-8 w-8 text-muted-foreground" />
      </div>
      <h3 className="mt-4 text-lg font-semibold">{title}</h3>
      <p className="mt-2 max-w-sm text-sm mb-4 text-muted-foreground">{description}</p>
      <RainbowButton onClick={action?.onClick}>{action?.label}</RainbowButton>
    </div>
  );
}
