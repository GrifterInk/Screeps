import { Roles } from "constants/enum.Roles";
import { CreepMemory } from "interfaces/interface.CreepMemory";
import { actionHarvest } from "actions/action.Harvest";
import { BuilderAttributes } from "attributes/class.BuilderAttributes";
import { actionBuild } from "actions/action.Build";
import { actionRepairTower } from "actions/action.RepairTower";
import { actionRepairSpawn } from "actions/action.RepairSpawn";
import { actionRepairExtension } from "actions/action.RepairExtension";
import { actionRepairRoad } from "actions/action.RepairRoad";
import { actionRepairWall } from "actions/action.RepairWall";
import { RoomMemory } from "interfaces/interface.RoomMemory";
import { Paver } from "./controller.Paver";
import { Mason } from "./controller.Mason";
import { CreepSpawner } from "utils/utilities.CreepSpawner";
import { CreepRoleFunctions } from "utils/utilities.CreepRoleFunctions";

export class Builder {
    BuilderAttributes: BuilderAttributes = new BuilderAttributes();

    constructor() {
    }

    NeedToSpawn(spawnPoint: string) {
        CreepRoleFunctions.GetCurrentCreepCountForRole(spawnPoint, Roles.Builder); //Important for Room Memory updating!
        let currentBuilderWorth: number = CreepRoleFunctions.GetCurrentCreepWorthForRole(spawnPoint, Roles.Builder);
        let currentBuilderNeed: number = this.getCurrentBuildersNeed(spawnPoint);

        //console.log("Current Builder Need: " + currentBuilderNeed + " / Current Builder Worth: " + currentBuilderWorth);
        if (currentBuilderNeed > currentBuilderWorth) {
            //console.log("A new Builder is needed!")
            return true;
        }

        //console.log("No new Builders are necessary at this time")
        return false;
    }

    Spawn(spawnPoint: string) {
        var creepName = 'Builder_' + Game.time;

        let creepMemory: CreepMemory = { Role: Roles.Builder, CurrentAction: "", CurrentEnergySource: -1, CurrentSize: undefined, CurrentWorth: undefined };

        CreepSpawner.SpawnProperSizedCreep(spawnPoint, creepName, creepMemory, Roles.Builder, CreepRoleFunctions.GetCurrentCreepCountForRole(spawnPoint, Roles.Builder));
    }

    Act(creep: Creep) {
        //Builder Actions Priority should be: Harvest / Build / Repair Non-Road, Non-Wall Structures / Repair Roads
        let build: actionBuild = new actionBuild();
        let harvest: actionHarvest = new actionHarvest();
        let repairTower: actionRepairTower = new actionRepairTower();
        let repairSpawn: actionRepairSpawn = new actionRepairSpawn();
        let repairExtension: actionRepairExtension = new actionRepairExtension();
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
            else if (repairRoad.IsNecessary(creep)) {
                repairRoad.Execute(creep);
            }
            else if (repairWall.IsNecessary(creep)) {
                repairWall.Execute(creep);
            }
        }
    }

    private getCurrentBuildersNeed(spawnPoint: string) {
        let currentBuilderNeed: number = 0;  //Unlike Butlers / Upgraders, I don't think we always need a builder to be available.
        let paver: Paver = new Paver();
        let mason: Mason = new Mason();

        //Don't build Builders at the expense of not being able to do anything else
        //so adding some logic to make sure that we have at least 1 bot of other roles that are needed but have less priority than Builders
        if (CreepRoleFunctions.GetCurrentCreepCountForRole(spawnPoint, Roles.Builder) == 0
            || !paver.NeedToSpawn(spawnPoint) || CreepRoleFunctions.GetCurrentCreepCountForRole(spawnPoint, Roles.Paver) > 0
            || !mason.NeedToSpawn(spawnPoint) || CreepRoleFunctions.GetCurrentCreepCountForRole(spawnPoint, Roles.Mason) > 0) {
            let constructionSitesAdvanced = Game.spawns[spawnPoint].room.find(FIND_CONSTRUCTION_SITES, {
                filter: (constructionSite) => {
                    return constructionSite.structureType == STRUCTURE_SPAWN
                        || constructionSite.structureType == STRUCTURE_TOWER
                        || constructionSite.structureType == STRUCTURE_STORAGE
                        || constructionSite.structureType == STRUCTURE_EXTENSION
                        || constructionSite.structureType == STRUCTURE_LAB
                        || constructionSite.structureType == STRUCTURE_CONTAINER
                }
            });
            let constructionSitesSimple = Game.spawns[spawnPoint].room.find(FIND_CONSTRUCTION_SITES, {
                filter: (constructionSite) => {
                    return constructionSite.structureType == STRUCTURE_ROAD
                        || constructionSite.structureType == STRUCTURE_WALL
                }
            });

            constructionSitesAdvanced.forEach(constructionSiteAdvanced => {
                currentBuilderNeed += 4;
            });
            if (constructionSitesSimple.length) {
                currentBuilderNeed += Math.ceil(constructionSitesSimple.length / 2);
            }
        }

        (Game.spawns[spawnPoint].room.memory as RoomMemory).Builders.CurrentCreepNeed = currentBuilderNeed;

        return currentBuilderNeed;
    }
};
