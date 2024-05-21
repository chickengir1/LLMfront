import express from "express";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const DB_PATH = path.join(__dirname, "public", "db.json");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const readJsonFile = async (filePath) => {
  try {
    const data = await fs.readFile(filePath, "utf8");
    return JSON.parse(data);
  } catch (err) {
    throw new Error("Error reading db.json");
  }
};

const writeJsonFile = async (filePath, data) => {
  try {
    await fs.writeFile(filePath, JSON.stringify(data, null, 2));
  } catch (err) {
    throw new Error("Error writing to db.json");
  }
};

const errorHandler = (res, message, statusCode = 500) => {
  res.status(statusCode).send({ error: message });
};

app.post("/api/save", async (req, res) => {
  const newBox = req.body;
  try {
    const jsonData = await readJsonFile(DB_PATH);
    jsonData.push(newBox);
    await writeJsonFile(DB_PATH, jsonData);
    res.status(200).send({ message: "Data saved successfully" });
  } catch (error) {
    errorHandler(res, error.message);
  }
});

app.put("/api/update/:id", async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const updatedBox = req.body;

  try {
    const jsonData = await readJsonFile(DB_PATH);
    const index = jsonData.findIndex((box) => box.id === id);
    if (index === -1) {
      return errorHandler(res, "Item not found", 404);
    }

    jsonData[index] = { ...jsonData[index], ...updatedBox };
    await writeJsonFile(DB_PATH, jsonData);
    res.status(200).send({ message: "Data updated successfully" });
  } catch (error) {
    errorHandler(res, error.message);
  }
});

app.delete("/api/delete/:id", async (req, res) => {
  const id = parseInt(req.params.id, 10);

  try {
    const jsonData = await readJsonFile(DB_PATH);
    const index = jsonData.findIndex((box) => box.id === id);
    if (index === -1) {
      return errorHandler(res, "Item not found", 404);
    }

    jsonData.splice(index, 1);
    await writeJsonFile(DB_PATH, jsonData);
    res.status(200).send({ message: "Data deleted successfully" });
  } catch (error) {
    errorHandler(res, error.message);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
