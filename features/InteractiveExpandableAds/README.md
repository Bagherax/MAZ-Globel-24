# Interactive Expandable Ads Module

## 1. Purpose

The Interactive Expandable Ads component is designed to display a collection of advertisements in a flexible grid. Each ad can be clicked to expand and reveal more details, such as a description and actionable buttons. It is a self-contained, interactive component for showcasing products or listings.

## 2. Features

-   **Expand/Collapse**: Users can click on an ad to smoothly expand a detailed view below it. Clicking again collapses the view.
-   **Dynamic Sizing**: Supports `small`, `medium`, and `large` ad sizes, which can be configured via props.
-   **Animated Transitions**: Utilizes `framer-motion` to provide fluid animations for the expand and collapse actions.
-   **Custom Actions**: Can display a list of action buttons (e.g., "Buy", "Share") in the expanded view.
-   **Themed**: Styled with Tailwind CSS and uses the application's theme variables to ensure visual consistency.

## 3. Dependencies

-   **React**: Core component library.
-   **framer-motion**: For animations.
-   **Tailwind CSS**: For styling.

## 4. How to Use

Import the component and provide it with an array of `Ad` objects.

```jsx
import InteractiveExpandableAds from './features/InteractiveExpandableAds/InteractiveExpandableAds';
import { Ad } from './features/InteractiveExpandableAds/types';

const myAds: Ad[] = [
  {
    id: 1,
    title: "Awesome Product",
    size: "medium",
    description: "This is a great product you should buy.",
    image: "url/to/image.jpg",
    actions: ["Buy Now", "Learn More"]
  },
  // ... more ads
];

const MyPage = () => {
  return <InteractiveExpandableAds ads={myAds} />;
};
```

**Important Note**: This component is strictly for displaying expandable ads and has no relation to the chat system or `ChatPopup` component.
