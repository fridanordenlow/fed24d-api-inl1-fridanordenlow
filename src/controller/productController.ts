import { Request, Response } from 'express';
import { ResultSetHeader } from 'mysql2';
import { db } from '../config/db';
import { IProduct } from '../models/IProduct';
import { parsePrice } from '../helpers/parsePrice';

export const fetchAllProducts = async (req: Request, res: Response) => {
  try {
    const sql = 'SELECT * FROM products';
    const [rows] = await db.query<IProduct[]>(sql);

    // Convert DECIMAL prices to numbers
    const parsedProducts = rows.map(parsePrice);
    // rows.forEach((product) => {
    //   product.price = parseFloat(product.price as unknown as string);
    // });

    res.json(parsedProducts);
    console.log(parsedProducts);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    res.status(500).json({ error: message });
  }
};

export const fetchSingleProduct = async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const sql = 'SELECT * FROM products WHERE id = ?';
    const [rows] = await db.query<IProduct[]>(sql, [id]);
    const product = rows[0];

    if (!product) {
      res.status(404).json({ message: 'Product not found' });
    }

    const parsedProduct = parsePrice(product);

    console.log(parsedProduct);
    res.json(parsedProduct);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    res.status(500).json({ error: message });
  }
};
