import { query } from "../db.js";
import redis from "../redis.js";

const CACHE_KEY = "clients:all";

export const getClients = async () => {
  const cachedClients = await redis.get(CACHE_KEY);
  if (cachedClients) {
    return JSON.parse(cachedClients);
  }

  const { rows } = await query("SELECT * FROM clients_table ORDER BY id DESC");
  await redis.set(CACHE_KEY, JSON.stringify(rows), { EX: 3600 });

  return rows;
};

export const createClient = async (clientData) => {
  const { name, email, status, plus_ones, is_new, is_active } = clientData;
  const { rows } = await query(
    `INSERT INTO clients_table (name, email, status, plus_ones, is_new, is_active)
     VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
    [name, email, status, plus_ones, is_new, is_active],
  );

  await redis.del(CACHE_KEY);
  return rows[0];
};

export const updateClient = async (clientId, clientData) => {
  const { name, email, status, plus_ones, is_new, is_active } = clientData;
  const { rows } = await query(
    `UPDATE clients_table SET name = $1, email = $2, status = $3, plus_ones = $4, is_new = $5, is_active = $6
     WHERE id = $7 RETURNING *`,
    [name, email, status, plus_ones, is_new, is_active, clientId],
  );

  if (rows[0]) await redis.del(CACHE_KEY);
  return rows[0];
};

export const deleteClient = async (clientId) => {
  const { rowCount } = await query("DELETE FROM clients_table WHERE id = $1", [
    clientId,
  ]);

  if (rowCount > 0) await redis.del(CACHE_KEY);
  return rowCount > 0;
};

export const searchClients = async (searchTerm) => {
  const { rows } = await query(
    `SELECT * FROM clients_table WHERE name ILIKE $1 OR email ILIKE $1`,
    [`%${searchTerm}%`],
  );
  return rows;
};
