import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Leaf } from "lucide-react";

export function PageHeader() {
  return (
    <header className="px-4 lg:px-6 h-16 flex items-center sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Link href="/" className="flex items-center justify-center gap-2" prefetch={false}>
        <Leaf className="h-6 w-6 text-primary" />
        <span className="text-lg font-semibold font-headline">AP Agri-Tech</span>
      </Link>
      <nav className="ml-auto flex gap-4 sm:gap-6 items-center">
        <Link href="/#features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors" prefetch={false}>
          Features
        </Link>
        <Link href="/documentation" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors" prefetch={false}>
          Documentation
        </Link>
        <Link href="/contact" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors" prefetch={false}>
          Contact
        </Link>
        <Button asChild>
          <Link href="/login">Login</Link>
        </Button>
      </nav>
    </header>
  );
}
