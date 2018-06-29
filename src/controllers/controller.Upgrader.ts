import { actionSupplyEnergy } from "actions/action.SupplyEnergy";
import { actionUpgrade } from "actions/action.Upgrade";
import { Roles } from "constants/enum.Roles";
import { CreepMemory } from "interfaces/interface.CreepMemory";
import { actionHarvest } from "actions/action.Harvest";
import { UpgraderAttributes } from "attributes/class.UpgraderAttributes";
import { CreepSizes } from "constants/enum.CreepSizes";

export class Upgrader {
    UpgraderAttributes: UpgraderAttributes = new UpgraderAttributes();

    constructor() {
    }

    NeedToSpawn(spawnPoint: string) {
        let currentUpgraderWorth: number = this.getCurrentUpgradersWorth();
        let currentUpgraderNeed: number = this.getCurrentUpgradersNeed(spawnPoint);

        //console.log("Current Upgrader Need: " + currentUpgraderNeed + " / Current Upgrader Worth: " + currentUpgraderWorth);
        if (currentUpgraderNeed > currentUpgraderWorth) {
            console.log("A new Upgrader is needed!")
            return true;
        }

        //console.log("No new Upgraders are necessary at this time")
        return false;
    }

    Spawn(spawnPoint: string) {
        var newName = 'Upgrader_' + Game.time;

        let creepMemory: CreepMemory = { Role: Roles.Upgrader, CurrentAction: "", CurrentEnergySource: -1, CurrentSize: undefined, CurrentWorth: undefined };

        if (Game.spawns[spawnPoint].spawnCreep(this.UpgraderAttributes.Mega, "Mega-" + newName, { memory: creepMemory, dryRun: true }) == 0) {
            console.log('Spawning new Mega Sized Upgrader: ' + "Mega-" + newName);
            creepMemory.CurrentSize = CreepSizes.Mega;
            creepMemory.CurrentWorth = this.UpgraderAttributes.MegaWorth;
            Game.spawns[spawnPoint].spawnCreep(this.UpgraderAttributes.Mega, "Mega-" + newName, { memory: creepMemory });
        }
        else if (Game.spawns[spawnPoint].spawnCreep(this.UpgraderAttributes.Jumbo, "Jumbo-" + newName, { memory: creepMemory, dryRun: true }) == 0) {
            console.log('Spawning new Jumbo Sized Upgrader: ' + "Jumbo-" + newName);
            creepMemory.CurrentSize = CreepSizes.Jumbo;
            creepMemory.CurrentWorth = this.UpgraderAttributes.JumboWorth;
            Game.spawns[spawnPoint].spawnCreep(this.UpgraderAttributes.Jumbo, "Jumbo-" + newName, { memory: creepMemory });
        }
        else if (Game.spawns[spawnPoint].spawnCreep(this.UpgraderAttributes.Large, "Large-" + newName, { memory: creepMemory, dryRun: true }) == 0) {
            console.log('Spawning new Large Sized Upgrader: ' + "Large-" + newName);
            creepMemory.CurrentSize = CreepSizes.Large;
            creepMemory.CurrentWorth = this.UpgraderAttributes.LargeWorth;
            Game.spawns[spawnPoint].spawnCreep(this.UpgraderAttributes.Large, "Large-" + newName, { memory: creepMemory });
        }
        else if (Game.spawns[spawnPoint].spawnCreep(this.UpgraderAttributes.Medium, "Medium-" + newName, { memory: creepMemory, dryRun: true }) == 0) {
            console.log('Spawning new Medium Sized Upgrader: ' + "Medium-" + newName);
            creepMemory.CurrentSize = CreepSizes.Medium;
            creepMemory.CurrentWorth = this.UpgraderAttributes.MediumWorth;
            Game.spawns[spawnPoint].spawnCreep(this.UpgraderAttributes.Medium, "Medium-" + newName, { memory: creepMemory });
        }
        else if (Game.spawns[spawnPoint].spawnCreep(this.UpgraderAttributes.Small, "Small-" + newName, { memory: creepMemory, dryRun: true }) == 0) {
            console.log('Spawning new Small Sized Upgrader: ' + "Small-" + newName);
            creepMemory.CurrentSize = CreepSizes.Small;
            creepMemory.CurrentWorth = this.UpgraderAttributes.SmallWorth;
            Game.spawns[spawnPoint].spawnCreep(this.UpgraderAttributes.Small, "Small-" + newName, { memory: creepMemory });
        }
        else if (Game.spawns[spawnPoint].spawnCreep(this.UpgraderAttributes.Tiny, "Tiny-" + newName, { memory: creepMemory, dryRun: true }) == 0) {
            console.log('Spawning new Tiny Sized Upgrader: ' + "Tiny-" + newName);
            creepMemory.CurrentSize = CreepSizes.Tiny;
            creepMemory.CurrentWorth = this.UpgraderAttributes.TinyWorth;
            Game.spawns[spawnPoint].spawnCreep(this.UpgraderAttributes.Tiny, "Tiny-" + newName, { memory: creepMemory });
        }
        else if (Game.spawns[spawnPoint].spawnCreep(this.UpgraderAttributes.Mini, "Mini-" + newName, { memory: creepMemory, dryRun: true }) == 0) {
            console.log('Spawning new Mini Sized Upgrader: ' + "Mini-" + newName);
            creepMemory.CurrentSize = CreepSizes.Mini;
            creepMemory.CurrentWorth = this.UpgraderAttributes.MiniWorth;
            Game.spawns[spawnPoint].spawnCreep(this.UpgraderAttributes.Mini, "Mini-" + newName, { memory: creepMemory });
        }
    }

    Act(creep: Creep) {
        //Upgrader Actions Priority should be: Harvest / Upgrade
        let supplyEnergy: actionSupplyEnergy = new actionSupplyEnergy();
        let harvest: actionHarvest = new actionHarvest();

        if (harvest.IsNecessary(creep)) {
            harvest.Execute(creep);
        }
        else {
            let upgrade: actionUpgrade = new actionUpgrade();
            upgrade.Execute(creep);
        }
    }


    private getCurrentUpgradersWorth() {
        let currentUpgraderWorth: number = 0;
        var Upgraders = _.filter(Game.creeps, (creep) => (creep.memory as CreepMemory).Role == Roles.Upgrader);

        Upgraders.forEach(creep => {
            if ((creep.memory as CreepMemory).CurrentWorth) {
                currentUpgraderWorth += ((creep.memory as CreepMemory).CurrentWorth as number);
            }
        });

        return currentUpgraderWorth;
    }

    private getCurrentUpgradersNeed(spawnPoint: string) {
        let currentUpgraderNeed: number = 1; // We should always need 1 Upgrader at all times, so start with 1 just to be sure!

        if (Game.spawns[spawnPoint].room.controller) {
            let currentRoomControllerLevel = (Game.spawns[spawnPoint].room.controller as StructureController).level;

            if (currentRoomControllerLevel < 4) {
                currentUpgraderNeed = currentRoomControllerLevel + 1;
            }
            else if (currentRoomControllerLevel < 8) {
                currentUpgraderNeed = currentRoomControllerLevel + 3;
            }
            else if (currentRoomControllerLevel === 8) {
                currentUpgraderNeed = 1; //We only need 1 upgrader at level 8, because we just want to prevent the controller from degrading!
            }
        }

        return currentUpgraderNeed;
    }
};
