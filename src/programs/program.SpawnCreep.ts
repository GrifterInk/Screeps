import { CreepMemory } from "interfaces/interface.CreepMemory";
import { Butler } from "controllers/controller.Butler";
import { SpawnPoints } from "constants/array.SpawnPoints";
import { Roles } from "constants/enum.Roles";
import { Upgrader } from "controllers/controller.Upgrader";
import { Builder } from "controllers/controller.Builder";
import { Paver } from "controllers/controller.Paver";
import { Mason } from "controllers/controller.Mason";

export class programSpawnCreep {
    constructor() {
    }

    Run() {
        var builders = _.filter(Game.creeps, (creep) => (creep.memory as CreepMemory).Role == Roles.Builder);

        SpawnPoints.forEach(spawnPoint => {
            let butler: Butler = new Butler();
            let upgrader: Upgrader = new Upgrader();
            let builder: Builder = new Builder();
            let paver: Paver = new Paver();
            let mason: Mason = new Mason();

            if (butler.NeedToSpawn(spawnPoint)) {
                butler.Spawn(spawnPoint);
            }
            else if (upgrader.NeedToSpawn(spawnPoint)) {
                upgrader.Spawn(spawnPoint);
            }
            else if (builder.NeedToSpawn(spawnPoint)){
                builder.Spawn(spawnPoint);
            }
            else if (paver.NeedToSpawn(spawnPoint)){
                paver.Spawn(spawnPoint);
            }
            else if (mason.NeedToSpawn(spawnPoint)){
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
        });
    }
};
