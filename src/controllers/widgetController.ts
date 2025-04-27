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

/**
 * Represents a widget with its associated properties.
 */
interface Widget {
  /** The unique identifier for the widget. */
  id: UUID;
  /**
   * The name of the widget.
   * @minLength 1 Widget names must be at least 1 character long.
   */
  name: string;
  /** A brief description of the widget. */
  description: string;
  /** A URL for the widget's image. */
  image: string;
}

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
  // TODO: Implement the list, and update methods

  @Post()
  public async createWidget(
    @Body() requestBody: Omit<Widget, "id">
  ): Promise<Widget> {
    // The tsoa validator will check that the request body is valid.
    return createWidget(requestBody);
  }
}
