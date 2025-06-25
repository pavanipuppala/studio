import { LoginForm } from "@/components/auth/login-form";
import Link from "next/link";
import { Leaf } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
       <div className="absolute top-6 left-6">
        <Link href="/" className="flex items-center justify-center gap-2" prefetch={false}>
          <Leaf className="h-6 w-6 text-primary" />
          <span className="text-lg font-semibold font-headline">AP Agri-Tech</span>
        </Link>
      </div>
      <LoginForm />
    </div>
  );
}
