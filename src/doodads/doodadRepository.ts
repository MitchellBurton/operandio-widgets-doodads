import { DoodadCreateBody } from "./doodadModels";
import { UUID } from "../lib/types";
import { v4 as uuidv4 } from "uuid";

interface DoodadDBModel {
  id: UUID;
  name: string;
  description: string;
  image: string;
  price: number;
}

interface DoodadDB {
  [key: string]: DoodadDBModel;
}

const doodadDB: DoodadDB = {
  "8e7dd84a-066d-48f8-9ea8-cab94e50556d": {
    id: "8e7dd84a-066d-48f8-9ea8-cab94e50556d",
    name: "doodad",
    description: "A widget",
    image: "https://an.image.url",
    price: 10,
  },
  "d97db27a-71cc-4022-abf1-01ebf9033caa": {
    id: "d97db27a-71cc-4022-abf1-01ebf9033caa",
    name: "doodad2",
    description: "A widget2",
    image: "https://an.image.url",
    price: 20,
  },
};

/**
 * Retrieves a doodad by its unique identifier.
 *
 * @param id - The unique identifier of the doodad to retrieve.
 * @returns The doodad object if found, otherwise `null`.
 */
export const findDoodadById = (id: string) => {
  const doodad = doodadDB[id];
  if (doodad) {
    return doodad;
  }
  return null;
};

/**
 * Retrieves a subset of doodads from the doodad database based on the specified offset and limit.
 *
 * @param offset - The starting index from which to retrieve doodads.
 * @param limit - The maximum number of doodads to retrieve.
 * @returns An array of doodads within the specified range.
 *
 */
export const findAllDoodads = (offset: number, limit: number) => {
  const doodads = Object.values(doodadDB)
    // Sort by id to ensure consistent ordering.
    .sort((a, b) => a.id.localeCompare(b.id))
    // Apply offset and limit for pagination.
    .slice(offset, offset + limit);
  return doodads;
};

/**
 * Finds doodads by their name from the doodad database.
 *
 * @param name - The name or partial name of the doodads to search for.
 * @param offset - The starting index for the search results.
 * @param limit - The maximum number of doodads to return.
 * @returns An array of doodads that match the specified name, limited by the offset and limit.
 */
export const findDoodadsByName = (
  name: string,
  offset: number,
  limit: number
) => {
  const doodads = Object.values(doodadDB)
    .filter((doodad) => doodad.name.includes(name))
    // Sort by id to ensure consistent ordering.
    .sort((a, b) => a.id.localeCompare(b.id))
    // Apply offset and limit for pagination.
    .slice(offset, offset + limit);
  return doodads;
};

/**
 * Creates a new doodad and assigns it a unique identifier.
 *
 * @param doodad An object representing the doodad to be created, excluding the `id` property.
 * @returns The newly created doodad, including its generated `id`.
 */
export const createDoodad = (doodad: DoodadCreateBody): DoodadDBModel => {
  // Simulate saving to a database by adding it to the in-memory object.
  // We are using a Guid for the id, so can assume no conflicts.
  // The the real world, we would let the DB handle it.
  const newDoodad: DoodadDBModel = { ...doodad, id: uuidv4() };
  doodadDB[newDoodad.id] = newDoodad;
  return newDoodad;
};

/**
 * Updates an existing doodad in the database with the provided partial data.
 *
 * @param id - The unique identifier of the doodad to update.
 * @param doodad - A partial object containing the properties to update in the doodad.
 * @returns The updated doodad object if the doodad exists, or `null` if no doodad with the given ID is found.
 */
export const updateDoodad = (id: string, doodad: Partial<DoodadDBModel>) => {
  const existingDoodad = doodadDB[id];
  if (!existingDoodad) {
    return null;
  }
  const updatedDoodad = { ...existingDoodad, ...doodad };
  doodadDB[id] = updatedDoodad;
  return updatedDoodad;
};
