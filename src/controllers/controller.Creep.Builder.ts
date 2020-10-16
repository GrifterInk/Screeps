import { Roles } from "constants/enum.Roles";
import { actionHarvest } from "actions/action.Harvest";
import { BuilderAttributes } from "attributes/class.BuilderAttributes";
import { actionBuild } from "actions/action.Build";
import { actionRepairTower } from "actions/action.RepairTower";
import { actionRepairSpawn } from "actions/action.RepairSpawn";
import { actionRepairExtension } from "actions/action.RepairExtension";
import { actionRepairRoad } from "actions/action.RepairRoad";
import { actionRepairWall } from "actions/action.RepairWall";
import { RoomMemory } from "interfaces/interface.RoomMemory";
import { actionRepairRampart } from "actions/action.RepairRampart";
import { BaseCreep } from "./controller.Creep.BaseCreep";

export class Builder extends BaseCreep {
    constructor() {
        super(Roles.Builder, 0, new BuilderAttributes()); //Unlike Builders/Upgraders, don't always need a builder (hence 0)
    }

    NeedToSpawn(spawnPoint: string) {
        this.currentRoleNeeded = this.getCurrentBuildersNeed(spawnPoint); //Important, must set this for base NeedToSpawn class to work properly
        return super.NeedToSpawn(spawnPoint); //Calls the inherited classes NeedToSpawn method (which is generic across roles)
    }

    Act(creep: Creep) {
        //Builder Actions Priority should be: Harvest / Build (prioritizing non-road / non-wall) / Repair Non-Road, Non-Wall Structures / Repair Roads
        let build: actionBuild = new actionBuild();
        let harvest: actionHarvest = new actionHarvest();
        let repairTower: actionRepairTower = new actionRepairTower();
        let repairSpawn: actionRepairSpawn = new actionRepairSpawn();
        let repairExtension: actionRepairExtension = new actionRepairExtension();
        let repairRampart: actionRepairRampart = new actionRepairRampart();
        let repairRoad: actionRepairRoad = new actionRepairRoad();
        let repairWall: actionRepairWall = new actionRepairWall();

        if (harvest.IsNecessary(creep)) {
            harvest.Execute(creep);
        }
        else if (build.IsNecessary(creep)) {
            build.Execute(creep);
        }
        else {
            //Fallback to repairs
            if (repairTower.IsNecessary(creep)) {
                repairTower.Execute(creep);
            }
            else if (repairSpawn.IsNecessary(creep)) {
                repairSpawn.Execute(creep);
            }
            else if (repairExtension.IsNecessary(creep)) {
                repairExtension.Execute(creep);
            }
            else if (repairRampart.IsNecessary(creep)) {
                repairRampart.Execute(creep);
            }
            else if (repairRoad.IsNecessary(creep)) {
                repairRoad.Execute(creep);
            }
            else if (repairWall.IsNecessary(creep)) {
                repairWall.Execute(creep);
            }
        }
    }

    private getCurrentBuildersNeed(spawnPoint: string) {
        let currentBuilderNeed: number = this.baseRoleNeeded;

        //Don't build Builders at the expense of not being able to do anything else
        //so adding some logic to make sure that we have at least 1 bot of other roles that are needed but have less priority than Builders
        if (!this.IsBlockedByCascadingRolesNeed(spawnPoint)) {
            let constructionSitesAdvanced = Game.spawns[spawnPoint].room.find(FIND_CONSTRUCTION_SITES, {
                filter: (constructionSite) => {
                    return constructionSite.structureType != STRUCTURE_ROAD
                        && constructionSite.structureType != STRUCTURE_WALL
                }
            });

            //console.log("Constructions Sites: " + constructionSitesAdvanced.length);
            constructionSitesAdvanced.forEach(constructionSiteAdvanced => {
                currentBuilderNeed += 4;
            });
        }

        (Game.spawns[spawnPoint].room.memory as RoomMemory).Builders.CurrentCreepNeed = currentBuilderNeed;

        return currentBuilderNeed;
    }
};
