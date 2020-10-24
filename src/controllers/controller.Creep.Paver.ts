import { Roles } from "constants/enum.Roles";
import { actionHarvest } from "actions/action.Harvest";
import { PaverAttributes } from "attributes/class.PaverAttributes";
import { actionRepairTower } from "actions/action.RepairTower";
import { actionRepairSpawn } from "actions/action.RepairSpawn";
import { actionRepairExtension } from "actions/action.RepairExtension";
import { actionRepairRoad } from "actions/action.RepairRoad";
import { actionUpgrade } from "actions/action.Upgrade";
import { RoomMemory } from "interfaces/interface.RoomMemory";
import { CreepRoleFunctions } from "utils/utilities.CreepRoleFunctions";
import { actionBuildRoad } from "actions/action.BuildRoad";
import { BaseCreep } from "./controller.Creep.BaseCreep";
import { actionFindPlanningFlag } from "actions/action.FindPlanningFlag";
import { PlanningFlagTypes } from "constants/enum.PlanningFlagTypes";

export class Paver extends BaseCreep {
    constructor() {
        super(Roles.Paver, 0, new PaverAttributes()); //Shouldn't always need a Paver
    }

    NeedToSpawn(spawnPoint: string) {
        CreepRoleFunctions.GetCurrentCreepCountForRole(spawnPoint, Roles.Paver); //Important for Room Memory updating!
        let currentPaverWorth: number = CreepRoleFunctions.GetCurrentCreepWorthForRole(spawnPoint, Roles.Paver);
        let currentPaverNeed: number = this.getCurrentPaversNeed(spawnPoint);

        //console.log("Current Paver Need: " + currentPaverNeed + " / Current Paver Worth: " + currentPaverWorth);
        if (currentPaverNeed > currentPaverWorth) {
            //console.log("A new Paver is needed!")
            return true;
        }

        //console.log("No new Pavers are necessary at this time")
        return false;
    }

    Act(creep: Creep) {
        //Paver Actions Priority should be: Harvest / Build New Roads / Repair Roads / Repair Non-Road / Non-Wall Structures / Upgrade
        let harvest: actionHarvest = new actionHarvest();
        let buildRoad: actionBuildRoad = new actionBuildRoad();
        let repairTower: actionRepairTower = new actionRepairTower();
        let repairSpawn: actionRepairSpawn = new actionRepairSpawn();
        let repairExtension: actionRepairExtension = new actionRepairExtension();
        let repairRoad: actionRepairRoad = new actionRepairRoad();
        let upgrade: actionUpgrade = new actionUpgrade();

        if (harvest.IsNecessary(creep)) {
            harvest.Execute(creep);
        }
        else if (buildRoad.IsNecessary(creep)) {
            buildRoad.Execute(creep);
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

    private getCurrentPaversNeed(spawnPoint: string) {
        let currentPaversNeed: number = this.baseRoleNeeded;

        if (!this.IsBlockedByCascadingRolesNeed(spawnPoint)) {
            let roadFlags: actionFindPlanningFlag = new actionFindPlanningFlag();
            let roadsNeedingToBePlanned: Flag[] = roadFlags.Execute(Game.spawns[spawnPoint].room, PlanningFlagTypes.Road);

            if(roadsNeedingToBePlanned && roadsNeedingToBePlanned.length){
                currentPaversNeed += Math.ceil(roadsNeedingToBePlanned.length / 2);
            }

            let roadsNeedingToBeBuilt = Game.spawns[spawnPoint].room.find(FIND_CONSTRUCTION_SITES, {
                filter: (constructionSite) => {
                    return constructionSite.structureType == STRUCTURE_ROAD
                }
            });

            if (roadsNeedingToBeBuilt.length) {
                currentPaversNeed += Math.ceil(roadsNeedingToBeBuilt.length / 2);
            }

            let roadsNeedingRepair = Game.spawns[spawnPoint].room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return structure.structureType == STRUCTURE_ROAD && structure.hits < structure.hitsMax;
                }
            });

            //We're going to say we need 1 paver for every 30 roads that need repairing.
            if (roadsNeedingRepair.length) {
                currentPaversNeed += Math.ceil(roadsNeedingRepair.length / 30);
            }
        }

        (Game.spawns[spawnPoint].room.memory as RoomMemory).Pavers.CurrentCreepNeed = currentPaversNeed;

        return currentPaversNeed;
    }
};
