import { actionSupplyEnergy } from "actions/action.SupplyEnergy";
import { actionUpgrade } from "actions/action.Upgrade";
import { Roles } from "constants/enum.Roles";
import { CreepMemory } from "interfaces/interface.CreepMemory";
import { actionHarvest } from "actions/action.Harvest";
import { ButlerAttributes } from "attributes/class.ButlerAttributes";
import { RoomMemory } from "interfaces/interface.RoomMemory";
import { CreepRoleFunctions } from "utils/utilities.CreepRoleFunctions";
import { actionSpawn } from "actions/action.Spawn";

export class Butler {
    butlerAttributes: ButlerAttributes = new ButlerAttributes();

    constructor() {
    }

    NeedToSpawn(spawnPoint: string) {
        CreepRoleFunctions.GetCurrentCreepCountForRole(spawnPoint, Roles.Butler); //Important for Room Memory updating!
        let currentButlerWorth: number = CreepRoleFunctions.GetCurrentCreepWorthForRole(spawnPoint, Roles.Butler);
        let currentButlerNeed: number = this.getCurrentButlersNeed(spawnPoint);

        //console.log("Current Butler Need: " + currentButlerNeed + " / Current Butler Worth: " + currentButlerWorth);
        if (currentButlerNeed > currentButlerWorth) {
            //console.log("A new Butler is needed!")
            return true;
        }

        //console.log("No new Butlers are necessary at this time")
        return false;
    }

    Spawn(spawnPoint: string) {
        var creepName = 'Butler_' + Game.time;

        let creepMemory: CreepMemory = { Role: Roles.Butler, CurrentAction: "", CurrentEnergySource: -1, CurrentSize: undefined, CurrentWorth: undefined };

        let spawn: actionSpawn = new actionSpawn();
        spawn.Execute(spawnPoint, creepName, creepMemory, Roles.Butler, CreepRoleFunctions.GetCurrentCreepCountForRole(spawnPoint, Roles.Butler));
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

    private getCurrentButlersNeed(spawnPoint: string) {
        let currentButlerNeed: number = 1; // We should always need 1 butler at all times, so start with 1 just to be sure!

        let spawnsAndExtensions = Game.spawns[spawnPoint].room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_SPAWN || structure.structureType == STRUCTURE_EXTENSION)
                    && structure.energy < structure.energyCapacity;
            }
        });
        let towers = Game.spawns[spawnPoint].room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return structure.structureType == STRUCTURE_TOWER && structure.energy < structure.energyCapacity;
            }
        });
        let labs = Game.spawns[spawnPoint].room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return structure.structureType == STRUCTURE_LAB && structure.energy < structure.energyCapacity;
            }
        });

        spawnsAndExtensions.forEach(structure => {
            currentButlerNeed += 3;
        });
        towers.forEach(structure => {
            currentButlerNeed += 5;
        });
        labs.forEach(structure => {
            currentButlerNeed + 8;
        });

        (Game.spawns[spawnPoint].room.memory as RoomMemory).Butlers.CurrentCreepNeed = currentButlerNeed;

        return currentButlerNeed;
    }
};
