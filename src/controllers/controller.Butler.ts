import { actionSupplyEnergy } from "actions/action.SupplyEnergy";
import { actionUpgrade } from "actions/action.Upgrade";
import { Roles } from "constants/enum.Roles";
import { CreepMemory } from "interfaces/interface.CreepMemory";
import { actionHarvest } from "actions/action.Harvest";
import { ButlerAttributes } from "attributes/class.ButlerAttributes";
import { CreepSizes } from "constants/enum.CreepSizes";

export class Butler {
    butlerAttributes: ButlerAttributes = new ButlerAttributes();

    constructor() {
    }

    NeedToSpawn(spawnPoint: string) {
        let currentButlerWorth: number = this.getCurrentButlersWorth();
        let currentButlerNeed: number = this.getCurrentButlersNeed(spawnPoint);

        //console.log("Current Butler Need: " + currentButlerNeed + " / Current Butler Worth: " + currentButlerWorth);
        if (currentButlerNeed > currentButlerWorth) {
            console.log("A new Butler is needed!")
            return true;
        }

        //console.log("No new Butlers are necessary at this time")
        return false;
    }

    Spawn(spawnPoint: string) {
        var newName = 'Butler_' + Game.time;

        let creepMemory: CreepMemory = { Role: Roles.Butler, CurrentAction: "", CurrentEnergySource: -1, CurrentSize: undefined, CurrentWorth: undefined };

        if (Game.spawns[spawnPoint].spawnCreep(this.butlerAttributes.Mega, "Mega-" + newName, { memory: creepMemory, dryRun: true }) == 0) {
            console.log('Spawning new Mega Sized Butler: ' + "Mega-" + newName);
            creepMemory.CurrentSize = CreepSizes.Mega;
            creepMemory.CurrentWorth = this.butlerAttributes.MegaWorth;
            Game.spawns[spawnPoint].spawnCreep(this.butlerAttributes.Mega, "Mega-" + newName, { memory: creepMemory });
        }
        else if (Game.spawns[spawnPoint].spawnCreep(this.butlerAttributes.Jumbo, "Jumbo-" + newName, { memory: creepMemory, dryRun: true }) == 0) {
            console.log('Spawning new Jumbo Sized Butler: ' + "Jumbo-" + newName);
            creepMemory.CurrentSize = CreepSizes.Jumbo;
            creepMemory.CurrentWorth = this.butlerAttributes.JumboWorth;
            Game.spawns[spawnPoint].spawnCreep(this.butlerAttributes.Jumbo, "Jumbo-" + newName, { memory: creepMemory });
        }
        else if (Game.spawns[spawnPoint].spawnCreep(this.butlerAttributes.Large, "Large-" + newName, { memory: creepMemory, dryRun: true }) == 0) {
            console.log('Spawning new Large Sized Butler: ' + "Large-" + newName);
            creepMemory.CurrentSize = CreepSizes.Large;
            creepMemory.CurrentWorth = this.butlerAttributes.LargeWorth;
            Game.spawns[spawnPoint].spawnCreep(this.butlerAttributes.Large, "Large-" + newName, { memory: creepMemory });
        }
        else if (Game.spawns[spawnPoint].spawnCreep(this.butlerAttributes.Medium, "Medium-" + newName, { memory: creepMemory, dryRun: true }) == 0) {
            console.log('Spawning new Medium Sized Butler: ' + "Medium-" + newName);
            creepMemory.CurrentSize = CreepSizes.Medium;
            creepMemory.CurrentWorth = this.butlerAttributes.MediumWorth;
            Game.spawns[spawnPoint].spawnCreep(this.butlerAttributes.Medium, "Medium-" + newName, { memory: creepMemory });
        }
        else if (Game.spawns[spawnPoint].spawnCreep(this.butlerAttributes.Small, "Small-" + newName, { memory: creepMemory, dryRun: true }) == 0) {
            console.log('Spawning new Small Sized Butler: ' + "Small-" + newName);
            creepMemory.CurrentSize = CreepSizes.Small;
            creepMemory.CurrentWorth = this.butlerAttributes.SmallWorth;
            Game.spawns[spawnPoint].spawnCreep(this.butlerAttributes.Small, "Small-" + newName, { memory: creepMemory });
        }
        else if (Game.spawns[spawnPoint].spawnCreep(this.butlerAttributes.Tiny, "Tiny-" + newName, { memory: creepMemory, dryRun: true }) == 0) {
            console.log('Spawning new Tiny Sized Butler: ' + "Tiny-" + newName);
            creepMemory.CurrentSize = CreepSizes.Tiny;
            creepMemory.CurrentWorth = this.butlerAttributes.TinyWorth;
            Game.spawns[spawnPoint].spawnCreep(this.butlerAttributes.Tiny, "Tiny-" + newName, { memory: creepMemory });
        }
        else if (Game.spawns[spawnPoint].spawnCreep(this.butlerAttributes.Mini, "Mini-" + newName, { memory: creepMemory, dryRun: true }) == 0) {
            console.log('Spawning new Mini Sized Butler: ' + "Mini-" + newName);
            creepMemory.CurrentSize = CreepSizes.Mini;
            creepMemory.CurrentWorth = this.butlerAttributes.MiniWorth;
            Game.spawns[spawnPoint].spawnCreep(this.butlerAttributes.Mini, "Mini-" + newName, { memory: creepMemory });
        }
    }

    Act(creep: Creep) {
        //Butler Actions Priority should be: Harvest / SupplyEnergy / Upgrade
        let supplyEnergy: actionSupplyEnergy = new actionSupplyEnergy();
        let harvest: actionHarvest = new actionHarvest();

        if (harvest.IsNecessary(creep)) {
            harvest.Execute(creep);
        }
        else if (supplyEnergy.IsNecessary(creep)) {
            supplyEnergy.Execute(creep);
        }
        else {
            let upgrade: actionUpgrade = new actionUpgrade();
            upgrade.Execute(creep);
        }
    }


    private getCurrentButlersWorth() {
        let currentButlerWorth: number = 0;
        var butlers = _.filter(Game.creeps, (creep) => (creep.memory as CreepMemory).Role == Roles.Butler);

        butlers.forEach(creep => {
            if ((creep.memory as CreepMemory).CurrentWorth) {
                currentButlerWorth += ((creep.memory as CreepMemory).CurrentWorth as number);
            }
        });

        return currentButlerWorth;
    }

    private getCurrentButlersNeed(spawnPoint: string) {
        let currentButlerNeed: number = 1; // We should always need 1 butler at all times, so start with 1 just to be sure!

        let spawns = Game.spawns[spawnPoint].room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return structure.structureType == STRUCTURE_SPAWN && structure.energy < structure.energyCapacity;
            }
        });
        let towers = Game.spawns[spawnPoint].room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return structure.structureType == STRUCTURE_TOWER && structure.energy < structure.energyCapacity;
            }
        });
        let extensions = Game.spawns[spawnPoint].room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return structure.structureType == STRUCTURE_EXTENSION && structure.energy < structure.energyCapacity;
            }
        });

        spawns.forEach(spawn => {
            currentButlerNeed += 2;
        });
        towers.forEach(tower => {
            currentButlerNeed += 4;
        });
        extensions.forEach(extension => {
            currentButlerNeed + 8;
        });

        return currentButlerNeed;
    }
};
