import "dotenv/config";

import "./infra/database";

import { app } from "./app";
import { port } from "./config/env";

app.listen(port, () =>
  console.log(`Server is running on http://localhost:${port}`)
);
