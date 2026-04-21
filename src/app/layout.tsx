import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Fogo & Co — Brazilian Fire. Premium Events.",
  description:
    "A premium Brazilian BBQ catering experience crafted for weddings, corporate events and private celebrations across Australia.",
  openGraph: {
    title: "Fogo & Co — Brazilian Fire. Premium Events.",
    description:
      "Premium Brazilian BBQ catering for weddings, corporate and private events.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-background text-foreground antialiased">
        {children}
        <Toaster theme="dark" richColors position="top-right" />
      </body>
    </html>
  );
}
