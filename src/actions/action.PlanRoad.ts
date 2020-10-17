import { PathStrokes } from "constants/enum.PathStrokes";
import { CreepMemory } from "interfaces/interface.CreepMemory";

export class actionPlanRoad {
    constructor() {
    }

    Execute(creep: Creep) {
        var startingPoints = this.goToSpawnStart(creep);

        var currentAction = (creep.memory as CreepMemory).CurrentAction;

        if ((currentAction == "Return to SpawnPoint" || !currentAction) && startingPoints && startingPoints.length > 0) {
            //console.log("Planner moving back to Spawn Point: " + startingPoints);
            creep.moveTo(startingPoints[0], { visualizePathStyle: { stroke: PathStrokes.SupplyEnergy } });
            creep.pos.createConstructionSite(STRUCTURE_ROAD);

            var spawnX = startingPoints[0].pos.x;
            var spawnY = startingPoints[0].pos.y;
            var creepX = creep.pos.x;
            var creepY = creep.pos.y;

            //console.log("Spawn Pos: " + spawnX + " / " + spawnY + " | Creep Pos: " + creepX + " / " + creepY);
            if ((spawnX - creepX >= -1 && spawnX - creepX <= 1) && (spawnY - creepY >= -1 && spawnY - creepY <= 1)) {
                (creep.memory as CreepMemory).CurrentAction = "Travel to Energy Source"
            }
        }
        else {
            //Find a different origin point.
        }

        if (currentAction == "Travel to Energy Source") {
            let energySource: Source | undefined = this.findPathToEnergySource(creep);

            if (energySource) {
                creep.moveTo(energySource, { visualizePathStyle: { stroke: PathStrokes.SupplyEnergy } });
                creep.pos.createConstructionSite(STRUCTURE_ROAD);

                var sourceX = energySource.pos.x;
                var sourceY = energySource.pos.y;
                var creepX = creep.pos.x;
                var creepY = creep.pos.y;

                //console.log("Source Pos: " + sourceX + " / " + sourceY + " | Creep Pos: " + creepX + " / " + creepY);
                if ((sourceX - creepX >= -1 && sourceX - creepX <= 1) && (sourceY - creepY >= -1 && sourceY - creepY <= 1)) {
                    (creep.memory as CreepMemory).CurrentAction = "Return to SpawnPoint"
                }
            }
        }
    }

    private goToSpawnStart(creep: Creep) {
        var spawnPointStructureTarget = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return structure.structureType == STRUCTURE_SPAWN
                    && structure.energy < structure.energyCapacity;
            }
        });
        if (spawnPointStructureTarget.length) {
            return spawnPointStructureTarget;
        }

        return undefined;
    }

    private findPathToEnergySource(creep: Creep) {
        var sources = creep.room.find(FIND_SOURCES_ACTIVE);

        if (sources && sources.length > 0) {
            return sources[0]; //TODO: Have to figure out how to handle all the sources
        }

        return undefined;
    }
}
