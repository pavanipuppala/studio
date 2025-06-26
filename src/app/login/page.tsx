import { LoginForm } from "@/components/auth/login-form";
import Link from "next/link";
import { Leaf } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="w-full min-h-screen flex items-center justify-center p-4">
      <div className="mx-auto grid w-[350px] gap-6">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Link href="/" className="flex items-center justify-center gap-2" prefetch={false}>
            <Leaf className="h-8 w-8 text-primary" />
            <span className="text-2xl font-semibold font-headline">AP Agri-Tech</span>
          </Link>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
