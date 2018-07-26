import { RoomMemory } from "interfaces/interface.RoomMemory";
import { EnemyFindingPriorities } from "constants/enum.EnemyFindingPriorities";

export class actionFindEnemies {
    constructor() {
    }

    IsNecessary(creep: Creep) {
        let roomMemory: RoomMemory = (creep.room.memory as RoomMemory);
        let enemies: Creep[] = creep.room.find(FIND_HOSTILE_CREEPS, {
            filter: (hostileCreep) => {
                return !roomMemory.CurrentAllies.includes(hostileCreep.owner.username);
            }
        });

        if (enemies.length) {
            return true;
        }

        return false;
    }

    Execute(creep: Creep, priority: EnemyFindingPriorities) {
        let roomMemory: RoomMemory = (creep.room.memory as RoomMemory);
        let enemies: Creep[] = creep.room.find(FIND_HOSTILE_CREEPS, {
            filter: (hostileCreep) => {
                return !roomMemory.CurrentAllies.includes(hostileCreep.owner.username);
            }
        });

        if (priority == EnemyFindingPriorities.Nearest) {
            enemies = _.sortBy(enemies, e => creep.pos.getRangeTo(e));
        }
        else if (priority == EnemyFindingPriorities.LowestHealth) {
            enemies.sort(function (a, b) { return a.hits - b.hits }); //Sorts so enemies with lowest remaining hits are prioritized first!
        }
        else if (priority == EnemyFindingPriorities.HighestHealth) {
            enemies.sort(function (a, b) { return b.hits - a.hits }); //Sorts so enemies with highest remaining hits are prioritized first!
        }

        return enemies;
    }

    ExecuteAsStructure(tower: Structure) {
        let roomMemory: RoomMemory = (tower.room.memory as RoomMemory);
        var nearestEnemy = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS, {
            filter: (hostileCreep) => {
                return !roomMemory.CurrentAllies.includes(hostileCreep.owner.username);
            }
        });

        return nearestEnemy;
    }
};
