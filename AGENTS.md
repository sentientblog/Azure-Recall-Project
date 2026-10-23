<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep flashcard content in `src/data/flashcards.json`, with the TypeScript module providing typed exports and category metadata, so supplied content remains independently editable without duplicating cards.
- Initialize frozen study decks after browser progress loads and key them by category, so direct review visits and category navigation use the correct saved deck.
