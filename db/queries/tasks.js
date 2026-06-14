import db from "#db/client";

/** Creates a new task owned by the given user and returns it */
export async function createTask(title, done, userId) {
  const sql = `
    INSERT INTO tasks (title, done, user_id)
    VALUES ($1, $2, $3)
    RETURNING *
  `;
  const {
    rows: [task],
  } = await db.query(sql, [title, done, userId]);
  return task;
}

/** Returns all tasks owned by the given user */
export async function getTasksByUserId(userId) {
  const sql = `
    SELECT *
    FROM tasks
    WHERE user_id = $1
    ORDER BY id
  `;
  const { rows: tasks } = await db.query(sql, [userId]);
  return tasks;
}

/** Returns the task with the given id */
export async function getTaskById(id) {
  const sql = `
    SELECT *
    FROM tasks
    WHERE id = $1
  `;
  const {
    rows: [task],
  } = await db.query(sql, [id]);
  return task;
}

/** Updates the task with the given id and returns it */
export async function updateTask(id, title, done) {
  const sql = `
    UPDATE tasks
    SET title = $2, done = $3
    WHERE id = $1
    RETURNING *
  `;
  const {
    rows: [task],
  } = await db.query(sql, [id, title, done]);
  return task;
}

/** Deletes the task with the given id and returns it */
export async function deleteTask(id) {
  const sql = `
    DELETE FROM tasks
    WHERE id = $1
    RETURNING *
  `;
  const {
    rows: [task],
  } = await db.query(sql, [id]);
  return task;
}
