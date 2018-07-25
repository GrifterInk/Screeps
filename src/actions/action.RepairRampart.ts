import { CreepMemory } from "interfaces/interface.CreepMemory";
import { Actions } from "constants/enum.Actions";
import { PathStrokes } from "constants/enum.PathStrokes";
import { actionCommunicate } from "./action.Communicate";

export class actionRepairRampart {
    constructor() {
    }

    IsNecessary(creep: Creep) {
        var targets = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return structure.structureType == STRUCTURE_RAMPART && structure.hits < structure.hitsMax;
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
                return structure.structureType == STRUCTURE_RAMPART && structure.hits < structure.hitsMax;
            }
        });

        if (structuresToRepair.length) {
            structuresToRepair.sort(function(a, b)  {return a.hits - b.hits}); //Sorts so Ramparts with lowest remaining hits are prioritized highest!

            (creep.memory as CreepMemory).CurrentAction = Actions.Build;

            if (creep.repair(structuresToRepair[0]) == ERR_NOT_IN_RANGE) {
                let communicate: actionCommunicate = new actionCommunicate();
                communicate.Execute(creep);

                creep.moveTo(structuresToRepair[0], { visualizePathStyle: { stroke: PathStrokes.Repair } });
            }
        }
    }
};
