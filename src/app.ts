import express, { json, urlencoded, type Response, type Request, type NextFunction } from "express";

import swaggerUi from "swagger-ui-express";
import { ValidateError } from "tsoa";
import { RegisterRoutes } from "../generated/routes";

const app = express();

// Use body parser to read sent json payloads
app.use(
  urlencoded({
    extended: true,
  }),
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

/**
 * Handles errors that occur during request processing in an Express application.
 *
 * @param err - The error object, which can be of any type. Typically, it is an instance of `ValidateError` or `Error`.
 * @param req - The Express `Request` object representing the HTTP request.
 * @param res - The Express `Response` object used to send the HTTP response.
 * @param next - The Express `NextFunction` used to pass control to the next middleware.
 * @returns A JSON response with an appropriate HTTP status code and error message, or calls the `next` middleware if no error is handled.
 *
 * @remarks
 * - If the error is an instance of `ValidateError`, it returns a 422 status code with validation details.
 * - If the error is an instance of `Error`:
 *   - If the error type is `entity.parse.failed`, it returns a 400 status code with an "Invalid JSON" message.
 *   - Otherwise, it returns a 500 status code with an "Internal Server Error" message.
 * - If the error does not match any known type, the `next` middleware is called.
 */
// biome-ignore lint/suspicious/noConfusingVoidType: This fits the types of express middleware.
function errorHandler(err: unknown, req: Request, res: Response, next: NextFunction): Response | void {
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

    // biome-ignore lint/suspicious/noExplicitAny: These error object may have a type property set on them, and we need to check it.
    if ((err as any).type === "entity.parse.failed") {
      // If the error is a JSON parse error, return a 400.
      return res.status(400).json({
        message: "Invalid JSON",
      });
    }

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }

  next();
}

// Register the error handler middleware
app.use(errorHandler as express.ErrorRequestHandler);

const port = 9000;
express().use("/", app).listen(port);
console.info(`listening on http://localhost:${port}`);
