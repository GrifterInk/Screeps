import { CreepMemory } from "interfaces/interface.CreepMemory";
import { Actions} from "constants/enum.Actions";
import { PathStrokes} from "constants/enum.PathStrokes";
import { creepCommunication } from "utils/utilities.creepCommunication";

export class actionUpgrade {
    constructor() {
    }

    Execute(creep: Creep) {
        (creep.memory as CreepMemory).CurrentAction = Actions.Upgrade;

        if (creep.upgradeController((creep.room as any).controller) == ERR_NOT_IN_RANGE) {
            creepCommunication.Talk(creep);
            creep.moveTo((creep.room as any).controller, { visualizePathStyle: { stroke: PathStrokes.Upgrade } });
        }
    }
};
