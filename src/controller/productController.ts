import { Request, Response } from 'express';
import { ResultSetHeader } from 'mysql2';
import { db } from '../config/db';
import { IProduct } from '../models/IProduct';
import { parsePrice } from '../helpers/parsePrice';

export const fetchAllProducts = async (req: Request, res: Response) => {
  try {
    const sql = `SELECT * FROM products`;
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
    const sql = `
    SELECT * FROM products 
    WHERE id = ?
    `;
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

export const addProduct = async (req: Request, res: Response) => {
  const { name, description, stock, price, image_url } = req.body;

  if (!name || !description || !stock || !price || !image_url) {
    res.status(400).json({
      error: 'Name, description, stock, price and image_url are required',
    });
  }

  try {
    const sql = `
    INSERT INTO products (name, description, stock, price, image_url)
    VALUES (?, ?, ?, ?, ?)
    `;
    const [result] = await db.query<ResultSetHeader>(sql, [
      name,
      description,
      stock,
      price,
      image_url,
    ]);
    res.status(201).json({ message: 'Product added', id: result.insertId });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    res.status(500).json({ error: message });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  const id = req.params.id;
  const updates: Partial<IProduct> = req.body;

  if (!id) {
    res.status(400).json({ error: 'Product not found' });
  }

  if (!updates || Object.keys(updates).length === 0) {
    res
      .status(400)
      .json({ error: 'At least one field must be provided to update product' });
  }

  try {
    const keys = Object.keys(updates) as (keyof IProduct)[];
    const fieldsToUpdate = keys
      .map((key: keyof IProduct) => `${key} = ?`)
      .join(',');
    const values = keys.map((key) => updates[key]);
    values.push(id);

    const sql = `
    UPDATE products
    SET ${fieldsToUpdate}
    WHERE id = ?
    `;

    const [result] = await db.query<ResultSetHeader>(sql, values);

    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Product not found' });
    }

    console.log(updates);

    res.json({
      message: 'Product updated',
      productId: id,
      updatedFields: updates,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    res.status(500).json({ error: message });
  }
};
