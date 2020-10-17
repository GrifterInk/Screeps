import { PathStrokes } from "constants/enum.PathStrokes";


export class actionPlanRoad {
    constructor() {


    }

    Execute(creep: Creep) {
        var startingPoints = this.goToSpawnStart(creep);
        let startingPointSet: boolean = false;

        if (startingPoints && startingPoints.length > 0) {
            creep.moveTo(startingPoints[0], { visualizePathStyle: { stroke: PathStrokes.SupplyEnergy } });
            startingPointSet = true;
        }
        else {
            //Find a different origin point.
        }

        if (startingPointSet) {
            let energySource: Source | undefined = this.findPathToEnergySource(creep);

            if (energySource) {
                var path = creep.pos.findPathTo(energySource.pos.x, energySource.pos.y);

                if (path && path.length > 0) {
                    path.forEach(pos => {
                        let room: Room = creep.room;

                        //room.Terrain();
                    });
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
