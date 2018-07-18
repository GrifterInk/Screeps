import { CreepMemory } from "interfaces/interface.CreepMemory";
import { Roles } from "constants/enum.Roles";
import { ButlerAttributes } from "attributes/class.ButlerAttributes";
import { UpgraderAttributes } from "attributes/class.UpgraderAttributes";
import { CreepSizes } from "constants/enum.CreepSizes";

export class CreepSpawner {
    constructor() {
    }

    static SpawnProperSizedCreep(spawnPoint: string, creepName: string, creepMemory: CreepMemory, creepRole: Roles) {
        let creepAttributes = this.getCreepAttributes(creepRole);

        if (creepAttributes) {
            if (Game.spawns[spawnPoint].spawnCreep(creepAttributes.Mega, "Mega-" + creepName, { memory: creepMemory, dryRun: true }) == 0) {
                console.log('Spawning new Mega Sized ' + creepRole + ': ' + "Mega-" + creepName);
                creepMemory.CurrentSize = CreepSizes.Mega;
                creepMemory.CurrentWorth = creepAttributes.MegaWorth;
                Game.spawns[spawnPoint].spawnCreep(creepAttributes.Mega, "Mega-" + creepName, { memory: creepMemory });
            }
            else if (Game.spawns[spawnPoint].spawnCreep(creepAttributes.Jumbo, "Jumbo-" + creepName, { memory: creepMemory, dryRun: true }) == 0) {
                console.log('Spawning new Jumbo Sized ' + creepRole + ': ' + "Jumbo-" + creepName);
                creepMemory.CurrentSize = CreepSizes.Jumbo;
                creepMemory.CurrentWorth = creepAttributes.JumboWorth;
                Game.spawns[spawnPoint].spawnCreep(creepAttributes.Jumbo, "Jumbo-" + creepName, { memory: creepMemory });
            }
            else if (Game.spawns[spawnPoint].spawnCreep(creepAttributes.Large, "Large-" + creepName, { memory: creepMemory, dryRun: true }) == 0) {
                console.log('Spawning new Large Sized ' + creepRole + ': ' + "Large-" + creepName);
                creepMemory.CurrentSize = CreepSizes.Large;
                creepMemory.CurrentWorth = creepAttributes.LargeWorth;
                Game.spawns[spawnPoint].spawnCreep(creepAttributes.Large, "Large-" + creepName, { memory: creepMemory });
            }
            else if (Game.spawns[spawnPoint].spawnCreep(creepAttributes.Medium, "Medium-" + creepName, { memory: creepMemory, dryRun: true }) == 0) {
                console.log('Spawning new Medium Sized ' + creepRole + ': ' + "Medium-" + creepName);
                creepMemory.CurrentSize = CreepSizes.Medium;
                creepMemory.CurrentWorth = creepAttributes.MediumWorth;
                Game.spawns[spawnPoint].spawnCreep(creepAttributes.Medium, "Medium-" + creepName, { memory: creepMemory });
            }
            else if (Game.spawns[spawnPoint].spawnCreep(creepAttributes.Small, "Small-" + creepName, { memory: creepMemory, dryRun: true }) == 0) {
                console.log('Spawning new Small Sized ' + creepRole + ': ' + "Small-" + creepName);
                creepMemory.CurrentSize = CreepSizes.Small;
                creepMemory.CurrentWorth = creepAttributes.SmallWorth;
                Game.spawns[spawnPoint].spawnCreep(creepAttributes.Small, "Small-" + creepName, { memory: creepMemory });
            }
            else if (Game.spawns[spawnPoint].spawnCreep(creepAttributes.Tiny, "Tiny-" + creepName, { memory: creepMemory, dryRun: true }) == 0) {
                console.log('Spawning new Tiny Sized ' + creepRole + ': ' + "Tiny-" + creepName);
                creepMemory.CurrentSize = CreepSizes.Tiny;
                creepMemory.CurrentWorth = creepAttributes.TinyWorth;
                Game.spawns[spawnPoint].spawnCreep(creepAttributes.Tiny, "Tiny-" + creepName, { memory: creepMemory });
            }
            else if (Game.spawns[spawnPoint].spawnCreep(creepAttributes.Mini, "Mini-" + creepName, { memory: creepMemory, dryRun: true }) == 0) {
                console.log('Spawning new Mini Sized ' + creepRole + ': ' + "Mini-" + creepName);
                creepMemory.CurrentSize = CreepSizes.Mini;
                creepMemory.CurrentWorth = creepAttributes.MiniWorth;
                Game.spawns[spawnPoint].spawnCreep(creepAttributes.Mini, "Mini-" + creepName, { memory: creepMemory });
            }
        }
    }

    private static getCreepAttributes(creepRole: Roles) {
        if (creepRole == Roles.Butler) {
            let butlerAttributes: ButlerAttributes = new ButlerAttributes();

            return butlerAttributes;
        }
        else if (creepRole == Roles.Upgrader) {
            let upgraderAttributes: UpgraderAttributes = new UpgraderAttributes();

            return upgraderAttributes;
        }

        return undefined;
    }
}
