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
const dbPath = path.join(__dirname, "public", "db.json");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/api/save", (req, res) => {
  const newBox = req.body;
  fs.readFile(dbPath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).send("Error reading db.json");
    }

    let jsonData = [];
    try {
      jsonData = JSON.parse(data);
    } catch (parseErr) {
      return res.status(500).send("Error parsing db.json");
    }

    jsonData.push(newBox);

    fs.writeFile(dbPath, JSON.stringify(jsonData, null, 2), (err) => {
      if (err) {
        return res.status(500).send("Error writing to db.json");
      }

      res.status(200).send("Data saved successfully");
    });
  });
});

app.put("/api/update/:id", (req, res) => {
  const id = req.params.id;
  const updatedBox = req.body;

  fs.readFile(dbPath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).send("Error reading db.json");
    }

    let jsonData = [];
    try {
      jsonData = JSON.parse(data);
    } catch (parseErr) {
      return res.status(500).send("Error parsing db.json");
    }

    const index = jsonData.findIndex((box) => box.id === id);
    if (index === -1) {
      return res.status(404).send("Item not found");
    }

    jsonData[index] = { ...jsonData[index], ...updatedBox };

    fs.writeFile(dbPath, JSON.stringify(jsonData, null, 2), (err) => {
      if (err) {
        return res.status(500).send("Error writing to db.json");
      }

      res.status(200).send("Data updated successfully");
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
