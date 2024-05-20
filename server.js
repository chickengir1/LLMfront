import express from "express";
import fs from "fs";
import path from "path";
import bodyParser from "body-parser";
import { fileURLToPath } from "url";
import { dirname } from "path";
import cors from "cors";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const DB_PATH = path.join(__dirname, "public", "db.json");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const readJsonFile = (filePath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        return reject("Error reading db.json");
      }
      try {
        const jsonData = JSON.parse(data);
        resolve(jsonData);
      } catch (parseErr) {
        reject("Error parsing db.json");
      }
    });
  });
};

const writeJsonFile = (filePath, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, JSON.stringify(data, null, 2), (err) => {
      if (err) {
        return reject("Error writing to db.json");
      }
      resolve();
    });
  });
};

const errorHandler = (res, message, statusCode = 500) => {
  res.status(statusCode).send(message);
};

app.post("/api/save", async (req, res) => {
  const newBox = req.body;
  try {
    const jsonData = await readJsonFile(DB_PATH);
    jsonData.push(newBox);
    await writeJsonFile(DB_PATH, jsonData);
    res.status(200).send("Data saved successfully");
  } catch (error) {
    errorHandler(res, error);
  }
});

app.put("/api/update/:id", async (req, res) => {
  const id = req.params.id;
  const updatedBox = req.body;

  try {
    const jsonData = await readJsonFile(DB_PATH);
    const index = jsonData.findIndex((box) => box.id === id);
    if (index === -1) {
      return errorHandler(res, "Item not found", 404);
    }

    jsonData[index] = { ...jsonData[index], ...updatedBox };
    await writeJsonFile(DB_PATH, jsonData);
    res.status(200).send("Data updated successfully");
  } catch (error) {
    errorHandler(res, error);
  }
});

app.delete("/api/delete/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const jsonData = await readJsonFile(DB_PATH);
    const index = jsonData.findIndex((box) => box.id === id);
    if (index === -1) {
      return errorHandler(res, "Item not found", 404);
    }

    jsonData.splice(index, 1);
    await writeJsonFile(DB_PATH, jsonData);
    res.status(200).send("Data deleted successfully");
  } catch (error) {
    errorHandler(res, error);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
