import express from "express";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import axios from "axios";

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
  const id = parseInt(req.params.id);
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
  const id = parseInt(req.params.id);

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

app.get("/auth/discord", (req, res) => {
  const clientId = "1243206551972479087";
  const redirectUri = encodeURIComponent(
    "http://localhost:3000/oauth/redirect"
  );
  const scope = encodeURIComponent("identify email");
  const responseType = "code";

  const discordAuthUrl = `https://discord.com/api/oauth2/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=${scope}`;
  res.redirect(discordAuthUrl);
});

app.get("/oauth/redirect", async (req, res) => {
  const code = req.query.code;

  const data = {
    client_id: "1243206551972479087",
    client_secret: "kzCa5IF4OjStANyvqFkuvp-c3poFyb1p",
    grant_type: "authorization_code",
    code: code,
    redirect_uri: "http://localhost:3000/oauth/redirect",
  };

  try {
    const response = await axios.post(
      "https://discord.com/api/oauth2/token",
      new URLSearchParams(data),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const accessToken = response.data.access_token;
    res.redirect(`http://localhost:5173?token=${accessToken}`);
  } catch (error) {
    console.error("Error fetching Discord token:", error);
    res.status(500).send("Authentication failed");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
