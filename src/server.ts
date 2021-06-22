import express from "express";

const app = express();

app.use(express.json());

app.get("/", (req, res) => res.json({ success: true, message: "Hello NLW!" }));

app.listen(3333, () =>
  console.log("Server is running on http://localhost:3333")
);
