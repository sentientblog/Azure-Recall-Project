import { createFileRoute, Link } from "@tanstack/react-router";
import { categories, flashcards } from "@/data/flashcards";
import { useProgress, resetProgress } from "@/lib/progress";
import { Shell, btnPrimary, btnGhost } from "@/components/Shell";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Azure Recall — AZ-900 Flashcards" },
      { name: "description", content: "Study Azure fundamentals for the AZ-900 exam with focused flashcards." },
      { property: "og:title", content: "Azure Recall — AZ-900 Flashcards" },
      { property: "og:description", content: "Study Azure fundamentals for the AZ-900 exam with focused flashcards." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const progress = useProgress();
  const got = flashcards.filter((c) => progress[c.id] === "got").length;
  const review = flashcards.filter((c) => progress[c.id] === "review").length;
  const pct = Math.round((got / flashcards.length) * 100);

  return (
    <Shell>
      <section className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Welcome back, cloud learner.</h1>
        <p className="mt-2 text-muted-foreground">Pick a topic and work through the cards. Mark what you know and what needs another look.</p>
      </section>

      <section className="mb-10 grid gap-4 rounded-2xl border border-border bg-card p-5 sm:grid-cols-[1fr_auto] sm:items-center">
        <div>
          <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm">
            <span><b className="text-success">{got}</b> known</span>
            <span><b className="text-warning">{review}</b> to review</span>
            <span><b>{flashcards.length - got - review}</b> not studied</span>
          </div>
          <div className="mt-3 h-2 overflow-hidden rounded-full bg-muted" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
            <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${pct}%` }} />
          </div>
          <p className="mt-2 text-xs text-muted-foreground">Progress is saved in this browser only.</p>
        </div>
        <div className="flex gap-2">
          {review > 0 ? (
            <Link to="/study/$categoryId" params={{ categoryId: "review" }} className={btnPrimary}>Review Again ({review})</Link>
          ) : (
            <button disabled className={btnPrimary}>Review Again (0)</button>
          )}
          {got + review > 0 && <button onClick={resetProgress} className={btnGhost}>Reset</button>}
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((cat) => {
          const cards = flashcards.filter((c) => c.category === cat.id);
          const known = cards.filter((c) => progress[c.id] === "got").length;
          return (
            <Link
              key={cat.id}
              to="/study/$categoryId"
              params={{ categoryId: cat.id }}
              className="group flex flex-col rounded-2xl border border-border bg-card p-5 transition hover:-translate-y-0.5 hover:border-primary focus-visible:outline-2 focus-visible:outline-ring"
            >
              <h2 className="font-semibold">{cat.name}</h2>
              <p className="mt-1 flex-1 text-sm text-muted-foreground">{cat.description}</p>
              <div className="mt-4 flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{cards.length} cards · {known} known</span>
                <span className="font-semibold text-primary group-hover:underline">Study →</span>
              </div>
            </Link>
          );
        })}
      </section>
    </Shell>
  );
}
