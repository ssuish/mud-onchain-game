import {
  Has,
  defineEnterSystem,
  defineSystem,
  defineExitSystem,
  getComponentValueStrict,
} from "@latticexyz/recs";
import { PhaserLayer } from "../createPhaserLayer";
import {
  pixelCoordToTileCoord,
  tileCoordToPixelCoord,
} from "@latticexyz/phaserx";
import { TILE_WIDTH, TILE_HEIGHT, Animations, Directions } from "../constants";

function decodeHexString(hexString: string): [number, number] {
  const cleanHex = hexString.slice(2);
  const firstHalf = cleanHex.slice(0, cleanHex.length / 2);
  const secondHalf = cleanHex.slice(cleanHex.length / 2);
  return [parseInt(firstHalf, 16), parseInt(secondHalf, 16)];
}

export const createGameSystem = (layer: PhaserLayer) => {
  const {
    world,
    networkLayer: {
      components: { PlayerPosition, CoinPosition },
      systemCalls: { spawn, move, generateCoins },
    },
    scenes: {
      Main: { objectPool, input },
    },
  } = layer;

  input.pointerdown$.subscribe((event) => {
    const x = event.pointer.worldX;
    const y = event.pointer.worldY;
    const playerPosition = pixelCoordToTileCoord(
      { x, y },
      TILE_WIDTH,
      TILE_HEIGHT
    );
    if (playerPosition.x == 0 && playerPosition.y == 0) return;
    spawn(playerPosition.x, playerPosition.y);
  });

  input.onKeyPress(
    (keys) => keys.has("W"),
    () => {
      move(Directions.UP);
    }
  );

  input.onKeyPress(
    (keys) => keys.has("S"),
    () => {
      move(Directions.DOWN);
    }
  );

  input.onKeyPress(
    (keys) => keys.has("A"),
    () => {
      move(Directions.LEFT);
    }
  );

  input.onKeyPress(
    (keys) => keys.has("D"),
    () => {
      move(Directions.RIGHT);
    }
  );

  input.onKeyPress(
    (keys) => keys.has("I"),
    () => {
      generateCoins();
    }
  );

  defineEnterSystem(world, [Has(PlayerPosition)], ({ entity }) => {
    const playerObj = objectPool.get(entity, "Sprite");
    playerObj.setComponent({
      id: "animation",
      once: (sprite) => {
        sprite.play(Animations.Player);
      },
    });
  });

  defineEnterSystem(world, [Has(CoinPosition)], ({ entity }) => {
    const coinObj = objectPool.get(entity, "Sprite");
    coinObj.setComponent({
      id: "animation",
      once: (sprite) => {
        sprite.play(Animations.Coin);
      },
    });
  });

  defineSystem(world, [Has(PlayerPosition)], ({ entity }) => {
    const playerPosition = getComponentValueStrict(PlayerPosition, entity);
    const pixelPosition = tileCoordToPixelCoord(
      playerPosition,
      TILE_WIDTH,
      TILE_HEIGHT
    );

    const playerObj = objectPool.get(entity, "Sprite");

    playerObj.setComponent({
      id: "position",
      once: (sprite) => {
        sprite.setPosition(pixelPosition.x, pixelPosition.y);
      },
    });
  });

  defineSystem(world, [Has(CoinPosition)], ({ entity }) => {
    const [coinX, coinY] = decodeHexString(entity);

    const coinExists = getComponentValueStrict(CoinPosition, entity).exist;
    const pixelPosition = tileCoordToPixelCoord(
      { x: coinX, y: coinY },
      TILE_WIDTH,
      TILE_HEIGHT
    );

    const coinObj = objectPool.get(entity, "Sprite");

    if (coinExists) {
      coinObj.setComponent({
        id: "position",
        once: (sprite) => {
          sprite.setPosition(pixelPosition.x, pixelPosition.y);
        },
      });
    } else {
      objectPool.remove(entity);
    }
  });
};
