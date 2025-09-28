import { defineWorld } from "@latticexyz/world";

export default defineWorld({
  namespace: "app",
  enums: {
    Direction: [
      "Up",
      "Down",
      "Left",
      "Right",
    ]
  },
  tables: {
    PlayerPosition: {
      schema: {
        player: "address",
        x: "int32",
        y: "int32",
      },
      key: ["player"],
    },
    CoinPosition: {
      schema: {
        x: "int32",
        y: "int32",
        exist: "bool",
      },
      key: ["x", "y"]
    },
    PlayerCoins: {
      schema: {
        player: "address",
        amount: "int32"
      },
      key: ["player"],
    }
  },
});
