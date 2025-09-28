import { PhaserLayer } from "../createPhaserLayer";
import { createCamera } from "./createCamera";
import { createMapSystem } from "./createMapSystem";
import { createGameSystem } from "./gameSystem";

export const registerSystems = (layer: PhaserLayer) => {
  createCamera(layer);
  createMapSystem(layer);
  createGameSystem(layer);
};
