import express from "express";
import fs from "fs";
import path from "path";
import bodyParser from "body-parser";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 3000;
const dbPath = path.join(__dirname, "public", "db.json");

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

app.listen(PORT, () => {
  console.log(` http://localhost:${PORT}에서 서버가 실행중입니다.`);
});
