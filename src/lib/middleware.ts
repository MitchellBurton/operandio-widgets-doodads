import { type Response, type Request, type NextFunction } from "express";

export async function authorizerMiddleware(
  _req: Request,
  _res: Response,
  next: NextFunction
) {
  // In a real world scenario, we would could do some auth here.
  // For example, check the JWT token in the header and set the user in the request object.
  next();
}
