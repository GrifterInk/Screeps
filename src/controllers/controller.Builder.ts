import { Roles } from "constants/enum.Roles";
import { CreepMemory } from "interfaces/interface.CreepMemory";
import { actionHarvest } from "actions/action.Harvest";
import { BuilderAttributes } from "attributes/class.BuilderAttributes";
import { CreepSizes } from "constants/enum.CreepSizes";
import { actionBuild } from "actions/action.Build";
import { actionRepairTower } from "actions/action.RepairTower";
import { actionRepairSpawn } from "actions/action.RepairSpawn";
import { actionRepairExtension } from "actions/action.RepairExtension";
import { actionRepairRoad } from "actions/action.RepairRoad";
import { actionRepairWall } from "actions/action.RepairWall";

export class Builder {
    BuilderAttributes: BuilderAttributes = new BuilderAttributes();

    constructor() {
    }

    NeedToSpawn(spawnPoint: string) {
        let currentBuilderWorth: number = this.getCurrentBuildersWorth();
        let currentBuilderNeed: number = this.getCurrentBuildersNeed(spawnPoint);

        //console.log("Current Builder Need: " + currentBuilderNeed + " / Current Builder Worth: " + currentBuilderWorth);
        if (currentBuilderNeed > currentBuilderWorth) {
            console.log("A new Builder is needed!")
            return true;
        }

        //console.log("No new Builders are necessary at this time")
        return false;
    }

    Spawn(spawnPoint: string) {
        var newName = 'Builder_' + Game.time;

        let creepMemory: CreepMemory = { Role: Roles.Builder, CurrentAction: "", CurrentEnergySource: -1, CurrentSize: undefined, CurrentWorth: undefined };

        if (Game.spawns[spawnPoint].spawnCreep(this.BuilderAttributes.Mega, "Mega-" + newName, { memory: creepMemory, dryRun: true }) == 0) {
            console.log('Spawning new Mega Sized Builder: ' + "Mega-" + newName);
            creepMemory.CurrentSize = CreepSizes.Mega;
            creepMemory.CurrentWorth = this.BuilderAttributes.MegaWorth;
            Game.spawns[spawnPoint].spawnCreep(this.BuilderAttributes.Mega, "Mega-" + newName, { memory: creepMemory });
        }
        else if (Game.spawns[spawnPoint].spawnCreep(this.BuilderAttributes.Jumbo, "Jumbo-" + newName, { memory: creepMemory, dryRun: true }) == 0) {
            console.log('Spawning new Jumbo Sized Builder: ' + "Jumbo-" + newName);
            creepMemory.CurrentSize = CreepSizes.Jumbo;
            creepMemory.CurrentWorth = this.BuilderAttributes.JumboWorth;
            Game.spawns[spawnPoint].spawnCreep(this.BuilderAttributes.Jumbo, "Jumbo-" + newName, { memory: creepMemory });
        }
        else if (Game.spawns[spawnPoint].spawnCreep(this.BuilderAttributes.Large, "Large-" + newName, { memory: creepMemory, dryRun: true }) == 0) {
            console.log('Spawning new Large Sized Builder: ' + "Large-" + newName);
            creepMemory.CurrentSize = CreepSizes.Large;
            creepMemory.CurrentWorth = this.BuilderAttributes.LargeWorth;
            Game.spawns[spawnPoint].spawnCreep(this.BuilderAttributes.Large, "Large-" + newName, { memory: creepMemory });
        }
        else if (Game.spawns[spawnPoint].spawnCreep(this.BuilderAttributes.Medium, "Medium-" + newName, { memory: creepMemory, dryRun: true }) == 0) {
            console.log('Spawning new Medium Sized Builder: ' + "Medium-" + newName);
            creepMemory.CurrentSize = CreepSizes.Medium;
            creepMemory.CurrentWorth = this.BuilderAttributes.MediumWorth;
            Game.spawns[spawnPoint].spawnCreep(this.BuilderAttributes.Medium, "Medium-" + newName, { memory: creepMemory });
        }
        else if (Game.spawns[spawnPoint].spawnCreep(this.BuilderAttributes.Small, "Small-" + newName, { memory: creepMemory, dryRun: true }) == 0) {
            console.log('Spawning new Small Sized Builder: ' + "Small-" + newName);
            creepMemory.CurrentSize = CreepSizes.Small;
            creepMemory.CurrentWorth = this.BuilderAttributes.SmallWorth;
            Game.spawns[spawnPoint].spawnCreep(this.BuilderAttributes.Small, "Small-" + newName, { memory: creepMemory });
        }
        else if (Game.spawns[spawnPoint].spawnCreep(this.BuilderAttributes.Tiny, "Tiny-" + newName, { memory: creepMemory, dryRun: true }) == 0) {
            console.log('Spawning new Tiny Sized Builder: ' + "Tiny-" + newName);
            creepMemory.CurrentSize = CreepSizes.Tiny;
            creepMemory.CurrentWorth = this.BuilderAttributes.TinyWorth;
            Game.spawns[spawnPoint].spawnCreep(this.BuilderAttributes.Tiny, "Tiny-" + newName, { memory: creepMemory });
        }
        else if (Game.spawns[spawnPoint].spawnCreep(this.BuilderAttributes.Mini, "Mini-" + newName, { memory: creepMemory, dryRun: true }) == 0) {
            console.log('Spawning new Mini Sized Builder: ' + "Mini-" + newName);
            creepMemory.CurrentSize = CreepSizes.Mini;
            creepMemory.CurrentWorth = this.BuilderAttributes.MiniWorth;
            Game.spawns[spawnPoint].spawnCreep(this.BuilderAttributes.Mini, "Mini-" + newName, { memory: creepMemory });
        }
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

    CurrentBuildersCount() {
        let currentBuilders: number = 0;
        var builders = _.filter(Game.creeps, (creep) => (creep.memory as CreepMemory).Role == Roles.Builder);

        if (builders.length) {
            currentBuilders = builders.length;
        }

        return currentBuilders;
    }


    private getCurrentBuildersWorth() {
        let currentBuilderWorth: number = 0;
        var builders = _.filter(Game.creeps, (creep) => (creep.memory as CreepMemory).Role == Roles.Builder);

        builders.forEach(creep => {
            if ((creep.memory as CreepMemory).CurrentWorth) {
                currentBuilderWorth += ((creep.memory as CreepMemory).CurrentWorth as number);
            }
        });

        return currentBuilderWorth;
    }

    private getCurrentBuildersNeed(spawnPoint: string) {
        let currentBuilderNeed: number = 0;  //Unlike Butlers / Upgraders, I don't think we always need a builder to be available.

        let constructionSitesAdvanced = Game.spawns[spawnPoint].room.find(FIND_CONSTRUCTION_SITES, {
            filter: (constructionSite) => {
                return constructionSite.structureType == STRUCTURE_SPAWN
                    || constructionSite.structureType == STRUCTURE_TOWER
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
        constructionSitesSimple.forEach(constructionSiteSimple => {
            currentBuilderNeed += 1;
        });

        return currentBuilderNeed;
    }
};
