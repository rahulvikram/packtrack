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

// This would come from your API when user is logged in
const mockOrders: PackageType[] = [];

export default function OrderHistory() {
  const [statusFilter, setStatusFilter] = useState<PackageStatus | "all">("all");

  const filteredOrders = mockOrders.filter((order) => {
    if (statusFilter === "all") return true;
    return order.status === statusFilter;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Order History</h1>
        <p className="mt-2 text-muted-foreground">
          View all your past and current shipments
        </p>
      </div>

      {/* Filters */}
      <div className="mb-6 flex items-center justify-between">
        <Select
          value={statusFilter}
          onValueChange={(value) => setStatusFilter(value as PackageStatus | "all")}
        >
          <SelectTrigger className="w-[180px]">
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
                  onClick: () => window.location.href = "/track",
                }
              : undefined
          }
        />
      ) : (
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tracking ID</TableHead>
                  <TableHead>Destination</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Estimated Delivery</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-mono font-medium">
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
                      <Button variant="ghost" size="sm" asChild>
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
  );
}
