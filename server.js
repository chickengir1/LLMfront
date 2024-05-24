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

const DISCORD_CLIENT_ID = "1243369575454867456";
const DISCORD_CLIENT_SECRET = "cpeNbXj6pOHjdVpxbJF1ssh189xkNqbz";
const DISCORD_REDIRECT_URI = "http://localhost:3000/oauth/login";
const DISCORD_SCOPE = "identify email guilds guilds.members.read";

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Utility functions for reading and writing JSON files
const readJsonFile = async (filePath) => {
  try {
    const data = await fs.readFile(filePath, "utf8");
    return JSON.parse(data);
  } catch (err) {
    throw new Error("Error reading JSON file");
  }
};

const writeJsonFile = async (filePath, data) => {
  try {
    await fs.writeFile(filePath, JSON.stringify(data, null, 2));
  } catch (err) {
    throw new Error("Error writing to JSON file");
  }
};

const fetchDiscordToken = async (code) => {
  const data = {
    client_id: DISCORD_CLIENT_ID,
    client_secret: DISCORD_CLIENT_SECRET,
    grant_type: "authorization_code",
    code,
    redirect_uri: DISCORD_REDIRECT_URI,
  };

  const response = await fetch("https://discord.com/api/oauth2/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams(data),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch Discord token");
  }

  return (await response.json()).access_token;
};

const fetchDiscordUser = async (accessToken) => {
  const response = await fetch("https://discord.com/api/users/@me", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch Discord user");
  }

  return await response.json();
};

const fetchUserGuilds = async (accessToken) => {
  const response = await fetch("https://discord.com/api/users/@me/guilds", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch user guilds");
  }

  return await response.json();
};

const fetchGuildMember = async (guildId, userId, accessToken) => {
  const response = await fetch(
    `https://discord.com/api/guilds/${guildId}/members/${userId}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch guild member for guild ID: ${guildId}`);
  }

  return await response.json();
};

const isAdmin = (member) => {
  return member.permissions & 0x00000008; // ADMINISTRATOR 권한 비트 확인
};

const errorHandler = (res, message, statusCode = 500) => {
  res.status(statusCode).send({ error: message });
};

// API routes
app.post("/api/save", async (req, res) => {
  const newBox = req.body;
  try {
    const jsonData = await readJsonFile(DB_PATH);

    jsonData.push(newBox);
    await writeJsonFile(DB_PATH, jsonData);
    res.status(200).send({ message: "Data saved successfully", newBox });
  } catch (error) {
    errorHandler(res, error.message);
  }
});

// Discord OAuth routes
app.get("/auth/discord", (req, res) => {
  const discordAuthUrl = `https://discord.com/api/oauth2/authorize?client_id=${DISCORD_CLIENT_ID}&redirect_uri=${encodeURIComponent(
    DISCORD_REDIRECT_URI
  )}&response_type=code&scope=${encodeURIComponent(DISCORD_SCOPE)}`;
  res.redirect(discordAuthUrl);
});

app.get("/oauth/login", async (req, res) => {
  const code = req.query.code;

  try {
    const accessToken = await fetchDiscordToken(code);
    const user = await fetchDiscordUser(accessToken);
    const guilds = await fetchUserGuilds(accessToken);
    const adminGuilds = [];

    for (const guild of guilds) {
      try {
        const member = await fetchGuildMember(guild.id, user.id, accessToken);
        if (isAdmin(member)) {
          adminGuilds.push(guild);
        }
      } catch (error) {
        console.error(`Error fetching members for guild ${guild.name}:`, error);
      }
    }

    res.redirect(
      `http://localhost:5173/LLMfront/?token=${encodeURIComponent(
        accessToken
      )}&adminGuilds=${encodeURIComponent(JSON.stringify(adminGuilds))}`
    );
  } catch (error) {
    console.error("Error during OAuth process:", error);
    res.status(500).send("Authentication failed");
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
