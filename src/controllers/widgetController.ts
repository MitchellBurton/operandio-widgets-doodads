import { UUID } from "../lib/types";
import { findById } from "../repositories/widgetRepository";
import { Controller, Get, Path, Res, Route, TsoaResponse } from "tsoa";

/**
 * Represents a widget with its associated properties.
 */
interface Widget {
  /** The unique identifier for the widget. */
  id: UUID;
  /** The name of the widget. */
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
    const widget = findById(widgetId);
    if (widget) {
      return widget;
    }

    // Widget is not found, 404.
    return notFoundResponse(404, { reason: "Widget not found" });
  }
  // TODO: Implement the create, list, and update methods
}
