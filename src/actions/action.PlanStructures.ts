export class actionPlanStructure{
    constructor(){
    }

    IsNecessary(creep: Creep){
        return true; //TODO: Fix this.  Ideallly would figure out if we can place a structure and return true/false based on that

    }

    Execute(creep: Creep){


    }

    private goToSpawn(creep: Creep){
        let spawnPoints: AnyStructure[] | undefined = undefined;
        var spawnPointStructureTarget = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return structure.structureType == STRUCTURE_SPAWN
                    && structure.energy < structure.energyCapacity;
            }
        });
        if (spawnPointStructureTarget.length) {
            spawnPoints = spawnPointStructureTarget;
        }

        if(spawnPoints && spawnPoints.length){
            var spawnX = spawnPoints[0].pos.x;
            var spawnY = spawnPoints[0].pos.y;

        }
    }
}


