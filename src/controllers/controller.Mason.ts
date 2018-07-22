import { Roles } from "constants/enum.Roles";
import { CreepMemory } from "interfaces/interface.CreepMemory";
import { actionHarvest } from "actions/action.Harvest";
import { MasonAttributes } from "attributes/class.MasonAttributes";
import { actionRepairTower } from "actions/action.RepairTower";
import { actionRepairSpawn } from "actions/action.RepairSpawn";
import { actionRepairExtension } from "actions/action.RepairExtension";
import { actionRepairWall } from "actions/action.RepairWall";
import { actionUpgrade } from "actions/action.Upgrade";
import { RoomMemory } from "interfaces/interface.RoomMemory";
import { CreepRoleFunctions } from "utils/utilities.CreepRoleFunctions";
import { actionSpawn } from "actions/action.Spawn";
import { actionBuildWall } from "actions/action.BuildWall";

export class Mason {
    MasonAttributes: MasonAttributes = new MasonAttributes();

    constructor() {
    }

    NeedToSpawn(spawnPoint: string) {
        CreepRoleFunctions.GetCurrentCreepCountForRole(spawnPoint, Roles.Mason); //Important for Room Memory updating!
        let currentMasonWorth: number = CreepRoleFunctions.GetCurrentCreepWorthForRole(spawnPoint, Roles.Mason);
        let currentMasonNeed: number = this.getCurrentMasonsNeed(spawnPoint);

        //console.log("Current Mason Need: " + currentMasonNeed + " / Current Mason Worth: " + currentMasonWorth);
        if (currentMasonNeed > currentMasonWorth) {
            //console.log("A new Mason is needed!")
            return true;
        }

        //console.log("No new Masons are necessary at this time")
        return false;
    }

    Spawn(spawnPoint: string) {
        var creepName = 'Mason_' + Game.time;

        let creepMemory: CreepMemory = { Role: Roles.Mason, CurrentAction: "", CurrentEnergySource: -1, CurrentSize: undefined, CurrentWorth: undefined };

        let spawn: actionSpawn = new actionSpawn();
        spawn.Execute(spawnPoint, creepName, creepMemory, Roles.Mason, CreepRoleFunctions.GetCurrentCreepCountForRole(spawnPoint, Roles.Mason));
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
        else if (buildWall.IsNecessary(creep)){
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
        let currentMasonsNeed: number = 0;  //Unlike Butlers / Upgraders, I don't think we always need a Mason to be available.


        let wallsNeedingToBeBuilt = Game.spawns[spawnPoint].room.find(FIND_CONSTRUCTION_SITES, {
            filter: (constructionSite) => {
                return constructionSite.structureType == STRUCTURE_WALL
            }
        });

        if (wallsNeedingToBeBuilt.length) {
            currentMasonsNeed += Math.ceil(wallsNeedingToBeBuilt.length / 2);
        }


        let wallsNeedingRepair = Game.spawns[spawnPoint].room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return structure.structureType == STRUCTURE_WALL && structure.hits < structure.hitsMax;
            }
        });

        if (wallsNeedingRepair.length) {
            currentMasonsNeed += wallsNeedingRepair.length;
        }

        (Game.spawns[spawnPoint].room.memory as RoomMemory).Masons.CurrentCreepNeed = currentMasonsNeed;

        return currentMasonsNeed;
    }
};
