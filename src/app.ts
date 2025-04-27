import express, {
  json,
  urlencoded,
  type Response as Response,
  type Request as Request,
  NextFunction,
} from "express";

import { RegisterRoutes } from "../generated/routes";
import swaggerUi from "swagger-ui-express";
import { ValidateError } from "tsoa";

const app = express();

// Use body parser to read sent json payloads
app.use(
  urlencoded({
    extended: true,
  })
);
app.use(json());

RegisterRoutes(app);

// Serve the pre-generated OpenAPI spec at /docs
// Could also grab the spec from the build process and deploy it to a static host.
app.use("/docs", swaggerUi.serve, async (_req: Request, res: Response) => {
  const swaggerDocument = await import("../generated/openapi.json", {
    assert: { type: "json" },
  });
  console.log("swaggerDocument", swaggerDocument.default);
  res.send(swaggerUi.generateHTML(swaggerDocument.default));
});

app.use(function errorHandler(
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
): Response | void {
  // The request failed schema validation, but we need to return a nice message rather than the stack trace.
  if (err instanceof ValidateError) {
    console.warn(`Caught Validation Error for ${req.path}:`, err.fields);
    return res.status(422).json({
      message: "Validation Failed",
      details: err?.fields,
    });
  }

  // Some other, unknown error, just return a 500.
  // This is a good place to log the error to your error tracking service.
  if (err instanceof Error) {
    console.error("Caught Error for", req.path, err);

    // If the error is a JSON parse error, return a 400.
    if ((err as any).type === "entity.parse.failed") {
      return res.status(400).json({
        message: "Invalid JSON",
      });
    }

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }

  next();
} as express.ErrorRequestHandler);

const port = 9000;
express().use("/", app).listen(port);
console.info(`listening on http://localhost:${port}`);
