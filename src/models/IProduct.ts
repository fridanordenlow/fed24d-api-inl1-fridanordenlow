import { RowDataPacket } from 'mysql2';

export interface IProduct extends RowDataPacket {
  id: number;
  name: string;
  description: string;
  stock: number;
  price: number;
  image_url: string;
  created_at: string;
}
