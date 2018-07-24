import { CreepMemory } from "interfaces/interface.CreepMemory";

export class actionCommunicate {
    constructor() {
    }

    Execute(creep: Creep){
        var random = Math.floor(Math.random() * 100);  //Want them typically not saying anything

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
}
