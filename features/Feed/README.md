# Unified Smart Feed Module

## 1. Purpose

The Unified Smart Feed is the core component of the MAZDADY marketplace homepage, designed to create a dynamic, "living ecosystem" that intelligently blends various content types. It replaces a static welcome page with a constantly refreshing, personalized Masonry grid that showcases regular ads, sponsored content, live market activity, auctions, and AI-driven recommendations.

## 2. Architecture Overview

The feature is architected to be modular, scalable, and maintainable, with a clear separation of concerns between data fetching, content composition, and presentation.

### Key Components:

-   **`FeedContainer.tsx`**: The main entry point and layout manager. It uses a CSS-based Masonry layout (`column-count`) for performance and responsiveness. It fetches the composed feed and manages the "active" state of cards to handle expansion.
-   **`useFeedComposer.ts` (Hook)**: The "brain" of the feed. This custom hook is responsible for:
    -   Fetching data from five different JSON sources in parallel.
    -   Merging the data based on predefined weight ratios to ensure a balanced content mix.
    -   Shuffling the merged results to create a natural, non-uniform flow.
    -   Implementing an auto-refresh mechanism (`setInterval`) to fetch and compose new data every 5 minutes.
-   **`FeedCard.tsx`**: A simple "router" component. It receives a feed item and, based on its `type`, renders the appropriate specialized card component (`AdCard`, `TradeCard`, etc.).
-   **Card Components (`AdCard.tsx`, `PaidAdCard.tsx`, etc.)**: Each of these components is responsible for rendering a specific type of content. They handle their unique layouts, styles, and interactive animations (e.g., expansion, glow, slide-up overlays).

### Data Flow:

1.  `FeedContainer` mounts and calls `useFeedComposer`.
2.  `useFeedComposer` fetches data from `/data/*.json`, composes the feed, and returns the randomized array.
3.  `FeedContainer` maps over the array, rendering a `FeedCard` for each item.
4.  `FeedCard` determines the item type and delegates rendering to the specific card component.
5.  When a user clicks a card, `FeedContainer` updates its state to mark that card as "active," triggering its unique expansion animation.

## 3. Card Types & Behaviors

| Type            | Component        | Tap Action                          | Animation Style                                      | Special Features                             |
| --------------- | ---------------- | ----------------------------------- | ---------------------------------------------------- | -------------------------------------------- |
| **Normal Ad**   | `AdCard.tsx`     | Expand Down                         | Smooth ease-out transition on `max-height`           | Shows product preview on expansion.          |
| **Paid Ad**     | `PaidAdCard.tsx` | Expand Down + Glow                  | Same as AdCard + a persistent, subtle glow animation | "Sponsored" badge, different button color.   |
| **Live Trade**  | `TradeCard.tsx`  | Slide Up Overlay                    | A full-card overlay slides up from the bottom.       | "Live Trade" badge with a pulsing indicator. |
| **Auction**     | `AuctionCard.tsx`| Fade & Scale Reveal                 | Expanded content fades in and scales up.             | Features a countdown timer.                  |
| **AI Suggestion**| `AiCard.tsx`     | Minimalist Expand                   | Smooth ease-out expansion of content.                | Minimalist design with an info icon.         |

All expanded/active cards use a **translucent blue-glass effect** for a modern, unified look.

## 4. Future Expansion Ideas

-   **Infinite Scroll**: Implement a `useAutoLoad` hook to fetch more data as the user scrolls to the bottom of the page.
-   **Scroll Persistence**: Use a `useScrollMemory` hook to save the user's scroll position in `sessionStorage` and restore it when they navigate back to the page.
-   **Real-time Updates**: Replace the `fetch` calls for `liveTrades.json` with a WebSocket connection to push real-time trade updates directly to the feed without a full refresh.
-   **User Personalization**: Store user interaction data (clicks, view time) in `localStorage` and use it to adjust the content weights in `useFeedComposer` for a truly personalized feed.
-   **Filtering**: Add UI controls to allow users to filter the feed (e.g., "Show Live Trades Only" or "Show Ads Only").
-   **Connect to MAZ-AI**: Link the `aiFeed.json` data source to the actual MAZ-AI engine, so suggestions are based on the user's recent searches and context.
