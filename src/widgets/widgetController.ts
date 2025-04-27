import { Int, UUID } from "../lib/types";
import {
  createWidget,
  findAllWidgets,
  findWidgetById,
  findWidgetsByName,
} from "./widgetRepository";
import {
  Body,
  Controller,
  Get,
  Middlewares,
  Path,
  Post,
  Query,
  Res,
  Route,
  TsoaResponse,
} from "tsoa";
import { Widget, WidgetCreateBody } from "./widgetModels";
import { authorizerMiddleware } from "../lib/middleware";

@Route("widgets")
@Middlewares(authorizerMiddleware)
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
   * Retrieves list of all widgets.
   * @param limit The maximum number of widgets to retrieve.
   * @param offset The number of widgets to skip before starting to collect the result set.
   * @param name The name of the widgets to search for.
   */
  @Get()
  public async getWidgets(
    @Query() limit: Int = 10,
    @Query() offset: Int = 0,
    @Query() name?: string
  ): Promise<Widget[]> {
    // We are just using simple offset pagination here.
    // In a real API we would need to consider the consumer and the use cases to figure out the best pagination strategy.
    let widgets: Widget[] = [];
    if (name) {
      widgets = findWidgetsByName(name, offset, limit);
      return widgets;
    } else {
      widgets = findAllWidgets(offset, limit);
    }
    return widgets;
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

  // TODO: Implement the update method.
}
