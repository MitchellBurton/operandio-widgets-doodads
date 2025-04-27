import {
  Body,
  Controller,
  Get,
  Middlewares,
  Patch,
  Path,
  Post,
  Query,
  Res,
  Route,
  Tags,
  type TsoaResponse,
} from "tsoa";
import { authorizerMiddleware } from "../lib/middleware";
import type { Int, UUID } from "../lib/types";
import type { Doodad, DoodadCreateBody, DoodadUpdateBody } from "./doodadModels";
import { createDoodad, findAllDoodads, findDoodadById, findDoodadsByName, updateDoodad } from "./doodadRepository";

@Route("doodads")
@Tags("Doodads")
@Middlewares(authorizerMiddleware)
export class DoodadsController extends Controller {
  /**
   * Retrieves a doodad by its unique identifier.
   * @param doodadId The unique identifier of the doodad to retrieve.
   */
  @Get("{doodadId}")
  public async getDoodad(
    @Path() doodadId: UUID,
    @Res() notFoundResponse: TsoaResponse<404, { reason: string }>,
  ): Promise<Doodad> {
    const doodad = findDoodadById(doodadId);
    if (doodad) {
      return doodad;
    }

    // doodad is not found, 404.
    return notFoundResponse(404, { reason: "Doodad not found" });
  }

  /**
   * Retrieves list of all doodads.
   * @param limit The maximum number of doodads to retrieve.
   * @param offset The number of doodads to skip before starting to collect the result set.
   * @param name The name of the doodads to search for.
   */
  @Get()
  public async getDoodads(
    @Query() limit: Int = 10,
    @Query() offset: Int = 0,
    @Query() name?: string,
  ): Promise<Doodad[]> {
    // We are just using simple offset pagination here.
    // In a real API we would need to consider the consumer and the use cases to figure out the best pagination strategy.
    let doodads: Doodad[] = [];
    if (name) {
      doodads = findDoodadsByName(name, offset, limit);
    } else {
      doodads = findAllDoodads(offset, limit);
    }
    return doodads;
  }

  /**
   * Creates a new doodad.
   */
  @Post()
  public async createDoodad(@Body() requestBody: DoodadCreateBody): Promise<Doodad> {
    // The tsoa validator will check that the request body is valid.
    return createDoodad(requestBody);
  }

  /**
   * Updates an existing doodad.
   * @param doodadId The unique identifier of the doodad to update.
   * @param requestBody The updated doodad data.
   */
  @Patch("{doodadId}")
  public async updateDoodad(
    @Path() doodadId: UUID,
    @Body() requestBody: DoodadUpdateBody,
    @Res() notFoundResponse: TsoaResponse<404, { reason: string }>,
  ): Promise<Doodad> {
    const doodad = updateDoodad(doodadId, requestBody);
    if (doodad) {
      return doodad;
    }
    // doodad is not found, 404.
    return notFoundResponse(404, { reason: "Doodad not found" });
  }
}
