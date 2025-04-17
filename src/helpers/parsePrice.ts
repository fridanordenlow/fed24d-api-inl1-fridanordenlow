import { IProduct } from '../models/IProduct';

export const parsePrice = (product: IProduct): IProduct => {
  return {
    ...product,
    price: parseFloat(product.price as unknown as string),
  };
};
