import { Controller, Get, Path, Route } from "tsoa";

interface Widget {
  id: string;
  name: string;
  description: string;
  image: string;
}

@Route("widgets")
export class WidgetsController extends Controller {
  @Get("{widgetId}")
  public async getWidget(@Path() widgetId: string): Promise<Widget> {
    return {
      id: widgetId,
      name: "widget",
      description: "A widget",
      image: "https://an.image.url",
    };
  }
}
