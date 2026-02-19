/**
 * API Produits.
 * Le backend attend du JSON avec les images en base64 (data URL).
 */

import { get, post, put, del } from './http.js';

/** Récupère tous les produits. */
export const fetchProducts = () => get('/products');

/** Récupère un produit par ID. */
export const fetchProduct = (id) => get(`/products/${encodeURIComponent(id)}`);

/** Crée un produit (JSON avec images base64). */
export const createProduct = (data) => post('/products', data);

/** Met à jour un produit. */
export const updateProduct = (id, data) =>
  put(`/products/${encodeURIComponent(id)}`, data);

/** Supprime un produit. */
export const deleteProduct = (id) => del(`/products/${encodeURIComponent(id)}`);
