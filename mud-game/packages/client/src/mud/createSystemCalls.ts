/*
 * Creates components for use by the client.
 *
 * By default it returns the components from setupNetwork.ts, those which are
 * automatically inferred from the mud.config.ts table definitions.
 *
 * However, you can add or override components here as needed. This
 * lets you add user defined components, which may or may not have
 * an onchain component.
 */

import { getComponentValue } from "@latticexyz/recs";
import { ClientComponents } from "./createClientComponents";
import { SetupNetworkResult } from "./setupNetwork";
import { singletonEntity } from "@latticexyz/store-sync/recs";

export type SystemCalls = ReturnType<typeof createSystemCalls>;

export function createSystemCalls(
  /*
   * The parameter list informs TypeScript that:
   *
   * - The first parameter is expected to be a
   *   SetupNetworkResult, as defined in setupNetwork.ts
   *
   *   Out of this parameter, we only care about two fields:
   *   - worldContract (which comes from getContract, see
   *     https://github.com/latticexyz/mud/blob/main/templates/phaser/packages/client/src/mud/setupNetwork.ts#L61-L67).
   *
   *   - waitForTransaction (which comes from syncToRecs, see
   *     https://github.com/latticexyz/mud/blob/main/templates/phaser/packages/client/src/mud/setupNetwork.ts#L75-L81).
   *
   * - From the second parameter, which is a ClientComponent,
   *   we only care about Counter. This parameter comes to use
   *   through createClientComponents.ts, but it originates in
   *   syncToRecs
   *   (https://github.com/latticexyz/mud/blob/main/templates/phaser/packages/client/src/mud/setupNetwork.ts#L75-L81).
   */
  { worldContract, waitForTransaction }: SetupNetworkResult,
  { PlayerPosition, CoinPosition }: ClientComponents
) {
  const spawn = async (x: number, y: number) => {
    const tx = await worldContract.write.app__spawn([x, y]);
    await waitForTransaction(tx);
    return getComponentValue(PlayerPosition, singletonEntity);
  };

  const move = async (direction: number) => {
    const tx = await worldContract.write.app__move([direction]);
    await waitForTransaction(tx);
    return getComponentValue(PlayerPosition, singletonEntity);
  };

  const generateCoins = async () => {
    const tx = await worldContract.write.app__generateCoins();
    await waitForTransaction(tx);
    return getComponentValue(CoinPosition, singletonEntity);
  };

  return {
    spawn,
    move,
    generateCoins,
  };
}
