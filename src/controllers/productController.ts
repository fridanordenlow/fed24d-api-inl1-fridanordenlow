import { Request, Response } from 'express';
import { ResultSetHeader } from 'mysql2';
import { db } from '../config/db';
import { IProduct } from '../models/IProduct';
import { IProductDBResponse } from '../models/IProductDBResponse';
import { formatProductFromDB } from '../helpers/formatProductFromDB';

export const fetchAllProducts = async (req: Request, res: Response) => {
  const { search, sort } = req.query;
  console.log(search, sort);

  let sql = `
  SELECT 
  p.id AS product_id,
  p.name AS product_name,
  p.description AS product_description,
  p.stock AS product_stock,
  p.price AS product_price,
  p.image_url AS product_image_url,
  p.created_at AS product_created_at,
  GROUP_CONCAT(c.name SEPARATOR ', ') AS category_names
  FROM products p
  LEFT JOIN product_categories pc ON p.id = pc.product_id
  LEFT JOIN categories c ON pc.category_id = c.id
  `;

  let params: any[] = [];
  let searchSQL = '';
  let sortSQL = '';

  try {
    if (search) {
      searchSQL = 'WHERE p.name LIKE ?';
      params.push(`%${search}%`);
    }

    if (sort) {
      const orderBy = sort === 'desc' ? 'DESC' : 'ASC';
      sortSQL = `ORDER BY p.price ${orderBy}`;
    }

    sql = sql + searchSQL + ' GROUP BY p.id ' + sortSQL;

    const [rows] = await db.query<IProductDBResponse[]>(sql, params);

    const productsFromDB: IProduct[] = rows.map(formatProductFromDB);

    res.json(productsFromDB.length ? productsFromDB : []);
    console.log(productsFromDB);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    res.status(500).json({ error: message });
  }
};

export const fetchSingleProduct = async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    // const sql = `
    // SELECT * FROM products
    // WHERE id = ?
    // `;

    const sql = `
      SELECT 
        p.id AS product_id,
        p.name AS product_name,
        p.description AS product_description,
        p.stock AS product_stock,
        p.price AS product_price,
        p.image_url AS product_image_url,
        p.created_at AS product_created_at,
        GROUP_CONCAT(c.name SEPARATOR ', ') AS category_names
      FROM products p
      LEFT JOIN product_categories pc ON p.id = pc.product_id
      LEFT JOIN categories c ON pc.category_id = c.id
      WHERE p.id = ?
      GROUP BY p.id
    `;

    const [rows] = await db.query<IProductDBResponse[]>(sql, [id]);
    const productDB = rows[0];

    if (!productDB) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }

    const product = formatProductFromDB(productDB);

    console.log(product);
    res.json(product);
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
    return;
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
  const updates: Partial<IProductDBResponse> = req.body;

  if (!id) {
    res.status(400).json({ error: 'Product not found' });
    return;
  }

  if (!updates || Object.keys(updates).length === 0) {
    res.status(400).json({
      error: 'At least one field must be provided to update the product',
    });
    return;
  }

  try {
    const keys = Object.keys(updates) as (keyof IProductDBResponse)[];
    const fieldsToUpdate = keys
      .map((key: keyof IProductDBResponse) => `${key} = ?`)
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
      return;
    }

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

export const deleteProduct = async (req: Request, res: Response) => {
  const id = req.params.id;

  if (!id) {
    res.status(400).json({ error: 'Product not found' });
    return;
  }

  try {
    const sql = `
    DELETE FROM products
    WHERE id = ?
    `;

    const [result] = await db.query<ResultSetHeader>(sql, [id]);

    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }

    res.json({ message: 'Product deleted', productId: id });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    res.status(500).json({ error: message });
  }
};
