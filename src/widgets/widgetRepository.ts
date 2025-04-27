import { v4 as uuidv4 } from "uuid";
import type { UUID } from "../lib/types";
import type { WidgetCreateBody } from "./widgetModels";

interface WidgetDBModel {
  id: UUID;
  name: string;
  description: string;
  image: string;
}

interface WidgetDB {
  [key: string]: WidgetDBModel;
}

const widgetDB: WidgetDB = {
  "8e7dd84a-066d-48f8-9ea8-cab94e50556d": {
    id: "8e7dd84a-066d-48f8-9ea8-cab94e50556d",
    name: "widget",
    description: "A widget",
    image: "https://an.image.url",
  },
  "d97db27a-71cc-4022-abf1-01ebf9033caa": {
    id: "d97db27a-71cc-4022-abf1-01ebf9033caa",
    name: "widget2",
    description: "A widget2",
    image: "https://an.image.url",
  },
};

/**
 * Retrieves a widget by its unique identifier.
 *
 * @param id - The unique identifier of the widget to retrieve.
 * @returns The widget object if found, otherwise `null`.
 */
export const findWidgetById = (id: string) => {
  const widget = widgetDB[id];
  if (widget) {
    return widget;
  }
  return null;
};

/**
 * Retrieves a subset of widgets from the widget database based on the specified offset and limit.
 *
 * @param offset - The starting index from which to retrieve widgets.
 * @param limit - The maximum number of widgets to retrieve.
 * @returns An array of widgets within the specified range.
 *
 */
export const findAllWidgets = (offset: number, limit: number) => {
  const widgets = Object.values(widgetDB)
    // Sort by id to ensure consistent ordering.
    .sort((a, b) => a.id.localeCompare(b.id))
    // Apply offset and limit for pagination.
    .slice(offset, offset + limit);
  return widgets;
};

/**
 * Finds widgets by their name from the widget database.
 *
 * @param name - The name or partial name of the widgets to search for.
 * @param offset - The starting index for the search results.
 * @param limit - The maximum number of widgets to return.
 * @returns An array of widgets that match the specified name, limited by the offset and limit.
 */
export const findWidgetsByName = (name: string, offset: number, limit: number) => {
  const widgets = Object.values(widgetDB)
    .filter((widget) => widget.name.includes(name))
    // Sort by id to ensure consistent ordering.
    .sort((a, b) => a.id.localeCompare(b.id))
    // Apply offset and limit for pagination.
    .slice(offset, offset + limit);
  return widgets;
};

/**
 * Creates a new widget and assigns it a unique identifier.
 *
 * @param widget - An object representing the widget to be created, excluding the `id` property.
 * @returns The newly created widget, including its generated `id`.
 */
export const createWidget = (widget: WidgetCreateBody): WidgetDBModel => {
  // Simulate saving to a database by adding it to the in-memory object.
  // We are using a Guid for the id, so can assume no conflicts.
  // The the real world, we would let the DB handle it.
  const newWidget: WidgetDBModel = { ...widget, id: uuidv4() };
  widgetDB[newWidget.id] = newWidget;
  return newWidget;
};

/**
 * Updates an existing widget in the database with the provided partial data.
 *
 * @param id - The unique identifier of the widget to update.
 * @param widget - A partial object containing the properties to update in the widget.
 * @returns The updated widget object if the widget exists, or `null` if no widget with the given ID is found.
 */
export const updateWidget = (id: string, widget: Partial<WidgetDBModel>) => {
  const existingWidget = widgetDB[id];
  if (!existingWidget) {
    return null;
  }
  const updatedWidget = { ...existingWidget, ...widget };
  widgetDB[id] = updatedWidget;
  return updatedWidget;
};

/**
 * Removes a widget from the widget database by its ID.
 *
 * @param id - The unique identifier of the widget to be removed.
 * @returns A boolean indicating whether the widget was successfully removed.
 *          Returns `true` if the widget existed and was removed, otherwise `false`.
 */
export const deleteWidget = (id: string) => {
  const widget = widgetDB[id];
  if (widget) {
    delete widgetDB[id];
    return true;
  }
  return false;
};
