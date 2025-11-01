# MAZDADY Theme

This document outlines the theme structure for the MAZDADY P2P Marketplace.

## Theme Change: Light/Day Mode (as of 2024-07-25)

The application theme has been switched from a dark mode to a light/day mode. This change enhances readability in well-lit environments and provides a clean, modern aesthetic.

### How It Works

The theme is controlled by a set of color variables defined within the `tailwind.config` object in `index.html`. Modifying these variables will update the colors across the entire application.

### Key Color Variables

- `'maz-bg'`: The main background color for the application (`#ffffff`).
- `'maz-surface'`: The background color for UI elements like cards and containers (`#f9fafb`).
- `'maz-primary'`: The primary accent color used for buttons, links, and important elements (`#3B82F6`).
- `'maz-secondary'`: The secondary accent color (`#6D28D9`).
- `'maz-text'`: The primary text color (`#111827`).
- `'maz-text-secondary'`: The secondary text color for less important text (`#6b7280`).
