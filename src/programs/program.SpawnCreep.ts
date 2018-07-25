import { CreepMemory } from "interfaces/interface.CreepMemory";
import { Butler } from "controllers/controller.Butler";
import { SpawnPoints } from "constants/array.SpawnPoints";
import { Roles } from "constants/enum.Roles";
import { Upgrader } from "controllers/controller.Upgrader";
import { Builder } from "controllers/controller.Builder";
import { Paver } from "controllers/controller.Paver";
import { Mason } from "controllers/controller.Mason";
import { RoomMemory } from "interfaces/interface.RoomMemory";

export class programSpawnCreep {
    constructor() {
    }

    Run() {
        SpawnPoints.forEach(spawnPoint => {
            let butler: Butler = new Butler();
            let upgrader: Upgrader = new Upgrader();
            let builder: Builder = new Builder();
            let paver: Paver = new Paver();
            let mason: Mason = new Mason();

            //Note: Call each of the NeedToSpawn's in order to populate ALL memory -
            //      without this, only the ones that need to actually spawn and above get called / populated
            let butlerNeedToSpawn = butler.NeedToSpawn(spawnPoint);
            let upgraderNeedToSpawn = upgrader.NeedToSpawn(spawnPoint);
            let builderNeedToSpawn = builder.NeedToSpawn(spawnPoint);
            let paverNeedToSpawn = paver.NeedToSpawn(spawnPoint);
            let masonNeedToSpawn = mason.NeedToSpawn(spawnPoint);


            //Only spawn creeps if we're under current max value
            var creeps = _.filter(Game.creeps);

            if (creeps.length < (Game.spawns[spawnPoint].room.memory as RoomMemory).CurrentMaxCreeps) {
                if (butlerNeedToSpawn) {
                    butler.Spawn(spawnPoint);
                }
                else if (upgraderNeedToSpawn) {
                    upgrader.Spawn(spawnPoint);
                }
                else if (builderNeedToSpawn) {
                    builder.Spawn(spawnPoint);
                }
                else if (paverNeedToSpawn) {
                    paver.Spawn(spawnPoint);
                }
                else if (masonNeedToSpawn) {
                    mason.Spawn(spawnPoint);
                }

                if (Game.spawns[spawnPoint].spawning) {
                    var spawningCreep = Game.creeps[(Game.spawns[spawnPoint].spawning as any).name];
                    Game.spawns[spawnPoint].room.visual.text(
                        '🛠️' + (spawningCreep.memory as CreepMemory).Role,
                        Game.spawns[spawnPoint].pos.x + 1,
                        Game.spawns[spawnPoint].pos.y, { align: 'left', opacity: 0.8 }
                    );
                }
            }
            else{
                //console.log("Self Imposed Max Creep Limit is currently hit!  No new creeps will spawn!");
            }
        });
    }
};
