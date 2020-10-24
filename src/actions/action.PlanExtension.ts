import { RoomPositionMapping } from "attributes/class.RoomPositionMapping";
import { PlanningFlags } from "constants/array.PlanningFlags";
import { PlanningFlagTypes } from "constants/enum.PlanningFlagTypes";
import { RoomMemory } from "interfaces/interface.RoomMemory";
import { actionFindPlainForConstructionSite } from "./action.FindPlainForConstructionSite";
import { actionSetPlanningFlag } from "./action.SetPlanningFlag";

export class actionPlanExtension {
    AvailableExtensions: number[] = [0, 5, 10, 20, 30, 40, 50, 60]; //Level 1 - 8 of RCL

    constructor() {
    }

    IsNecessary(creep: Creep) {
        //Logic: Based on Room Controller Level, how many Extensions can I build?  If I have less constructions sites / existing extensions than I can build, then it is necessary to build more.
        var rcl = creep.room.controller;

        if (rcl) {
            var rclLevel = rcl.level;
            var allowedExtensions = this.AvailableExtensions[rclLevel - 1];
            var totalExisting: number = 0;

            var existingExtensions = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return structure.structureType == STRUCTURE_EXTENSION;
                }
            });

            if (existingExtensions && existingExtensions.length) {
                totalExisting += existingExtensions.length;
            }

            var constructionSites = creep.room.find(FIND_CONSTRUCTION_SITES, {
                filter: (constructionSite) => {
                    return constructionSite.structureType == STRUCTURE_EXTENSION
                }
            })

            if (constructionSites && constructionSites.length) {
                totalExisting += constructionSites.length;
            }

            var extensionFlag = PlanningFlags.find(pf => pf.FlagType == PlanningFlagTypes.Extension);

            if (extensionFlag) {
                var flaggedSites = creep.room.find(FIND_FLAGS, {
                    filter: (flag) => {
                        return extensionFlag && flag.color == extensionFlag.PrimaryColor && flag.secondaryColor == extensionFlag.SecondaryColor
                    }
                });

                if(flaggedSites && flaggedSites.length){
                    totalExisting += flaggedSites.length;
                }
            }

            if (totalExisting < allowedExtensions) {
                return true;
            }
        }

        return false;
    }

    Exectute(creep: Creep) {
        let findSite: actionFindPlainForConstructionSite = new actionFindPlainForConstructionSite();
        let sitePos: RoomPositionMapping | null = findSite.Execute(creep, PlanningFlagTypes.Extension);

        if (sitePos && sitePos.X && sitePos.Y) {
            let setExtensionFlag: actionSetPlanningFlag = new actionSetPlanningFlag();
            let flagPos = new RoomPosition(sitePos.X, sitePos.Y, creep.room.name);

            if (setExtensionFlag.IsNecessary(creep.room, flagPos, null)) {
                setExtensionFlag.Execute(flagPos, PlanningFlagTypes.Extension);

                //Now, update the Room Map so it's up to date.
                let posMapping: RoomPositionMapping | undefined = (creep.room.memory as RoomMemory).RoomMap.find(coord => coord.X == flagPos.x && coord.Y == flagPos.y);

                if (posMapping) {
                    posMapping.CurrentOccupancy = "extension"; //This is important to set right away for spacing (as opposed to setting it to constructionSite first)
                }
            }

        }
    }
}
