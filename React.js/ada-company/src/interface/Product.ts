export interface Product {
  slug: string;
  title: string;
  price: number;
  description: string;
  category: string;
  count: number;
  image: string;
  quantity?: number;
}
