"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent } from "@/src/components/ui/card";
import { Package, X, Search } from "lucide-react";

interface TrackPackageModalProps {
  onClose: () => void;
  onTrackPackage: (trackingId: string) => void;
}

export function TrackPackageModal({ onClose, onTrackPackage }: TrackPackageModalProps) {
  const [trackingId, setTrackingId] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = trackingId.trim();
    if (trimmed) {
      console.log("Tracking ID submitted:", trimmed);
      onTrackPackage(trimmed);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-navy/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <Card className="relative z-10 w-full max-w-md mx-4 border-golden/30 shadow-2xl">
        <CardContent className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-4"> {/* Less margin */}
            <div className="flex items-center gap-2"> {/* Less gap */}
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-tangerine/10"> {/* Smaller icon area */}
                <Package className="h-4 w-4 text-tangerine" /> {/* Smaller icon */}
              </div>
              <div>
                <h2 className="text-base font-semibold text-navy">Track a Package</h2> {/* Smaller text */}
                <p className="text-xs text-muted-foreground">
                  Enter your tracking ID to get started
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={onClose}
              className="text-muted-foreground hover:text-navy"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3"> {/* Less vertical space */}
            <div>
              <label
                htmlFor="tracking-id"
                className="mb-1 block text-xs font-medium text-navy"
              >
                Tracking ID
              </label>
              <input
                ref={inputRef}
                id="tracking-id"
                type="text"
                value={trackingId}
                onChange={(e) => setTrackingId(e.target.value)}
                placeholder="e.g. PKT-2026-ABC123"
                className="flex h-9 w-full rounded-md border border-golden/40 bg-cream/30 px-3 py-1.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-tangerine/40 focus:border-tangerine transition-colors"
              />
            </div>

            <div className="flex gap-3 pt-1"> {/* Less gap and padding */}
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-tangerine text-white hover:bg-tangerine/90"
                disabled={!trackingId.trim()}
              >
                <Search className="mr-2 h-4 w-4" />
                Track Package
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
