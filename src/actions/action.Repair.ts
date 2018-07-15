import { CreepMemory } from "interfaces/interface.CreepMemory";
import { Actions} from "constants/enum.Actions";
import { PathStrokes} from "constants/enum.PathStrokes";
import { creepCommunication } from "utils/utilities.creepCommunication";

export class actionRepair {
    constructor() {
    }

    Execute(creep: Creep) {
        var structuresToRepair = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_EXTENSION ||
                    structure.structureType == STRUCTURE_SPAWN ||
                    structure.structureType == STRUCTURE_TOWER ||
                    structure.structureType == STRUCTURE_RAMPART ||
                    structure.structureType == STRUCTURE_ROAD ||
                    structure.structureType == STRUCTURE_WALL)
                    && structure.hits < structure.hitsMax;
            }
        });

        if (structuresToRepair.length) {
            (creep.memory as CreepMemory).CurrentAction = Actions.Build;

            if (creep.repair(structuresToRepair[0]) == ERR_NOT_IN_RANGE) {
                creepCommunication.Talk(creep);
                creep.moveTo(structuresToRepair[0], { visualizePathStyle: { stroke: PathStrokes.Repair } });
            }
        }
    }
};
