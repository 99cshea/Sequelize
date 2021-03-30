/* eslint-disable no-console */
import express from "express";
import sequelize from "sequelize";
import apiRoutes from "../routes/apiRoutes.js";
import db from "../database/initializeDB.js";

const app = express();

const router = express.Router();

const PORT = process.env.PORT || 3000;

router.get("/dining", async (req, res) => {
    try {
      const halls = await db.DiningHall.findAll();
      const reply =
        halls.length > 0 ? { data: halls } : { message: "no results found" };
      res.json(reply);
    } catch (err) {
      console.error(err);
      res.error("Server error");
    }
  });