import { BaseCreep } from "controllers/controller.BaseCreep";
import { Builder } from "controllers/controller.Builder";
import { Butler } from "controllers/controller.Butler";
import { Mason } from "controllers/controller.Mason";
import { Paver } from "controllers/controller.Paver";
import { Upgrader } from "controllers/controller.Upgrader";

//Order of these is important, as it determines spawn order!
export const InitializedRoles: BaseCreep[] = [
    new Butler(),
    new Upgrader(),
    new Builder(),
    new Paver(),
    new Mason()
]
