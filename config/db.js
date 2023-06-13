import * as dotenv from "dotenv";
import express, { json } from "express";
import { createPool } from "mysql2";

dotenv.config();

const conn = createPool({
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
  database: process.env.database,
});

const checkConnection = () => {
  conn.getConnection((error, connection) => {
    if (error) {
      console.log("Error While connecting to the database");
      return;
    }
    console.log("connected to the databae...... ");
    connection.release();
  });
};

export { checkConnection, conn };
