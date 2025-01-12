export type Product = {
  code: number;
  countOfPrices: number;
  dropRatio: number;
  followCount: number;
  imageUrl: string;
  name: string;
  price: number;
  url: string;
};

export type Data = {
  productList: Product[];
  horizontalProductList: Product[];
  nextUrl: string;
};

export type ProductDetail = {
  mkName: string;
  productName: string;
  badge: string;
  rating: number;
  imageUrl: string;
  storageOptions: string[];
  countOfPrices: number;
  price: number;
  freeShipping: boolean;
  lastUpdate: string;
};
