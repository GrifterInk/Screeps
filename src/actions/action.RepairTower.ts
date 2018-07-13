import { CreepMemory } from "interfaces/interface.CreepMemory";
import { Actions } from "constants/enum.Actions";
import { PathStrokes } from "constants/enum.PathStrokes";

export class actionRepairTower {
    constructor() {
    }

    IsNecessary(creep: Creep) {
        var targets = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return structure.structureType == STRUCTURE_TOWER && structure.hits < structure.hitsMax;
            }
        });

        if (targets.length) {
            //console.log("Need to Repair");
            return true;
        }
        else {
            //console.log("No Need to Repair");
            return false;
        }
    }

    Execute(creep: Creep) {
        var structuresToRepair = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return structure.structureType == STRUCTURE_TOWER && structure.hits < structure.hitsMax;
            }
        });

        if (structuresToRepair.length) {
            creep.say(Actions.RepairTower);
            (creep.memory as CreepMemory).CurrentAction = Actions.Build;

            if (creep.repair(structuresToRepair[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(structuresToRepair[0], { visualizePathStyle: { stroke: PathStrokes.Repair } });
            }
        }
    }
};
