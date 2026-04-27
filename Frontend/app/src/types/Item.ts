export interface Product {
  id: string; // Bắt buộc phải có để định tuyến CRUD
  category: string;
  title: string;
  price: string;
  image: string;
  description: string;
}
