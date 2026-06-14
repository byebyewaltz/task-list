import db from "#db/client";

import { createTask } from "#db/queries/tasks";
import { createUser } from "#db/queries/users";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  const user = await createUser("donna", "password123");

  await Promise.all([
    createTask("Buy groceries", false, user.id),
    createTask("Finish portfolio site", false, user.id),
    createTask("Water the plants", true, user.id),
  ]);
}
