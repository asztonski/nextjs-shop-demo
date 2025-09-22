export type Product = {
  id: string;
  name: string;
  price: number; // minor units, np. 2999 = 29.99
  image: string;
  rating?: number;
  stock?: number;
};
