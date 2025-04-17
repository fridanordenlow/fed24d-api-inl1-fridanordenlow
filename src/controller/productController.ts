import { Request, Response } from 'express';
import { ResultSetHeader } from 'mysql2';
import { db } from '../config/db';
import { IProduct } from '../models/IProduct';

export const fetchAllProducts = async (req: Request, res: Response) => {
  try {
    const sql = 'SELECT * from products';
    const [rows] = await db.query<IProduct[]>(sql);

    // Convert prices to numbers DECIMAL
    rows.forEach((product) => {
      product.price = parseFloat(product.price as unknown as string);
    });

    res.json(rows);
    console.log(rows[0]);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    res.status(500).json({ error: message });
  }
};
