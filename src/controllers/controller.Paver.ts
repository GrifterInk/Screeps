import { Roles } from "constants/enum.Roles";
import { CreepMemory } from "interfaces/interface.CreepMemory";
import { actionHarvest } from "actions/action.Harvest";
import { PaverAttributes } from "attributes/class.PaverAttributes";
import { actionRepairTower } from "actions/action.RepairTower";
import { actionRepairSpawn } from "actions/action.RepairSpawn";
import { actionRepairExtension } from "actions/action.RepairExtension";
import { actionRepairRoad } from "actions/action.RepairRoad";
import { actionUpgrade } from "actions/action.Upgrade";
import { RoomMemory } from "interfaces/interface.RoomMemory";
import { Mason } from "./controller.Mason";
import { CreepSpawner } from "utils/utilities.CreepSpawner";

export class Paver {
    PaverAttributes: PaverAttributes = new PaverAttributes();

    constructor() {
    }

    NeedToSpawn(spawnPoint: string) {
        this.CurrentPaversCount(spawnPoint); //Important for Room Memory updating!
        let currentPaverWorth: number = this.getCurrentPaversWorth(spawnPoint);
        let currentPaverNeed: number = this.getCurrentPaversNeed(spawnPoint);

        //console.log("Current Paver Need: " + currentPaverNeed + " / Current Paver Worth: " + currentPaverWorth);
        if (currentPaverNeed > currentPaverWorth) {
            //console.log("A new Paver is needed!")
            return true;
        }

        //console.log("No new Pavers are necessary at this time")
        return false;
    }

    Spawn(spawnPoint: string) {
        var creepName = 'Paver_' + Game.time;

        let creepMemory: CreepMemory = { Role: Roles.Paver, CurrentAction: "", CurrentEnergySource: -1, CurrentSize: undefined, CurrentWorth: undefined };

        CreepSpawner.SpawnProperSizedCreep(spawnPoint, creepName, creepMemory, Roles.Paver);
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

    CurrentPaversCount(spawnPoint: string) {
        let currentPavers: number = 0;
        var pavers = _.filter(Game.creeps, (creep) => (creep.memory as CreepMemory).Role == Roles.Paver);

        if (pavers.length) {
            currentPavers = pavers.length;
        }

        (Game.spawns[spawnPoint].room.memory as RoomMemory).Pavers.CurrentCreepCount = currentPavers;

        return currentPavers;
    }


    private getCurrentPaversWorth(spawnPoint: string) {
        let currentPaversWorth: number = 0;
        var pavers = _.filter(Game.creeps, (creep) => (creep.memory as CreepMemory).Role == Roles.Paver);

        pavers.forEach(creep => {
            if ((creep.memory as CreepMemory).CurrentWorth) {
                currentPaversWorth += ((creep.memory as CreepMemory).CurrentWorth as number);
            }
        });

        (Game.spawns[spawnPoint].room.memory as RoomMemory).Pavers.CurrentCreepWorth = currentPaversWorth;

        return currentPaversWorth;
    }

    private getCurrentPaversNeed(spawnPoint: string) {
        let currentPaversNeed: number = 0;  //Unlike Butlers / Upgraders, I don't think we always need a Paver to be available.
        let mason: Mason = new Mason();

        //Don't build Pavers at the expense of not being able to do anything else
        //so adding some logic to make sure that we have at least 1 bot of other roles that are needed but have less priority than Pavers.
        if (this.CurrentPaversCount(spawnPoint) == 0
            || !mason.NeedToSpawn(spawnPoint) || mason.CurrentMasonsCount(spawnPoint) > 0) {

            let roadsNeedingRepair = Game.spawns[spawnPoint].room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return structure.structureType == STRUCTURE_ROAD && structure.hits < structure.hitsMax;
                }
            });

            //We're going to say we need 1 paver for every 10 roads that need repairing.
            if (roadsNeedingRepair.length) {
                currentPaversNeed = Math.ceil(roadsNeedingRepair.length / 20);
            }
        }

        (Game.spawns[spawnPoint].room.memory as RoomMemory).Pavers.CurrentCreepNeed = currentPaversNeed;

        return currentPaversNeed;
    }
};
