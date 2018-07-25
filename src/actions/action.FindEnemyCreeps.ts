import { RoomMemory } from "interfaces/interface.RoomMemory";

export class actionFindEnemies {
    constructor() {
    }

    IsNecessary(creep: Creep) {
        let roomMemory: RoomMemory = (creep.room.memory as RoomMemory);
        var enemies = creep.room.find(FIND_HOSTILE_CREEPS, {
            filter: (hostileCreep) => {
                return !roomMemory.CurrentAllies.includes(hostileCreep.owner.username);
            }
        });

        if (enemies.length) {
            return true;
        }

        return false;
    }

    Execute(creep: Creep) {
        let roomMemory: RoomMemory = (creep.room.memory as RoomMemory);
        var enemies = creep.room.find(FIND_HOSTILE_CREEPS, {
            filter: (hostileCreep) => {
                return !roomMemory.CurrentAllies.includes(hostileCreep.owner.username);
            }
        });

        //TODO: Pass a parameter that says to find the closest or the weakest or the strongest and add that to the filter based on what is passed in.

        return enemies;
    }
};
