import { CreepMemory } from "interfaces/interface.CreepMemory";
import { Actions } from "constants/enum.Actions";
import { PathStrokes } from "constants/enum.PathStrokes";
import { actionCommunicate } from "./action.Communicate";

export class actionBuild {
    constructor() {
    }

    IsNecessary(creep: Creep) {
        var targets = creep.room.find(FIND_CONSTRUCTION_SITES);

        if (targets.length) {
            //console.log("Need to Build");
            return true;
        }
        else {
            //console.log("No Need to Build");
            return false;
        }
    }

    Execute(creep: Creep) {
        var targets = this.getBuildTarget(creep);

        if (targets && targets.length) {
            (creep.memory as CreepMemory).CurrentAction = Actions.Build;

            //console.log(targets[0]);
            if (creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                let communicate: actionCommunicate = new actionCommunicate();
                communicate.Execute(creep);

                creep.moveTo(targets[0], { visualizePathStyle: { stroke: PathStrokes.Build } });
            }
        }
    }

    private getBuildTarget(creep: Creep) {
        //Towers are primary because of the defensive nature
        let constructionSitesPrimary = creep.room.find(FIND_CONSTRUCTION_SITES, {
            filter: (constructionSite) => {
                return constructionSite.structureType == STRUCTURE_TOWER
            }
        });
        if (constructionSitesPrimary.length) {
            return constructionSitesPrimary;
        }

        //Spawns / Extensions are important infrastructure to build
        let constructionSitesSecondary = creep.room.find(FIND_CONSTRUCTION_SITES, {
            filter: (constructionSite) => {
                return constructionSite.structureType == STRUCTURE_SPAWN
                    || constructionSite.structureType == STRUCTURE_EXTENSION
            }
        });
        if (constructionSitesSecondary.length) {
            return constructionSitesSecondary;
        }

        //All other types of non-Road / non-Wall build targets are next - use negative cases to make sure we don't accidentally prevent inclusion of something being built
        let constructionSitesTertiary = creep.room.find(FIND_CONSTRUCTION_SITES, {
            filter: (constructionSite) => {
                return constructionSite.structureType != STRUCTURE_WALL
                    && constructionSite.structureType != STRUCTURE_TOWER
                    && constructionSite.structureType != STRUCTURE_ROAD
                    && constructionSite.structureType != STRUCTURE_SPAWN
                    && constructionSite.structureType != STRUCTURE_EXTENSION
            }
        });
        if (constructionSitesTertiary.length) {
            return constructionSitesTertiary;
        }

        //Roads are infrastructure that are relatively quick to build
        let constructionSitesQuaternary = creep.room.find(FIND_CONSTRUCTION_SITES, {
            filter: (constructionSite) => {
                return constructionSite.structureType == STRUCTURE_ROAD
            }
        });
        if (constructionSitesQuaternary.length) {
            return constructionSitesQuaternary;
        }

        //Walls are last
        let constructionSitesQuinary = creep.room.find(FIND_CONSTRUCTION_SITES, {
            filter: (constructionSite) => {
                return constructionSite.structureType == STRUCTURE_WALL
            }
        });
        if (constructionSitesQuinary.length) {
            return constructionSitesQuinary;
        }

        return undefined;
    }
};
