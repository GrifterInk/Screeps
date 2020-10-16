import { CreepMemory } from "interfaces/interface.CreepMemory";
import { SpawnPoints } from "constants/array.SpawnPoints";
import { InitializedRoles } from "constants/array.InitializedRole";
import { RoomMemory } from "interfaces/interface.RoomMemory";

export class programSpawnCreep {
    constructor() {
    }

    Run() {
        SpawnPoints.forEach(spawnPoint => {
            //Only spawn creeps if we're under current max value
            var creeps = _.filter(Game.creeps);
            let spawnInProgress: boolean = false;

            if (creeps.length < (Game.spawns[spawnPoint].room.memory as RoomMemory).CurrentMaxCreeps) {
                InitializedRoles.forEach(role => {
                    if (!spawnInProgress && role.NeedToSpawn(spawnPoint)) { //If a creep is already being spawned, don't try to spawn another right away
                        spawnInProgress = true;
                        role.Spawn(spawnPoint);
                    }
                });

                if (Game.spawns[spawnPoint].spawning) {
                    var spawningCreep = Game.creeps[(Game.spawns[spawnPoint].spawning as any).name];
                    Game.spawns[spawnPoint].room.visual.text(
                        '🛠️' + (spawningCreep.memory as CreepMemory).Role,
                        Game.spawns[spawnPoint].pos.x + 1,
                        Game.spawns[spawnPoint].pos.y, { align: 'left', opacity: 0.8 }
                    );
                }
            }
            else {
                //console.log("Self Imposed Max Creep Limit is currently hit!  No new creeps will spawn!");
            }
        });
    }
};
