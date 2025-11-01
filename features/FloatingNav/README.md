# Floating Nav Module

## 1. Purpose

The Floating Nav module provides a primary, interactive navigation hub for the MAZDADY application. It is designed as an animated, circular menu that expands on hover to reveal key application sections: Settings, Trading, Chat, and Profile. The central "+" button is intended for primary actions like creating a new listing.

This component enhances the user experience by offering a visually engaging and easily accessible navigation point that remains consistent across the platform.

## 2. How It Works

-   **Component Structure**: `FloatingNav.tsx` is a self-contained component.
-   **Animation**: The component uses Tailwind CSS `group-hover` utilities to trigger animations. When the user hovers over the main `<nav>` container (the "group"), the surrounding icon buttons transition from being hidden and centered to visible and spread out in an arc.
-   **CSS Transitions**: The movement, opacity, and scale effects are handled by CSS transitions with a custom `cubic-bezier` timing function to create a dynamic, springy animation. Individual delays are applied to each button to make them appear sequentially.
-   **Styling**: The component is styled using Tailwind CSS classes, ensuring it adheres to the application's design system.

## 3. How It Connects to Other Parts of MAZ

-   **Integration**: The `FloatingNav` component is rendered in the main `App.tsx` layout, placing it prominently near the top of the main content area, just below the AI Chat header.
-   **Navigation (Future)**: Currently, the buttons are placeholders (`href="#"`). In a future implementation, these will be connected to the application's router (e.g., React Router) to navigate to the corresponding pages (`/settings`, `/trading`, `/chat`, `/profile`). The central "+" button would likely open a "Create Listing" modal or page.
