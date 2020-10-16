import { CreepMemory } from "interfaces/interface.CreepMemory";
import { Butler } from "controllers/controller.Creep.Butler";
import { Roles } from "constants/enum.Roles";
import { Upgrader } from "controllers/controller.Creep.Upgrader";
import { Builder } from "controllers/controller.Creep.Builder";
import { Paver } from "controllers/controller.Creep.Paver";
import { Mason } from "controllers/controller.Creep.Mason";

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

            if ((creep.memory as CreepMemory).Role == Roles.Paver) {
                let paver: Paver = new Paver();
                paver.Act(creep);
            }

            if ((creep.memory as CreepMemory).Role == Roles.Mason) {
                let mason: Mason = new Mason();
                mason.Act(creep);
            }
        }
    }
};
