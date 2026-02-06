import { cn } from "@/src/lib/utils";
import type { PackageStatus } from "@/src/types";

interface StatusBadgeProps {
  status: PackageStatus;
  className?: string;
}

const statusConfig: Record<PackageStatus, { label: string; className: string }> = {
  pending: {
    label: "Pending",
    className: "bg-status-pending/10 text-status-pending border-status-pending/20",
  },
  picked_up: {
    label: "Picked Up",
    className: "bg-status-picked-up/10 text-status-picked-up border-status-picked-up/20",
  },
  in_transit: {
    label: "In Transit",
    className: "bg-status-in-transit/10 text-status-in-transit border-status-in-transit/20",
  },
  out_for_delivery: {
    label: "Out for Delivery",
    className: "bg-status-out-for-delivery/10 text-status-out-for-delivery border-status-out-for-delivery/20",
  },
  delivered: {
    label: "Delivered",
    className: "bg-status-delivered/10 text-status-delivered border-status-delivered/20",
  },
  delayed: {
    label: "Delayed",
    className: "bg-status-delayed/10 text-status-delayed border-status-delayed/20",
  },
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
        config.className,
        className
      )}
    >
      {config.label}
    </span>
  );
}
