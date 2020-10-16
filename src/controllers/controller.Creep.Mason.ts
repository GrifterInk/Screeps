import { Roles } from "constants/enum.Roles";
import { actionHarvest } from "actions/action.Harvest";
import { MasonAttributes } from "attributes/class.MasonAttributes";
import { actionRepairTower } from "actions/action.RepairTower";
import { actionRepairSpawn } from "actions/action.RepairSpawn";
import { actionRepairExtension } from "actions/action.RepairExtension";
import { actionRepairWall } from "actions/action.RepairWall";
import { actionUpgrade } from "actions/action.Upgrade";
import { RoomMemory } from "interfaces/interface.RoomMemory";
import { actionBuildWall } from "actions/action.BuildWall";
import { BaseCreep } from "./controller.Creep.BaseCreep";

export class Mason extends BaseCreep {
    constructor() {
        super(Roles.Mason, 0, new MasonAttributes()); //Don't always need a Mason
    }

    NeedToSpawn(spawnPoint: string) {
        this.currentRoleNeeded = this.getCurrentMasonsNeed(spawnPoint); //Important, must set this for base NeedToSpawn class to work properly
        return super.NeedToSpawn(spawnPoint); //Calls the inherited classes NeedToSpawn method (which is generic across roles)
    }

    Act(creep: Creep) {
        //Mason Actions Priority should be: Harvest / Build New Walls / Repair Walls / Repair Non-Road / Non-Wall Structures / Upgrade
        let harvest: actionHarvest = new actionHarvest();
        let buildWall: actionBuildWall = new actionBuildWall();
        let repairTower: actionRepairTower = new actionRepairTower();
        let repairSpawn: actionRepairSpawn = new actionRepairSpawn();
        let repairExtension: actionRepairExtension = new actionRepairExtension();
        let repairWall: actionRepairWall = new actionRepairWall();
        let upgrade: actionUpgrade = new actionUpgrade();

        if (harvest.IsNecessary(creep)) {
            harvest.Execute(creep);
        }
        else if (buildWall.IsNecessary(creep)) {
            buildWall.Execute(creep);
        }
        else if (repairWall.IsNecessary(creep)) {
            repairWall.Execute(creep);
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

    private getCurrentMasonsNeed(spawnPoint: string) {
        let currentMasonsNeed: number = this.baseRoleNeeded;

        if (!this.IsBlockedByCascadingRolesNeed(spawnPoint)) {
            let wallsNeedingToBeBuilt = Game.spawns[spawnPoint].room.find(FIND_CONSTRUCTION_SITES, {
                filter: (constructionSite) => {
                    return constructionSite.structureType == STRUCTURE_WALL
                }
            });

            if (wallsNeedingToBeBuilt.length) {
                currentMasonsNeed += Math.ceil(wallsNeedingToBeBuilt.length / 10);
            }

            let primaryWallsNeedingRepair = Game.spawns[spawnPoint].room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return structure.structureType == STRUCTURE_WALL && structure.hits <= 1000;
                }
            });

            if (primaryWallsNeedingRepair.length) {
                currentMasonsNeed += Math.ceil(primaryWallsNeedingRepair.length / 2);
            }

            let secondaryWallsNeedingRepair = Game.spawns[spawnPoint].room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return structure.structureType == STRUCTURE_WALL && structure.hits > 1000 && structure.hits <= 100000;
                }
            });

            if (secondaryWallsNeedingRepair.length) {
                currentMasonsNeed += Math.ceil(secondaryWallsNeedingRepair.length / 5);
            }

            let tertiaryWallsNeedingRepair = Game.spawns[spawnPoint].room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return structure.structureType == STRUCTURE_WALL && structure.hits > 100000 && structure.hits < structure.hitsMax;
                }
            });

            if (tertiaryWallsNeedingRepair.length) {
                currentMasonsNeed += Math.ceil(tertiaryWallsNeedingRepair.length / 20);
            }
        }

        (Game.spawns[spawnPoint].room.memory as RoomMemory).Masons.CurrentCreepNeed = currentMasonsNeed;

        return currentMasonsNeed;
    }
};
