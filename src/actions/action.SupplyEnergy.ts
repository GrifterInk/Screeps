import { CreepMemory } from "interfaces/interface.CreepMemory";
import { Actions } from "constants/enum.Actions";
import { PathStrokes } from "constants/enum.PathStrokes";
import { creepCommunication } from "utils/utilities.creepCommunication";

export class actionSupplyEnergy {
    constructor() {
    }

    IsNecessary(creep: Creep) {
        var targets = this.getTargets(creep);
        if (targets && targets.length > 0) {
            return true;
        }

        return false;
    }

    Execute(creep: Creep) {
        var targets = this.getTargets(creep);
        if (targets && targets.length > 0) {
            (creep.memory as CreepMemory).CurrentAction = Actions.SupplyEnergy;

            if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creepCommunication.Talk(creep);
                creep.moveTo(targets[0], { visualizePathStyle: { stroke: PathStrokes.SupplyEnergy } });
            }
        }
    }

    private getTargets(creep: Creep) {
        var primaryStructureTarget = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return structure.structureType == STRUCTURE_TOWER
                    && structure.energy < structure.energyCapacity;
            }
        });
        if (primaryStructureTarget.length) {
            return primaryStructureTarget;
        }

        var secondaryStructureTarget = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return structure.structureType == STRUCTURE_EXTENSION
                    && structure.energy < structure.energyCapacity;
            }
        });
        if (secondaryStructureTarget.length) {
            return secondaryStructureTarget;
        }

        var tertiaryStructureTarget = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return structure.structureType == STRUCTURE_SPAWN
                    && structure.energy < structure.energyCapacity;
            }
        });
        if (tertiaryStructureTarget.length) {
            return tertiaryStructureTarget;
        }

        return undefined;
    }
};
