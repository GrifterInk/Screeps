import { CreepMemory } from "interfaces/interface.CreepMemory";
import { Actions } from "constants/enum.Actions";
import { PathStrokes } from "constants/enum.PathStrokes";
import { actionCommunicate } from "./action.Communicate";
import { actionFindPlanningFlag } from "./action.FindPlanningFlag";
import { PlanningFlagTypes } from "constants/enum.PlanningFlagTypes";
import { RoomMemory } from "interfaces/interface.RoomMemory";
import { RoomPositionMapping } from "attributes/class.RoomPositionMapping";

export class actionBuildRoad {
    constructor() {
    }

    IsNecessary(creep: Creep) {
        var targets = creep.room.find(FIND_CONSTRUCTION_SITES, { //First, check actual construction sites.
            filter: (constructionSite) => {
                return constructionSite.structureType == STRUCTURE_ROAD
            }
        });

        if (targets.length) {
            //console.log("Need to Build");
            return true;
        }
        else {
            //Didn't find construction sites, check road flags.
            let findRoadFlags: actionFindPlanningFlag = new actionFindPlanningFlag();

            let roadFlags: Flag[] = findRoadFlags.Execute(creep.room, PlanningFlagTypes.Road);

            if (roadFlags && roadFlags.length) {
                //console.log("Need to Build");
                return true;
            }

            //console.log("No Need to Build");
            return false;
        }
    }

    Execute(creep: Creep) {
        var targets = this.getBuildTarget(creep);

        if (targets && targets.length) {
            (creep.memory as CreepMemory).CurrentAction = Actions.BuildRoad;

            //console.log(targets[0]);
            if (creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                let communicate: actionCommunicate = new actionCommunicate();
                communicate.Execute(creep);

                creep.moveTo(targets[0], { visualizePathStyle: { stroke: PathStrokes.Build } });
            }
            else if (creep.build(targets[0]) == OK) {
                //Update RoomMap
                let posMap: RoomPositionMapping | undefined = (creep.room.memory as RoomMemory).RoomMap.find(coord => targets != undefined && coord.X == targets[0].pos.x && coord.Y == targets[0].pos.y);

                if (posMap) {
                    posMap.CurrentOccupancy = STRUCTURE_ROAD;
                }
            }
        }
        else {
            //We might not have a construction site yet, but might have some Road PlanningFlags set.
            let findRoadFlags: actionFindPlanningFlag = new actionFindPlanningFlag();
            let roadFlags: Flag[] = findRoadFlags.Execute(creep.room, PlanningFlagTypes.Road);

            if (roadFlags && roadFlags.length) {
                creep.room.createConstructionSite(roadFlags[0].pos, STRUCTURE_ROAD);
                roadFlags[0].remove(); //Remove the flag in place of the construction site.
            }
        }
    }

    private getBuildTarget(creep: Creep) {
        //Roads are infrastructure that are relatively quick to build
        let roadsToBuild = creep.room.find(FIND_CONSTRUCTION_SITES, {
            filter: (constructionSite) => {
                return constructionSite.structureType == STRUCTURE_ROAD
            }
        });
        if (roadsToBuild.length) {
            return roadsToBuild;
        }

        return undefined;
    }
};
