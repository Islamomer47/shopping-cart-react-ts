export interface Product {
  stock: boolean;
  onSale: boolean;
  isNew: boolean;
  isBestSeller: boolean;
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
  category: string;
  rating: {
    rate: number;
    count: number;
  };
}

export interface CartItemModel extends Product {
  quantity: number;
}
