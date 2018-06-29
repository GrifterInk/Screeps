import { ErrorMapper } from "utils/ErrorMapper";
import { programClearMemory } from "programs/program.ClearMemory";
import { programSpawnCreep } from "programs/program.SpawnCreep";
import { programMapActions } from "programs/program.MapActions";

// When compiling TS to JS and bundling with rollup, the line numbers and file names in error messages change
// This utility uses source maps to get the line numbers and file names of the original, TS source code
export const loop = ErrorMapper.wrapLoop(() => {
  //console.log(`Current game tick is ${Game.time}`);

  let clearMemory: programClearMemory = new programClearMemory();
  let spawnCreep: programSpawnCreep = new programSpawnCreep();
  let mapActions: programMapActions = new programMapActions();

  clearMemory.Run();

  spawnCreep.Run();

  mapActions.Run();
});
