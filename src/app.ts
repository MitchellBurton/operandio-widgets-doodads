import express, {
  json,
  urlencoded,
  type Response as Response,
  type Request as Request,
} from "express";

import { RegisterRoutes } from "../generated/routes";
import swaggerUi from "swagger-ui-express";

const app = express();

// Use body parser to read sent json payloads
app.use(
  urlencoded({
    extended: true,
  })
);
app.use(json());

RegisterRoutes(app);

app.use("/docs", swaggerUi.serve, async (_req: Request, res: Response) => {
  const swaggerDocument = await import("../generated/openapi.json", {
    assert: { type: "json" },
  });
  console.log("swaggerDocument", swaggerDocument.default);
  res.send(swaggerUi.generateHTML(swaggerDocument.default));
});

const port = 9000;
express().use("/", app).listen(port);
console.info(`listening on http://localhost:${port}`);
