import { CreepMemory } from "interfaces/interface.CreepMemory";
import { Actions} from "constants/enum.Actions";
import { PathStrokes} from "constants/enum.PathStrokes";
import { actionCommunicate } from "./action.Communicate";
import { actionPlanRoad } from "./action.PlanRoad";

export class actionUpgrade {
    constructor() {
    }

    Execute(creep: Creep) {
        (creep.memory as CreepMemory).CurrentAction = Actions.Upgrade;

        if (creep.upgradeController((creep.room as any).controller) == ERR_NOT_IN_RANGE) {
            let communicate: actionCommunicate = new actionCommunicate();
            communicate.Execute(creep);

            creep.moveTo((creep.room as any).controller, { visualizePathStyle: { stroke: PathStrokes.Upgrade } });
            let planRoad: actionPlanRoad = new actionPlanRoad();
            planRoad.Execute(creep); //Plan road for the path to the controller.
    }
    }
};
