import { PlanningFlag } from "attributes/class.PlanningFlag";
import { PlanningFlags } from "constants/array.PlanningFlags";
import { PlanningFlagTypes } from "constants/enum.PlanningFlagTypes";

export class actionFindPlanningFlag{
    constructor(){
    }

    Execute(room: Room, flagType: PlanningFlagTypes){
        let planningFlag: PlanningFlag | undefined = PlanningFlags.find(pf => pf.FlagType == flagType);
        let existingFlags = room.find(FIND_FLAGS, {
            filter: function (flag) {
                if(planningFlag && flag.color == planningFlag.PrimaryColor && flag.secondaryColor == planningFlag.SecondaryColor){
                    return true;
                }

                return false;
            }
        })

        return existingFlags;
    }
}
