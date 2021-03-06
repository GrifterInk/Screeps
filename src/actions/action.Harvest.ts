import { CreepMemory } from "interfaces/interface.CreepMemory";
import { Actions } from "constants/enum.Actions";
import { PathStrokes } from "constants/enum.PathStrokes";
import { RoomMemory } from "interfaces/interface.RoomMemory";
import { arrayFunctions } from "utils/utilities.ArrayFunctions";
import { actionCommunicate } from "./action.Communicate";
import { actionPlanRoad } from "./action.PlanRoad";

export class actionHarvest {
    constructor() {
    }

    IsNecessary(creep: Creep) {
        if (creep.carry.energy == creep.carryCapacity) {
            (creep.memory as CreepMemory).CurrentEnergySource = null;
            //console.log("No Need to Harvest");
            return false;
        }
        else if (creep.carry.energy == 0 || (creep.memory as CreepMemory).CurrentAction == Actions.Harvest) {
            //console.log("Need to Harvest");
            return true;
        }

        return false; //This is important as false - if you set it to true, creeps will only expend 1 energy and then go back to harvesting!
    }

    Execute(creep: Creep) {
        (creep.memory as CreepMemory).CurrentAction = Actions.Harvest;

        var sources = creep.room.find(FIND_SOURCES);
        this.determineCurrentEnergySource(creep, sources.length, true); //Try finding Closest first

        let currentEnergySource: Source | null = (creep.memory as CreepMemory).CurrentEnergySource;

        if (currentEnergySource) {
            //Logic to keep creeps from attempting to get energy from a source they cannot reach, includes mechanism to keep from infinite looping
            if (creep.moveTo(currentEnergySource.pos) == ERR_NO_PATH) {
                //console.log("Desired Source [" + (creep.memory as CreepMemory).CurrentEnergySource + "] is unable to be reached!  Determining new Energy Source");
                (creep.memory as CreepMemory).CurrentEnergySource = null;
                this.determineCurrentEnergySource(creep, sources.length, false); //If closest is blocked, try random
                //console.log("New Energy Source: [" + (creep.memory as CreepMemory).CurrentEnergySource + "]");
            }
            else if (creep.harvest(currentEnergySource) == ERR_NOT_IN_RANGE) {
                let communicate: actionCommunicate = new actionCommunicate();
                communicate.Execute(creep);

                creep.moveTo(currentEnergySource, { visualizePathStyle: { stroke: PathStrokes.Harvest } });
                let planRoad: actionPlanRoad = new actionPlanRoad();
                planRoad.Execute(creep); //Plan road for the path to the source.
            }
        }
    }

    private determineCurrentEnergySource(creep: Creep, numberOfSources: number, useClosest: boolean) {
        var sources = creep.room.find(FIND_SOURCES_ACTIVE);
        if (useClosest) {
            var closestSource = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
            (creep.memory as CreepMemory).CurrentEnergySource = closestSource;
        }
        else {
            if (!(creep.room.memory as RoomMemory).CurrentEnergySource.length) { //Room is currently set to pull randomly from its energy sources
                if ((creep.memory as CreepMemory).CurrentEnergySource == null) {
                    var randomSourceID = Math.floor(Math.random() * numberOfSources);

                    //Weighting source to 0 because it has more ports open
                    //console.log("Random Source ID: " + randomSourceID + " Source Length: " + sources.length + 3);
                    // if (randomSourceID > 0) {
                    //     randomSourceID = 0;
                    // }
                    // else {
                    //     randomSourceID = 1;
                    // }

                    (creep.memory as CreepMemory).CurrentEnergySource = sources[randomSourceID];
                    //console.log("Current Energy Source: " + (creep.memory as CreepMemory).CurrentEnergySource);
                }
            }
            else { //Room is set to use a specific energy source via Memory
                if ((creep.memory as CreepMemory).CurrentEnergySource == null) {
                    (creep.memory as CreepMemory).CurrentEnergySource = sources[arrayFunctions.GetRandomValueFromArray((creep.room.memory as RoomMemory).CurrentEnergySource)];
                }
            }
        }
    }
};
