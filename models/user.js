// const knex = require("../db/knex");

// const TABLE_NAME = "users";

// async function findById(userId) {
//   const user = await where({id: userId});
//   if (user === null) {
//     throw new Error("User not found")
//   }
//   return {...user};
// }

// async function where(condition) {
//   return await knex(TABLE_NAME)
//     .where(condition)
//     .then((results) => {
//       if (results.length === 0) {
//         return null;
//       }
//       console.log(results[0]);
//       return results[0];
//     });
// }

// async function where(condition) {
//   return await knex(TABLE_NAME)
//     .where(condition)
//     .then((results) => {
//       if (results.length === 0) {
//         return null;
//       }
//       return results[0];
//     });
// }

// module.exports = {
//   findById,
// };



const knex = require("../db/knex");

const TABLE_NAME = "users";

async function findById(userId) {
  const user = await knex(TABLE_NAME).where({ id: userId }).first();
  return user || null;
}

async function findByUsername(username) {
  const user = await knex(TABLE_NAME).where({ username }).first();
  return user || null;
}

async function create(userData) {
  const [user] = await knex(TABLE_NAME).insert(userData).returning("*");
  return user;
}

module.exports = {
  findById,
  findByUsername,
  create,
};