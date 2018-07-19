import { CreepMemory } from "interfaces/interface.CreepMemory";
import { Actions } from "constants/enum.Actions";
import { PathStrokes } from "constants/enum.PathStrokes";
import { actionCommunicate } from "./action.Communicate";

export class actionRepairWall {
    constructor() {
    }

    IsNecessary(creep: Creep) {
        var targets = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return structure.structureType == STRUCTURE_WALL && structure.hits < structure.hitsMax;
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
        var targets = this.getRepairTarget(creep);

        if (targets && targets.length) {
            (creep.memory as CreepMemory).CurrentAction = Actions.Build;

            if (creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
                let communicate: actionCommunicate = new actionCommunicate();
                communicate.Execute(creep);

                creep.moveTo(targets[0], { visualizePathStyle: { stroke: PathStrokes.Repair } });
            }
        }
    }

    private getRepairTarget(creep: Creep) {
        //quaternary, quinary, senary, septenary, octonary, nonary, and denary

        //Primary are walls <= 1000HP
        let wallsToRepairPrimary = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return structure.structureType == STRUCTURE_WALL && structure.hits < structure.hitsMax && structure.hits <= 1000;
            }
        });
        if (wallsToRepairPrimary.length) {
            return wallsToRepairPrimary;
        }

        //Secondary are walls <= 100K HP
        let wallsToRepairSecondary = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return structure.structureType == STRUCTURE_WALL && structure.hits < structure.hitsMax && structure.hits <= 100000;
            }
        });
        if (wallsToRepairSecondary.length) {
            return wallsToRepairSecondary;
        }

        //Tertiary are walls <= 1 Million HP
        let wallsToRepairTertiary = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return structure.structureType == STRUCTURE_WALL && structure.hits < structure.hitsMax && structure.hits <= 1000000;
            }
        });
        if (wallsToRepairTertiary.length) {
            return wallsToRepairTertiary;
        }

        //Quaternary are walls <= 1 Million HP
        let wallsToRepairQuaternary = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return structure.structureType == STRUCTURE_WALL && structure.hits < structure.hitsMax && structure.hits <= 1000000;
            }
        });
        if (wallsToRepairQuaternary.length) {
            return wallsToRepairQuaternary;
        }

        //Any other wall with missing HP is Quinary
        let wallsToRepairQuinary = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return structure.structureType == STRUCTURE_WALL && structure.hits < structure.hitsMax && structure.hits <= 1000000;
            }
        });
        if (wallsToRepairQuinary.length) {
            return wallsToRepairQuinary;
        }

        return undefined;
    }
};
