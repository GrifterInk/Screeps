import { actionSupplyEnergy } from "actions/action.SupplyEnergy";
import { actionUpgrade } from "actions/action.Upgrade";
import { Roles } from "constants/enum.Roles";
import { actionHarvest } from "actions/action.Harvest";
import { ButlerAttributes } from "attributes/class.ButlerAttributes";
import { RoomMemory } from "interfaces/interface.RoomMemory";
import { BaseCreep } from "./controller.BaseCreep";

export class Butler extends BaseCreep {
    constructor(){
        super(Roles.Butler, 1, new ButlerAttributes()) //We should always have a Butler (hence 1)
    }

    NeedToSpawn(spawnPoint: string) {
        this.currentRoleNeeded = this.getCurrentButlersNeed(spawnPoint); //Important, must set this for base NeedToSpawn class to work properly
        return super.NeedToSpawn(spawnPoint); //Calls the inherited classes NeedToSpawn method (which is generic across roles)
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
        let currentButlerNeed: number = this.baseRoleNeeded;

        if(!this.IsBlockedByCascadingRolesNeed(spawnPoint)){
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
        }

        (Game.spawns[spawnPoint].room.memory as RoomMemory).Butlers.CurrentCreepNeed = currentButlerNeed;

        return currentButlerNeed;
    }
};
