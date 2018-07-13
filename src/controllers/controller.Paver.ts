import { Roles } from "constants/enum.Roles";
import { CreepMemory } from "interfaces/interface.CreepMemory";
import { actionHarvest } from "actions/action.Harvest";
import { PaverAttributes } from "attributes/class.PaverAttributes";
import { CreepSizes } from "constants/enum.CreepSizes";
import { actionRepairTower } from "actions/action.RepairTower";
import { actionRepairSpawn } from "actions/action.RepairSpawn";
import { actionRepairExtension } from "actions/action.RepairExtension";
import { actionRepairRoad } from "actions/action.RepairRoad";
import { actionUpgrade } from "actions/action.Upgrade";

export class Paver {
    PaverAttributes: PaverAttributes = new PaverAttributes();

    constructor() {
    }

    NeedToSpawn(spawnPoint: string) {
        let currentPaverWorth: number = this.getCurrentPaversWorth();
        let currentPaverNeed: number = this.getCurrentPaversNeed(spawnPoint);

        //console.log("Current Paver Need: " + currentPaverNeed + " / Current Paver Worth: " + currentPaverWorth);
        if (currentPaverNeed > currentPaverWorth) {
            console.log("A new Paver is needed!")
            return true;
        }

        //console.log("No new Pavers are necessary at this time")
        return false;
    }

    Spawn(spawnPoint: string) {
        var newName = 'Paver_' + Game.time;

        let creepMemory: CreepMemory = { Role: Roles.Paver, CurrentAction: "", CurrentEnergySource: -1, CurrentSize: undefined, CurrentWorth: undefined };

        if (Game.spawns[spawnPoint].spawnCreep(this.PaverAttributes.Mega, "Mega-" + newName, { memory: creepMemory, dryRun: true }) == 0) {
            console.log('Spawning new Mega Sized Paver: ' + "Mega-" + newName);
            creepMemory.CurrentSize = CreepSizes.Mega;
            creepMemory.CurrentWorth = this.PaverAttributes.MegaWorth;
            Game.spawns[spawnPoint].spawnCreep(this.PaverAttributes.Mega, "Mega-" + newName, { memory: creepMemory });
        }
        else if (Game.spawns[spawnPoint].spawnCreep(this.PaverAttributes.Jumbo, "Jumbo-" + newName, { memory: creepMemory, dryRun: true }) == 0) {
            console.log('Spawning new Jumbo Sized Paver: ' + "Jumbo-" + newName);
            creepMemory.CurrentSize = CreepSizes.Jumbo;
            creepMemory.CurrentWorth = this.PaverAttributes.JumboWorth;
            Game.spawns[spawnPoint].spawnCreep(this.PaverAttributes.Jumbo, "Jumbo-" + newName, { memory: creepMemory });
        }
        else if (Game.spawns[spawnPoint].spawnCreep(this.PaverAttributes.Large, "Large-" + newName, { memory: creepMemory, dryRun: true }) == 0) {
            console.log('Spawning new Large Sized Paver: ' + "Large-" + newName);
            creepMemory.CurrentSize = CreepSizes.Large;
            creepMemory.CurrentWorth = this.PaverAttributes.LargeWorth;
            Game.spawns[spawnPoint].spawnCreep(this.PaverAttributes.Large, "Large-" + newName, { memory: creepMemory });
        }
        else if (Game.spawns[spawnPoint].spawnCreep(this.PaverAttributes.Medium, "Medium-" + newName, { memory: creepMemory, dryRun: true }) == 0) {
            console.log('Spawning new Medium Sized Paver: ' + "Medium-" + newName);
            creepMemory.CurrentSize = CreepSizes.Medium;
            creepMemory.CurrentWorth = this.PaverAttributes.MediumWorth;
            Game.spawns[spawnPoint].spawnCreep(this.PaverAttributes.Medium, "Medium-" + newName, { memory: creepMemory });
        }
        else if (Game.spawns[spawnPoint].spawnCreep(this.PaverAttributes.Small, "Small-" + newName, { memory: creepMemory, dryRun: true }) == 0) {
            console.log('Spawning new Small Sized Paver: ' + "Small-" + newName);
            creepMemory.CurrentSize = CreepSizes.Small;
            creepMemory.CurrentWorth = this.PaverAttributes.SmallWorth;
            Game.spawns[spawnPoint].spawnCreep(this.PaverAttributes.Small, "Small-" + newName, { memory: creepMemory });
        }
        else if (Game.spawns[spawnPoint].spawnCreep(this.PaverAttributes.Tiny, "Tiny-" + newName, { memory: creepMemory, dryRun: true }) == 0) {
            console.log('Spawning new Tiny Sized Paver: ' + "Tiny-" + newName);
            creepMemory.CurrentSize = CreepSizes.Tiny;
            creepMemory.CurrentWorth = this.PaverAttributes.TinyWorth;
            Game.spawns[spawnPoint].spawnCreep(this.PaverAttributes.Tiny, "Tiny-" + newName, { memory: creepMemory });
        }
        else if (Game.spawns[spawnPoint].spawnCreep(this.PaverAttributes.Mini, "Mini-" + newName, { memory: creepMemory, dryRun: true }) == 0) {
            console.log('Spawning new Mini Sized Paver: ' + "Mini-" + newName);
            creepMemory.CurrentSize = CreepSizes.Mini;
            creepMemory.CurrentWorth = this.PaverAttributes.MiniWorth;
            Game.spawns[spawnPoint].spawnCreep(this.PaverAttributes.Mini, "Mini-" + newName, { memory: creepMemory });
        }
    }

    Act(creep: Creep) {
        //Paver Actions Priority should be: Harvest / Repair Roads / Repair Non-Road / Non-Wall Structures / Upgrade
        let harvest: actionHarvest = new actionHarvest();
        let repairTower: actionRepairTower = new actionRepairTower();
        let repairSpawn: actionRepairSpawn = new actionRepairSpawn();
        let repairExtension: actionRepairExtension = new actionRepairExtension();
        let repairRoad: actionRepairRoad = new actionRepairRoad();
        let upgrade: actionUpgrade = new actionUpgrade();

        if (harvest.IsNecessary(creep)) {
            harvest.Execute(creep);
        }
        else if (repairRoad.IsNecessary(creep)) {
            repairRoad.Execute(creep);
        }
        else {
            //Fallback to Non-Road / Non-Wall repairs and Upgrading
            if (repairTower.IsNecessary(creep)) {
                repairTower.Execute(creep);
            }
            else if (repairSpawn.IsNecessary(creep)) {
                repairSpawn.Execute(creep);
            }
            else if (repairExtension.IsNecessary(creep)) {
                repairExtension.Execute(creep);
            }
            else {
                upgrade.Execute(creep);
            }
        }
    }

    CurrentPaversCount() {
        let currentPavers: number = 0;
        var pavers = _.filter(Game.creeps, (creep) => (creep.memory as CreepMemory).Role == Roles.Paver);

        if (pavers.length) {
            currentPavers = pavers.length;
        }

        return currentPavers;
    }


    private getCurrentPaversWorth() {
        let currentPaverWorth: number = 0;
        var pavers = _.filter(Game.creeps, (creep) => (creep.memory as CreepMemory).Role == Roles.Paver);

        pavers.forEach(creep => {
            if ((creep.memory as CreepMemory).CurrentWorth) {
                currentPaverWorth += ((creep.memory as CreepMemory).CurrentWorth as number);
            }
        });

        return currentPaverWorth;
    }

    private getCurrentPaversNeed(spawnPoint: string) {
        let currentPaverNeed: number = 0;  //Unlike Butlers / Upgraders, I don't think we always need a Paver to be available.

        let roadsNeedingRepair = Game.spawns[spawnPoint].room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return structure.structureType == STRUCTURE_ROAD && structure.hits < structure.hitsMax;
            }
        });

        //We're going to say we need 1 paver for every 3 roads that need repairing.
        if(roadsNeedingRepair.length){
            currentPaverNeed = Math.ceil(roadsNeedingRepair.length / 3);
        }

        return currentPaverNeed;
    }
};
