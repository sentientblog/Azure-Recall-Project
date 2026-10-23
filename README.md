# Azure Recall - AZ-900 Flashcard Coach

> **Unofficial study tool** Azure Recall is an independent educational prototype. It is not affiliated with or endorsed by Microsoft.

Azure Recall helps beginners preparing for the Microsoft Azure Fundamentals (AZ-900) exam turn passive reading into active recall. Learners study original flashcards by topic, reveal an answer with a plain-language explanation and a Microsoft Learn source, mark what they still miss, and return to those cards in a dedicated review mode.

Built for the Power Learn project Vibe Coding Hackathon: AZ-900 Exam Prep Edition.

## Features

- **Six AZ-900 topics, 30 original flashcards** — five cards per category: Cloud Concepts; Azure Architecture and Services; Compute; Networking; Storage; Security, Governance and Cost Management
- **Question first, answer on demand** — the answer stays hidden until you choose Reveal Answer
- **Learn why, not just what** — every reveal shows an explanation and a link to the specific Microsoft Learn source
- **Honest self-marking** — choose **Got it** or **Review again** on every card
- **Review Again mode** — a dedicated deck containing only the cards you marked for review
- **Visible progress** — dashboard shows reviewed, mastered and to-review counts
- **Progress that survives a refresh** — saved in your browser's local storage, with no account needed
- **Clear empty states** — if a topic or your review deck has no cards, the app tells you instead of failing
- **Responsive dark-mode design** — usable on phone and desktop widths

## How to use it

1. Open Azure Recall and choose one of the six topics on the dashboard — or choose **Review Again** if you have missed cards waiting.
2. Read the question and try to answer it from memory. The answer is hidden on purpose.
3. Select **Reveal Answer** to see the correct answer, why it is correct, and the Microsoft Learn source.
4. Mark the card honestly: **Got it** if you knew it, **Review again** if you missed or guessed it.
5. Move to the next or previous card until you finish the deck, then check your updated progress on the dashboard.
6. Revisit **Review Again** mode to study only the cards you missed. Your progress is saved in the same browser, so you can refresh or return later and continue.

## Tech stack

- Built with **Lovable**, using **React, TypeScript and Tailwind** (as supported by the project setup)
- Flashcard content lives in a separate data file (`flashcards.json`), so content and application logic stay separate
- Progress is stored as a per-card status in the browser's **local storage** — no user accounts, no backend database, and no external API
- Deployed on **Vercel** as a public link that works in any modern browser

## Run it locally

1. Clone this repository and open the project folder.
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`
4. Open the local address shown in the terminal.

**Live app:** https://azure-recall-project.vercel.app/

## Content and limitations

- **Original questions only.** Every flashcard was written by the team from the public AZ-900 skills outline on Microsoft Learn. No real exam questions or question dumps were copied, and no Microsoft logos are used.
- **Verifiable answers.** Each card includes the specific Microsoft Learn page its answer and explanation were checked against. If a card and its source ever disagree, the Microsoft Learn source is correct.
- **Unofficial.** Azure Recall is an independent educational prototype, not affiliated with or endorsed by Microsoft. It supports AZ-900 revision but does not guarantee an exam result.
- **Progress is local.** Your Got it / Review again progress is stored in one browser on one device. It does not follow you to another browser or device, and clearing browser storage will clear it. There are no user accounts by design.
- **Prototype scope.** The app contains 30 cards covering six AZ-900 topics. It has no backend database, no AI features, and no Microsoft Learn API integration.
- **Internet required** to open the deployed app and to follow the Microsoft Learn source links.

## Team

- **Terry Ondara (Member A)** — application development and deployment
- **Anthony Musyoka (Member B)** — flashcard content, QA and documentation, presentation deck