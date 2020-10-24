import { PlanningFlag } from "attributes/class.PlanningFlag";
import { PlanningFlags } from "constants/array.PlanningFlags";
import { PlanningFlagTypes } from "constants/enum.PlanningFlagTypes";

export class actionSetPlanningFlag {
    constructor() {
    }

    IsNecessary(room: Room, pos: RoomPosition, flagType: PlanningFlagTypes | null) {
        let isNecessary: boolean = true;
        let planningFlag: PlanningFlag | undefined = PlanningFlags.find(pf => pf.FlagType == flagType);

        //Don't put flags on top of other flags (either any flag, or flags of the same type depending on input)
        let existingFlags = room.find(FIND_FLAGS, {
            filter: function (flag) {
                if (flag.room == room && flag.pos.x == pos.x && flag.pos.y == pos.y && !flagType) { //Existing Flag Type Independent
                    //console.log("Found Flag in room " + creep.room + " at " + creep.pos.x + " / " + creep.pos.y);

                    return true;
                }
                else if (flag.room == room && flag.pos.x == pos.x && flag.pos.y == pos.y && flagType && planningFlag && flag.color == planningFlag.PrimaryColor && flag.secondaryColor == planningFlag.SecondaryColor) { //Don't set a flag only if flag of same type already exists
                    //console.log("Found " + flagType + "Flag in room " + creep.room + " at " + creep.pos.x + " / " + creep.pos.y);
                    return true;
                }

                return false;
            }
        });

        if (existingFlags && existingFlags.length > 0) {
            isNecessary = false;
        }

        //Don't put flags (of any type) on Roads or construction sites!
        let existingRoads = room.find(FIND_STRUCTURES, {
            filter: function (structure) {
                if (structure.structureType == STRUCTURE_ROAD && structure.room == room && structure.pos.x == pos.x && structure.pos.y == pos.y) {
                    return true;
                }

                return false;
            }
        });

        if (existingRoads && existingRoads.length > 0) {
            isNecessary = false;
        }

        let existingConstructionSites = room.find(FIND_CONSTRUCTION_SITES, {
            filter: function (constructionSite){
                if(constructionSite.room == room && constructionSite.pos.x == pos.x && constructionSite.pos.y == pos.y){
                    return true;
                }

                return false;
            }
        });

        if(existingConstructionSites && existingConstructionSites.length > 0){
            isNecessary = false;
        }

        return isNecessary;
    }

    Execute(pos: RoomPosition, flagType: PlanningFlagTypes) {
        let planningFlag: PlanningFlag | undefined = PlanningFlags.find(pf => pf.FlagType == flagType);

        if (planningFlag) {
            let flagName: string = flagType + "_" + Game.time;

            pos.createFlag(flagName, planningFlag.PrimaryColor, planningFlag.SecondaryColor);
        }
    }
}
