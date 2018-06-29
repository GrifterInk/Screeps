import { CreepMemory } from "interfaces/interface.CreepMemory";
import { Actions} from "constants/enum.Actions";
import { PathStrokes} from "constants/enum.PathStrokes";

export class actionBuild {
    constructor() {
    }

    IsNecessary(creep: Creep){
        var targets = creep.room.find(FIND_CONSTRUCTION_SITES);

        if (targets.length) {
            //console.log("Need to Build");
            return true;
        }
        else if(creep.carry.energy == 0 || (creep.memory as CreepMemory).CurrentAction == Actions.Harvest) {
            //console.log("No Need to Build");
            return false;
        }

        return false;
    }

    Execute(creep: Creep) {
        var targets = creep.room.find(FIND_CONSTRUCTION_SITES);

        if (targets.length) {
            creep.say(Actions.Build);
            (creep.memory as CreepMemory).CurrentAction = Actions.Build;

            //console.log(targets[0]);
            if (creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targets[0], { visualizePathStyle: { stroke: PathStrokes.Build } });
            }
        }
    }
};
