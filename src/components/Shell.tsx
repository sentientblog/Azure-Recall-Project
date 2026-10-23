import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

export function Shell({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto flex min-h-screen max-w-5xl flex-col px-4 py-6 sm:px-6">
      <header className="mb-8 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 rounded-md text-lg font-bold focus-visible:outline-2 focus-visible:outline-ring">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary text-primary-foreground">A</span>
          Azure Recall
        </Link>
        <span className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">AZ-900</span>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="mt-12 border-t border-border pt-4 text-center text-xs text-muted-foreground">
        Independent AZ-900 study project. Not affiliated with Microsoft.
      </footer>
    </div>
  );
}

export const btn =
  "inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-40";
export const btnPrimary = `${btn} bg-primary text-primary-foreground hover:bg-primary/85`;
export const btnGhost = `${btn} border border-border bg-secondary text-secondary-foreground hover:bg-accent`;
