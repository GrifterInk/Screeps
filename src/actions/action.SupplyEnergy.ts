import { CreepMemory } from "interfaces/interface.CreepMemory";
import { Actions} from "constants/enum.Actions";
import { PathStrokes} from "constants/enum.PathStrokes";

export class actionSupplyEnergy {
    constructor() {
    }

    IsNecessary(creep: Creep){
        var targets = this.getTargets(creep);
        if (targets.length > 0) {
            return true;
        }

        return false;
    }

    Execute(creep: Creep) {
        var targets = this.getTargets(creep);
        if (targets.length > 0) {
            creep.say(Actions.SupplyEnergy);
            (creep.memory as CreepMemory).CurrentAction = Actions.SupplyEnergy;

            if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targets[0], { visualizePathStyle: { stroke: PathStrokes.SupplyEnergy } });
            }
        }
    }

    private getTargets(creep: Creep){
        return creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_EXTENSION ||
                    structure.structureType == STRUCTURE_SPAWN ||
                    structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
            }
        });
    }
};
