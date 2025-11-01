export interface Ad {
  id: number;
  title: string;
  image?: string;
  size: "small" | "medium" | "large";
  description: string;
  actions?: string[]; // e.g., ["Buy", "Share"]
}

export interface InteractiveExpandableAdsProps {
  ads: Ad[];
}
