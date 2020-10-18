import { BaseCreep } from "controllers/controller.Creep.BaseCreep";
import { Builder } from "controllers/controller.Creep.Builder";
import { Butler } from "controllers/controller.Creep.Butler";
import { Mason } from "controllers/controller.Creep.Mason";
import { Paver } from "controllers/controller.Creep.Paver";
//import { Planner } from "controllers/controller.Creep.Planner";
import { Upgrader } from "controllers/controller.Creep.Upgrader";

//Order of these is important, as it determines spawn order!
export const InitializedRoles: BaseCreep[] = [
    new Butler(),
    new Upgrader(),
    //new Planner(), //For now, handling road planning duties through actions
    new Builder(),
    new Paver(),
    new Mason()
]
