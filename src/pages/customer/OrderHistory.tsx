"use client";
import { useState } from "react";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { StatusBadge } from "@/src/components/StatusBadge";
import { EmptyState } from "@/src/components/EmptyState";
import { Card, CardContent } from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { Package, Eye } from "lucide-react";
import { format } from "date-fns";
import type { Package as PackageType, PackageStatus } from "@/src/types";
import { TrackPackageModal } from "@/src/components/TrackPackageModal";

// This would come from your API when user is logged in
const mockOrders: PackageType[] = [];

export default function OrderHistory() {
  const [statusFilter, setStatusFilter] = useState<PackageStatus | "all">("all");
  const [showTrackPackageModal, setShowTrackPackageModal] = useState(false);

  const handleTrackPackage = (trackingId: string) => {
    // TODO: call backend API route to fetch package via tracking ID and add to order history tracking
    console.log("Tracking ID received:", trackingId);
    alert(`Tracking package: ${trackingId}`);
  };
  
  const filteredOrders = mockOrders.filter((order) => {
    if (statusFilter === "all") return true;
    return order.status === statusFilter;
  });

  return (
    <div className="min-h-[calc(100vh-4rem)]">
      {showTrackPackageModal && (
        <TrackPackageModal
          onClose={() => setShowTrackPackageModal(false)}
          onTrackPackage={handleTrackPackage}
        />
      )}
      {/* Colorful header banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-navy via-navy/90 to-[#00516e]">
        <div className="absolute inset-0 bg-gradient-to-br from-tangerine/10 via-transparent to-golden/10" />
        <div className="container relative mx-auto px-4 py-10">
          <h1 className="text-3xl font-bold text-cream">Order History</h1>
          <p className="mt-2 text-cream/70">
            View all your past and current shipments
          </p>
        </div>
        {/* Decorative bottom wave */}
        <div className="bottom-0 left-0 right-0 h-4 bg-gradient-to-r from-tangerine via-golden to-cream" />
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Filters */}
        <div className="mb-6 flex items-center justify-between">
          <Select
            value={statusFilter}
            onValueChange={(value: PackageStatus | "all") => setStatusFilter(value)}
          >
            <SelectTrigger className="w-[180px] border-golden/40 bg-cream/30">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Orders</SelectItem>
              <SelectItem value="in_transit">Active</SelectItem>
              <SelectItem value="delivered">Delivered</SelectItem>
              <SelectItem value="delayed">Delayed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Orders Table/List */}
        {filteredOrders.length === 0 ? (
          <EmptyState
            icon={Package}
            title="No orders yet"
            description={
              mockOrders.length === 0
                ? "You haven't placed any orders yet. Once you do, they'll appear here."
                : "No orders match your current filter. Try selecting a different status."
            }
            action={
              mockOrders.length === 0
                ? {
                    label: "Track a Package",
                    onClick: () => setShowTrackPackageModal(true)
                  }
                : undefined
            }
            className="border-golden/30 bg-gradient-to-br from-cream/40 via-background to-golden/10"
          />
        ) : (
          <Card className="overflow-hidden border-golden/30">
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="bg-navy/5 hover:bg-navy/5">
                    <TableHead className="text-navy font-semibold">Tracking ID</TableHead>
                    <TableHead className="text-navy font-semibold">Destination</TableHead>
                    <TableHead className="text-navy font-semibold">Status</TableHead>
                    <TableHead className="text-navy font-semibold">Estimated Delivery</TableHead>
                    <TableHead className="text-right text-navy font-semibold">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders.map((order) => (
                    <TableRow key={order.id} className="hover:bg-golden/5">
                      <TableCell className="font-mono font-medium text-tangerine">
                        {order.trackingId}
                      </TableCell>
                      <TableCell>{order.destination}</TableCell>
                      <TableCell>
                        <StatusBadge status={order.status} />
                      </TableCell>
                      <TableCell>
                        {format(new Date(order.estimatedDelivery), "MMM d, yyyy")}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" className="text-navy hover:text-tangerine hover:bg-tangerine/10" asChild>
                          <Link href={`/track/${order.trackingId}`}>
                            <Eye className="mr-2 h-4 w-4" />
                            View
                          </Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
