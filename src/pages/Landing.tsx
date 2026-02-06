import Link from "next/link";
import { Button } from "@/src/components/ui/button";
import { Package, Truck, Shield, Clock, ArrowRight } from "lucide-react";
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

const features = [
  {
    icon: Truck,
    title: "Real-Time Tracking",
    description: "Monitor your shipments in real-time with accurate location updates.",
  },
  {
    icon: Clock,
    title: "Instant Alerts",
    description: "Get notified immediately when your package status changes.",
  },
  {
    icon: Shield,
    title: "Secure & Reliable",
    description: "Enterprise-grade security for your logistics data.",
  },
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <header className="border-b bg-card/95 backdrop-blur">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500">
              <Package className="h-5 w-5 text-primary-foreground" />
            </div>
            <div className="flex items-center gap-0">
              <span className="text-xl font-bold">Pack</span>
              <span className="text-xl font-bold text-blue-500">Track</span>
            </div>
          </Link>
          <div className="flex items-center gap-4">
            <SignedOut>
              <SignInButton>
                <Button variant="ghost">Customer Login</Button>
              </SignInButton>
              <Button variant="outline" asChild>
                <Link href="/admin/login">Admin Portal</Link>
              </Button>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent" />
        <div className="container relative mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Track Your Shipments{" "}
              <span className="text-blue-500 dark:text-blue-500">in Real-Time</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              Stay informed with instant updates on your deliveries. From pickup to
              doorstep, know exactly where your package is at every moment.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="border-t bg-card py-20">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold">Why Choose PackTrack?</h2>
            <p className="mt-4 text-muted-foreground">
              Powerful features for modern logistics management
            </p>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-xl border bg-background p-6 transition-shadow hover:shadow-lg"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mt-4 text-lg font-semibold">{feature.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl rounded-2xl bg-primary p-8 text-center text-primary-foreground lg:p-12">
            <h2 className="text-2xl font-bold lg:text-3xl">
              Ready to streamline your logistics?
            </h2>
            <p className="mt-4 opacity-90">
              Join thousands of businesses who trust PackTrack for their delivery
              tracking needs.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
              <SignedOut>
                <SignInButton>
                  <Button
                    variant="secondary"
                    size="lg"
                    className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
                  >
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </SignInButton>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10"
                  asChild
                >
                  <Link href="/admin/login">Admin Login</Link>
                </Button>
              </SignedOut>
              <SignedIn>
                <Button
                  variant="secondary"
                  size="lg"
                  className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
                  asChild
                >
                  <Link href="/dashboard">
                    Go to Dashboard
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </SignedIn>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} PackTrack. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
