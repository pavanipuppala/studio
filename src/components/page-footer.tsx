import Link from "next/link";
import { FeedbackDialog } from "./feedback-dialog";

export function PageFooter() {
    const currentYear = new Date().getFullYear();
    return (
        <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t bg-card">
            <p className="text-xs text-muted-foreground">
                &copy; {currentYear} Government of Andhra Pradesh. All rights reserved.
            </p>
            <nav className="sm:ml-auto flex gap-4 sm:gap-6 items-center">
                <Link href="https://yukti.mic.gov.in/" target="_blank" rel="noopener noreferrer" className="text-xs hover:underline underline-offset-4" prefetch={false}>
                    YUKTI Portal
                </Link>
                <FeedbackDialog />
            </nav>
        </footer>
    );
}
