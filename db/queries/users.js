import bcrypt from "bcrypt";

import db from "#db/client";

/** Creates a new user with a hashed password and returns it */
export async function createUser(username, password) {
  const hashedPassword = await bcrypt.hash(password, 10);
  const sql = `
    INSERT INTO users (username, password)
    VALUES ($1, $2)
    RETURNING *
  `;
  const {
    rows: [user],
  } = await db.query(sql, [username, hashedPassword]);
  return user;
}

/** Returns the user with the given id */
export async function getUserById(id) {
  const sql = `
    SELECT *
    FROM users
    WHERE id = $1
  `;
  const {
    rows: [user],
  } = await db.query(sql, [id]);
  return user;
}

/** Returns the user with the given credentials, or undefined if invalid */
export async function getUserByCredentials(username, password) {
  const sql = `
    SELECT *
    FROM users
    WHERE username = $1
  `;
  const {
    rows: [user],
  } = await db.query(sql, [username]);
  if (!user) return undefined;

  const passwordMatches = await bcrypt.compare(password, user.password);
  if (!passwordMatches) return undefined;

  return user;
}
