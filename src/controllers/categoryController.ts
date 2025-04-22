import { Request, Response } from 'express';
import { ResultSetHeader } from 'mysql2';
import { db } from '../config/db';
import { ICategory } from '../models/ICategory';
import { IProductDBResponse } from '../models/IProductDBResponse';
import { formatProductFromDB } from '../helpers/formatProductFromDB';

export const fetchAllCategories = async (req: Request, res: Response) => {
  try {
    const sql = `SELECT * FROM categories`;
    const [rows] = await db.query<ICategory[]>(sql);

    res.json(rows);
    console.log(rows);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    res.status(500).json({ error: message });
  }
};

export const fetchSingleCategory = async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const sql = `
    SELECT * FROM categories 
    WHERE id = ?
    `;
    const [rows] = await db.query<ICategory[]>(sql, [id]);
    const category = rows[0];

    if (!category) {
      res.status(404).json({ message: 'Category not found' });
      return;
    }

    console.log(rows);
    res.json(rows);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    res.status(500).json({ error: message });
  }
};

export const fetchCategoryProducts = async (req: Request, res: Response) => {
  const categoryId = req.params.id;

  try {
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
      JOIN product_categories pc ON p.id = pc.product_id
      JOIN categories c ON c.id = pc.category_id
      WHERE c.id = ?
      GROUP BY p.id
    `;

    const [rows] = await db.query<IProductDBResponse[]>(sql, [categoryId]);

    if (rows.length === 0) {
      return res
        .status(404)
        .json({ message: `No products found for category ID ${categoryId}.` });
    }

    const products = rows.map(formatProductFromDB);

    res.json(products);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    res.status(500).json({ error: message });
  }
};

export const addCategory = async (req: Request, res: Response) => {
  const name = req.body.name;

  if (!name) {
    res.status(400).json({ error: 'Name is required' });
    return;
  }

  try {
    const sql = `
    INSERT INTO categories (name)
    VALUES (?)
    `;
    const [result] = await db.query<ResultSetHeader>(sql, [name]);
    res.status(201).json({ message: 'Category added', id: result.insertId });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    res.status(500).json({ error: message });
  }
};

export const updateCategory = async (req: Request, res: Response) => {
  const id = req.params.id;
  const updates: Partial<ICategory> = req.body;

  if (!id) {
    res.status(400).json({ error: 'Category not found' });
    return;
  }

  if (!updates || Object.keys(updates).length === 0) {
    res.status(400).json({
      error: 'At least one field must be provided to update category',
    });
    return;
  }

  try {
    const keys = Object.keys(updates) as (keyof ICategory)[];
    const fieldsToUpdate = keys
      .map((key: keyof ICategory) => `${key} = ?`)
      .join(',');
    const values = keys.map((key) => updates[key]);
    values.push(id);

    const sql = `
    UPDATE categories
    SET ${fieldsToUpdate}
    WHERE id = ?
    `;

    const [result] = await db.query<ResultSetHeader>(sql, values);

    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Category not found' });
      return;
    }

    console.log(updates);

    res.json({
      message: 'Category updated',
      categoryId: id,
      updatedFields: updates,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    res.status(500).json({ error: message });
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  const id = req.params.id;

  if (!id) {
    res.status(400).json({ error: 'Category not found' });
    return;
  }

  try {
    const sql = `
    DELETE FROM categories
    WHERE id = ?
    `;

    const [result] = await db.query<ResultSetHeader>(sql, [id]);

    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Category not found' });
      return;
    }

    res.json({ message: 'Category deleted', productId: id });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    res.status(500).json({ error: message });
  }
};
