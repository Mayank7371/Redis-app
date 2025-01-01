const express = require("express");
const axios = require("axios").default;
const client = require("./client.js");
const { log } = require("node:console");

const app = express();
const port = 3000;
app.get("/", async (req, res) => {
  const cacheValue = await client.get("todos");
  if (cacheValue) return res.json(cacheValue);
  const { data } = await axios.get(
    "https://jsonplaceholder.typicode.com/todos/"
  );
  await client.set("todos", JSON.stringify(data));
  await client.expire("todos", 30);
  return res.send(data);
});
app.get("/", () => {});
app.get("/", () => {});
app.listen(port, () => {
  console.log(`app is running on port no ${port}`);
});
