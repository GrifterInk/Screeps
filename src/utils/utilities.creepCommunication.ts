import { Actions } from "constants/enum.Actions";
import { CreepMemory } from "interfaces/interface.CreepMemory";

export class creepCommunication {
    constructor() {
    }

    static Talk(creep: Creep) {
        var random = Math.floor(Math.random() * 10);  //Want them typically not saying anything

        if(random === 0){
            creep.say(creep.name);
        }
        else if (random === 1){
            creep.say((creep.memory as CreepMemory).Role);
        }
        else if (random === 2){
            creep.say((creep.memory as CreepMemory).CurrentAction);
        }
    }
};