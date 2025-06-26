import { RegisterForm } from "@/components/auth/register-form";
import Link from "next/link";
import { Leaf } from "lucide-react";
import Image from "next/image";

export default function RegisterPage() {
  return (
    <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2">
       <div className="hidden bg-muted lg:block relative">
        <Image
          src="https://images.unsplash.com/photo-1617953141905-ab66db242a84?q=80&w=2070&auto=format&fit=crop"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.3]"
        />
      </div>
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
           <div className="flex items-center justify-center gap-2 mb-4">
            <Link href="/" className="flex items-center justify-center gap-2" prefetch={false}>
              <Leaf className="h-8 w-8 text-primary" />
              <span className="text-2xl font-semibold font-headline">AP Agri-Tech</span>
            </Link>
          </div>
          <RegisterForm />
        </div>
      </div>
    </div>
  );
}
