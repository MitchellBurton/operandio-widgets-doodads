import { UUID } from "../lib/types";
import { createWidget, findWidgetById } from "../repositories/widgetRepository";
import {
  Body,
  Controller,
  Get,
  Path,
  Post,
  Res,
  Route,
  TsoaResponse,
} from "tsoa";
import { Widget, WidgetCreateBody } from "../models/widget";

@Route("widgets")
export class WidgetsController extends Controller {
  /**
   * Retrieves a widget by its unique identifier.
   * @param widgetId The unique identifier of the widget to retrieve.
   */
  @Get("{widgetId}")
  public async getWidget(
    @Path() widgetId: UUID,
    @Res() notFoundResponse: TsoaResponse<404, { reason: string }>
  ): Promise<Widget> {
    const widget = findWidgetById(widgetId);
    if (widget) {
      return widget;
    }

    // Widget is not found, 404.
    return notFoundResponse(404, { reason: "Widget not found" });
  }

  /**
   * Creates a new widget.
   */
  @Post()
  public async createWidget(
    @Body() requestBody: WidgetCreateBody
  ): Promise<Widget> {
    // The tsoa validator will check that the request body is valid.
    return createWidget(requestBody);
  }

  // TODO: Implement the list, and update methods
}
