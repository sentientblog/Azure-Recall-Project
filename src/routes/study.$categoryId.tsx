import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { categories, flashcards, type Flashcard } from "@/data/flashcards";
import { useProgress, setStatus, type CardStatus } from "@/lib/progress";
import { Shell, btnPrimary, btnGhost } from "@/components/Shell";

export const Route = createFileRoute("/study/$categoryId")({
  head: ({ params }) => {
    const name = params.categoryId === "review" ? "Review Again" : categories.find((c) => c.id === params.categoryId)?.name ?? "Study";
    return {
      meta: [
        { title: `${name} — Azure Recall` },
        { name: "description", content: `AZ-900 flashcard session: ${name}.` },
        { property: "og:title", content: `${name} — Azure Recall` },
        { property: "og:description", content: `AZ-900 flashcard session: ${name}.` },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: StudyPage,
});

function StudyPage() {
  const { categoryId } = Route.useParams();
  const progress = useProgress();
  const isReview = categoryId === "review";
  const category = categories.find((c) => c.id === categoryId);
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  return (
    <Shell>
      <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">← Dashboard</Link>
      <h1 className="mb-6 mt-2 text-2xl font-bold">{isReview ? "Review Again" : category?.name ?? "Unknown category"}</h1>
      {ready ? <StudyDeck key={categoryId} categoryId={categoryId} progress={progress} /> : <p className="text-muted-foreground">Loading cards…</p>}
    </Shell>
  );
}

function StudyDeck({ categoryId, progress }: { categoryId: string; progress: Record<string, CardStatus> }) {
  // Freeze only after browser progress has loaded, including on direct review visits.
  const [deck] = useState<Flashcard[]>(() =>
    categoryId === "review" ? flashcards.filter((c) => progress[c.id] === "review") : flashcards.filter((c) => c.category === categoryId),
  );
  return deck.length === 0 ? (
        <div className="rounded-2xl border border-border bg-card p-8 text-center">
          <p className="text-muted-foreground">No cards here yet.</p>
          <Link to="/" className={`${btnPrimary} mt-4`}>Back to dashboard</Link>
        </div>
      ) : <Session deck={deck} />;
}

function Session({ deck }: { deck: Flashcard[] }) {
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [marks, setMarks] = useState<Record<string, CardStatus>>({});
  const [done, setDone] = useState(false);
  const card = deck[index];

  const go = (i: number) => {
    if (i < 0) return;
    if (i >= deck.length) return setDone(true);
    setIndex(i);
    setRevealed(false);
  };
  const mark = (s: CardStatus) => {
    if (!card) return;
    setStatus(card.id, s);
    setMarks((m) => ({ ...m, [card.id]: s }));
    go(index + 1);
  };

  if (done || !card) {
    const got = Object.values(marks).filter((s) => s === "got").length;
    const review = Object.values(marks).filter((s) => s === "review").length;
    return (
      <div className="rounded-2xl border border-border bg-card p-8 text-center">
        <h2 className="text-xl font-bold">Session complete</h2>
        <p className="mt-3 text-muted-foreground">
          {deck.length} cards · <span className="text-success">{got} got it</span> · <span className="text-warning">{review} to review</span> · {deck.length - got - review} skipped
        </p>
        <Link to="/" className={`${btnPrimary} mt-6`}>Return to dashboard</Link>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-3 flex items-center justify-between text-sm text-muted-foreground">
        <span>Card {index + 1} of {deck.length}</span>
        {marks[card.id] && <span>Marked: {marks[card.id] === "got" ? "Got it" : "Review again"}</span>}
      </div>
      <div className="mb-4 h-1.5 overflow-hidden rounded-full bg-muted">
        <div className="h-full bg-primary transition-all" style={{ width: `${((index + 1) / deck.length) * 100}%` }} />
      </div>

      <article className="min-h-64 rounded-2xl border border-border bg-card p-6 sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-wider text-primary">Question</p>
        <h2 className="mt-2 text-xl font-semibold leading-snug sm:text-2xl">{card.question}</h2>
        {revealed ? (
          <div className="mt-6 space-y-4 border-t border-border pt-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-primary">Answer</p>
              <p className="mt-1 text-lg">{card.answer}</p>
            </div>
            <p className="text-sm text-muted-foreground">{card.explanation}</p>
            {card.sourceUrl && (
              <a href={card.sourceUrl} target="_blank" rel="noreferrer" className="inline-block text-sm font-medium text-primary underline-offset-4 hover:underline">
                Source: Microsoft Learn ↗
              </a>
            )}
          </div>
        ) : (
          <button onClick={() => setRevealed(true)} className={`${btnPrimary} mt-8`}>Reveal Answer</button>
        )}
      </article>

      {revealed && (
        <div className="mt-4 grid grid-cols-2 gap-3">
          <button onClick={() => mark("got")} className={`${btnGhost} hover:border-success`}>✓ Got it</button>
          <button onClick={() => mark("review")} className={`${btnGhost} hover:border-warning`}>↻ Review Again</button>
        </div>
      )}

      <div className="mt-6 flex justify-between">
        <button onClick={() => go(index - 1)} disabled={index === 0} className={btnGhost}>← Previous</button>
        <button onClick={() => go(index + 1)} className={btnGhost}>{index === deck.length - 1 ? "Finish" : "Next →"}</button>
      </div>
    </div>
  );
}
