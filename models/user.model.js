import { conn } from "../config/db.js";

const FindUser = () => {
  return new Promise((resolve, reject) => {
    conn.query("SELECT * from user", (error, results) => {
      if (error) reject(error);
      resolve(results);
    });
  });
};

const FindUserById = (id) => {
  return new Promise((resolve, reject) => {
    conn.query("SELECT * from user WHERE id =" + id, (error, results) => {
      if (error) reject(error);
      resolve(results);
    });
  });
};

const createUser = (user) => {
  return new Promise(async (resolve, reject) => {
    user.created_date = new Date();
    try {
      const query = "INSERT INTO user SET ?";
      const [result] = await conn.promise().query(query, user);
      user.id = result.insertId;
      resolve(user);
    } catch (error) {
      reject(error);
    }
  });
};

const updateUser = (id, user) => {
  return new Promise(async (reslove, reject) => {
    try {
      const query = "UPDATE user SET ? WHERE id = ?";
      const [result] = await conn.promise().query(query, [user, id]);
      user.id = id;
      user.affectedRows = result.affectedRows;
      reslove(user);
    } catch (error) {
      reject(error);
    }
  });
};

const deleteUser = (id) => {
  return new Promise((resolve, reject) => {
    conn.query("DELETE from user WHERE id = " + id, (error, results) => {
      if (error) reject(error);
      resolve(results);
    });
  });
};

export { FindUser, FindUserById, createUser, updateUser, deleteUser };
