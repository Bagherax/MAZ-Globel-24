# Ad Gallery Module

## 1. Purpose

The Ad Gallery module is a full-width, responsive carousel designed to showcase featured products, promotions, or important content directly below the main header. It provides a visually engaging and interactive way to capture user attention and drive traffic to specific internal pages or external links.

## 2. Features

- **Continuous Auto-Scroll**: The gallery automatically scrolls from right to left in a smooth, seamless loop.
- **Manual Control**: Users can pause the auto-scroll by hovering over the gallery. They can take full control by clicking and dragging (on desktop) or touching and swiping (on mobile).
- **Clickable Ads**: Each image in the gallery is a clickable link.
- **Seamless Loop**: The list of ads is duplicated in the component to ensure the scrolling animation loops infinitely without any visible jumps.
- **Optimized Performance**: The auto-scroll is managed by a lightweight JavaScript `setInterval` function, which is more controllable than a pure CSS animation, ensuring smooth performance and proper interaction with user input.

## 3. How It Works

- **Component Structure**: `AdGallery.tsx` is the main component that contains all the logic and styling. It imports its content from `ads.ts`.
- **Auto-Scroll Logic**:
  - A `setInterval` function in a `useEffect` hook increments the `scrollLeft` property of the gallery container at a regular interval, creating the animation.
  - When the scroll reaches the halfway point (the end of the original set of ads), it silently resets to the beginning, creating the infinite loop.
- **Manual Swipe/Drag Logic**:
  - The component listens for `mousedown`, `mousemove`, `mouseup`, `touchstart`, `touchmove`, and `touchend` events.
  - When a user starts dragging/swiping, the auto-scroll interval is cleared to give the user full control.
  - The component calculates the distance the user has moved their cursor/finger and updates the `scrollLeft` property in real-time.
  - When the user releases, the auto-scroll interval is restarted.
- **Click vs. Drag Handling**: A state variable (`hasDragged`) tracks if significant movement has occurred. If it has, the default click action on the link is prevented, so a swipe doesn't accidentally trigger navigation.

## 4. How to Update Ads

**No code changes are needed in the `AdGallery.tsx` component to update the content.**

1.  **Open the data file**: Navigate to `features/AdGallery/ads.ts`.
2.  **Edit the Array**: This file exports a single array named `ads`. You can:
    - **Add a new ad**: Copy an existing object, paste it at the end of the array, and update its `id`, `imageUrl`, `link`, `type`, and `alt` text.
    - **Remove an ad**: Delete the entire object from the array.
    - **Edit an existing ad**: Change the `imageUrl`, `link`, or other properties of an existing object.
3.  **Save the file**. The gallery will update automatically.

### AdItem Properties:

- `id`: A unique number for the ad.
- `imageUrl`: The URL of the image to display. For best results, use landscape images with a similar aspect ratio.
- `link`: The URL the user will be sent to on click.
- `type`: `'internal'` for links within the app (e.g., `/product/123`) or `'external'` for links to other websites. External links will automatically open in a new tab.
- `alt`: Descriptive text for the image, important for accessibility.
