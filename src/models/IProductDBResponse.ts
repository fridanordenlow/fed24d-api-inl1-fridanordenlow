import { RowDataPacket } from 'mysql2';

export interface IProductDBResponse extends RowDataPacket {
  product_id: number;
  product_name: string;
  product_description: string;
  product_stock: number;
  product_price: number;
  product_image_url: string;
  product_created_at: string;
  category_names: string;
}
