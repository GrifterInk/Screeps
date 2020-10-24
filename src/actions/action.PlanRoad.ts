import { PlanningFlag } from "attributes/class.PlanningFlag";
import { RoomPositionMapping } from "attributes/class.RoomPositionMapping";
import { PlanningFlags } from "constants/array.PlanningFlags";
import { PlanningFlagTypes } from "constants/enum.PlanningFlagTypes";
import { RoomMemory } from "interfaces/interface.RoomMemory";
import { actionSetPlanningFlag } from "./action.SetPlanningFlag";

export class actionPlanRoad {
    constructor() {
    }

    Execute(creep: Creep) {
        let setRoadFlag: actionSetPlanningFlag = new actionSetPlanningFlag();

        if (setRoadFlag.IsNecessary(creep.room, creep.pos, null)) {
            setRoadFlag.Execute(creep.pos, PlanningFlagTypes.Road);
            //creep.pos.createConstructionSite(STRUCTURE_ROAD); //Plan a road at the current position of the Creep

            //Now, update the Room Map so it's up to date.
            let posMapping: RoomPositionMapping | undefined = (creep.room.memory as RoomMemory).RoomMap.find(coord => coord.X == creep.pos.x && coord.Y == creep.pos.y);

            if (posMapping) {
                posMapping.CurrentOccupancy = "constructionSite";
            }
        }
    }
}
