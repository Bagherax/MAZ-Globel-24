export interface AdItem {
  id: number;
  imageUrl: string;
  link: string;
  type: 'internal' | 'external';
  alt: string;
  size: 'small' | 'medium' | 'large';
}