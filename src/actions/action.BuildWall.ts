import { CreepMemory } from "interfaces/interface.CreepMemory";
import { Actions } from "constants/enum.Actions";
import { PathStrokes } from "constants/enum.PathStrokes";
import { actionCommunicate } from "./action.Communicate";

export class actionBuildWall {
    constructor() {
    }

    IsNecessary(creep: Creep) {
        var targets = creep.room.find(FIND_CONSTRUCTION_SITES, {
            filter: (constructionSite) => {
                return constructionSite.structureType == STRUCTURE_WALL
            }
        });

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
            (creep.memory as CreepMemory).CurrentAction = Actions.BuildWall;

            //console.log(targets[0]);
            if (creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                let communicate: actionCommunicate = new actionCommunicate();
                communicate.Execute(creep);

                creep.moveTo(targets[0], { visualizePathStyle: { stroke: PathStrokes.Build } });
            }
        }
    }

    private getBuildTarget(creep: Creep) {
        //Walls are infrastructure that are relatively quick to build
        let WallsToBuild = creep.room.find(FIND_CONSTRUCTION_SITES, {
            filter: (constructionSite) => {
                return constructionSite.structureType == STRUCTURE_WALL
            }
        });
        if (WallsToBuild.length) {
            return WallsToBuild;
        }

        return undefined;
    }
};
