import { CreepMemory } from "interfaces/interface.CreepMemory";
import { Actions} from "constants/enum.Actions";
import { PathStrokes} from "constants/enum.PathStrokes";

export class actionHarvest {
    constructor() {
    }

    IsNecessary(creep: Creep){
        if (creep.carry.energy == creep.carryCapacity){
            (creep.memory as CreepMemory).CurrentEnergySource = -1;
            //console.log("No Need to Harvest");
            return false;
        }
        else if(creep.carry.energy == 0 || (creep.memory as CreepMemory).CurrentAction == Actions.Harvest) {
            //console.log("Need to Harvest");
            return true;
        }

        return false; //This is important as false - if you set it to true, creeps will only expend 1 energy and then go back to harvesting!
    }

    Execute(creep: Creep) {
        creep.say(Actions.Harvest);
        (creep.memory as CreepMemory).CurrentAction = Actions.Harvest;

        var sources = creep.room.find(FIND_SOURCES);
        this.determineCurrentEnergySource(creep, sources.length);

        //Logic to keep creeps from attempting to get energy from a source they cannot reach, includes mechanism to keep from infinite looping
        if (creep.moveTo(sources[(creep.memory as CreepMemory).CurrentEnergySource].pos) == ERR_NO_PATH){
            //console.log("Desired Source [" + (creep.memory as CreepMemory).CurrentEnergySource + "] is unable to be reached!  Determining new Energy Source");
            (creep.memory as CreepMemory).CurrentEnergySource = -1;
            this.determineCurrentEnergySource(creep, sources.length);
            //console.log("New Energy Source: [" + (creep.memory as CreepMemory).CurrentEnergySource + "]");
        }
        else if (creep.harvest(sources[(creep.memory as CreepMemory).CurrentEnergySource]) == ERR_NOT_IN_RANGE) {
            creep.moveTo(sources[(creep.memory as CreepMemory).CurrentEnergySource], { visualizePathStyle: { stroke: PathStrokes.Harvest } });
        }
    }

    private determineCurrentEnergySource(creep: Creep, numberOfSources: number){
        if ((creep.memory as CreepMemory).CurrentEnergySource == -1) {
            var randomSourceID = Math.floor(Math.random() * numberOfSources);

            //Weighting source to 0 because it has more ports open
            //console.log("Random Source ID: " + randomSourceID + " Source Length: " + sources.length + 3);
            // if (randomSourceID > 0) {
            //     randomSourceID = 0;
            // }
            // else {
            //     randomSourceID = 1;
            // }

            (creep.memory as CreepMemory).CurrentEnergySource = randomSourceID;
            //console.log("Current Energy Source: " + (creep.memory as CreepMemory).CurrentEnergySource);
        }
    }
};
