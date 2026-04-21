import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import {
  LayoutDashboard,
  FileEdit,
  Inbox,
  Image as ImageIcon,
  Settings,
  LogOut,
} from "lucide-react";
import { LogoutButton } from "@/components/admin/LogoutButton";

const nav = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/builder", label: "Builder", icon: FileEdit },
  { href: "/admin/enquiries", label: "Enquiries", icon: Inbox },
  { href: "/admin/media", label: "Media", icon: ImageIcon },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  return (
    <div className="theme-admin flex min-h-screen">
      <aside className="hidden w-64 flex-col border-r border-border bg-card p-5 md:flex">
        <Link href="/admin" className="flex items-center gap-2 pb-8">
          <span className="h-2 w-2 rounded-full bg-ember-500" />
          <span className="font-display text-lg">BlockBuilder</span>
        </Link>
        <nav className="flex-1 space-y-1 text-sm">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="flex items-center gap-2.5 rounded-md px-3 py-2 text-muted-foreground transition hover:bg-muted hover:text-foreground"
            >
              <n.icon className="h-4 w-4" />
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="mt-6 border-t border-border pt-5">
          <p className="truncate text-xs text-muted-foreground">{user.email}</p>
          <LogoutButton className="mt-3 flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-muted-foreground transition hover:bg-muted hover:text-foreground">
            <LogOut className="h-4 w-4" /> Sign out
          </LogoutButton>
        </div>
      </aside>
      <main className="flex-1">{children}</main>
    </div>
  );
}
