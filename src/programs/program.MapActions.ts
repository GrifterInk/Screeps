import { CreepMemory } from "interfaces/interface.CreepMemory";
import { Butler } from "controllers/controller.Butler";
import { Roles } from "constants/enum.Roles";
import { Upgrader } from "controllers/controller.Upgrader";
import { Builder } from "controllers/controller.Builder";

export class programMapActions {
    constructor() {
    }

    Run() {
        for (var name in Game.creeps) {
            var creep = Game.creeps[name];

            if ((creep.memory as CreepMemory).Role == Roles.Butler) {
                let butler: Butler = new Butler();
                butler.Act(creep);
            }

            if ((creep.memory as CreepMemory).Role == Roles.Upgrader) {
                let upgrader: Upgrader = new Upgrader();
                upgrader.Act(creep);
            }

            if ((creep.memory as CreepMemory).Role == Roles.Builder) {
                let builder: Builder = new Builder();
                builder.Act(creep);
            }
        }
    }
};
