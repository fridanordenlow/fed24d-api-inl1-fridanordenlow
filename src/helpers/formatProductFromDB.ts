import { IProduct } from '../models/IProduct';
import { IProductDBResponse } from '../models/IProductDBResponse';

export const formatProductFromDB = (row: IProductDBResponse): IProduct => {
  return {
    id: row.product_id,
    name: row.product_name,
    description: row.product_description,
    stock: row.product_stock,
    price:
      typeof row.product_price === 'string'
        ? parseFloat(row.product_price)
        : row.product_price,
    image_url: row.product_image_url,
    created_at: row.product_created_at,
    category_names: row.category_names ? row.category_names.split(', ') : [],
  };
};
