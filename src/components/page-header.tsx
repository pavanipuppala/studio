import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Leaf } from "lucide-react";

export function PageHeader() {
  return (
    <header className="px-4 lg:px-6 h-16 flex items-center bg-card border-b">
      <Link href="/" className="flex items-center justify-center gap-2" prefetch={false}>
        <Leaf className="h-6 w-6 text-primary" />
        <span className="text-lg font-semibold font-headline">AP Agri-Tech</span>
      </Link>
      <nav className="ml-auto flex gap-4 sm:gap-6 items-center">
        <Link href="/#features" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
          Features
        </Link>
        <Link href="/documentation" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
          Documentation
        </Link>
        <Link href="/contact" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
          Contact
        </Link>
        <Button asChild>
          <Link href="/login">Login</Link>
        </Button>
      </nav>
    </header>
  );
}
