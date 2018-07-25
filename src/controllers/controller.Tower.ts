export class Tower {
    constructor() {

    }

    Defend(spawnPoint: string) {
        var towers = Game.spawns[spawnPoint].room.find(FIND_MY_STRUCTURES, {
            filter: (structure) => {
                return structure.structureType == STRUCTURE_TOWER
            }
        });

        if (towers.length) {
            towers.forEach(structure => {
                let tower: StructureTower = (structure as StructureTower);
                var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
                if (closestHostile) {
                    tower.attack(closestHostile);
                }
            });
        }
    }

    Repair(spawnPoint: string) {
        var towers = Game.spawns[spawnPoint].room.find(FIND_MY_STRUCTURES, {
            filter: (structure) => {
                return structure.structureType == STRUCTURE_TOWER
            }
        });

        if (towers.length) {
            towers.forEach(structure => {
                let tower: StructureTower = (structure as StructureTower);

                var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (structure) => structure.hits < structure.hitsMax
                });
                if (closestDamagedStructure) {
                    tower.repair(closestDamagedStructure);
                }
            });
        }
    }
}
