import { CreepMemory } from "interfaces/interface.CreepMemory";
import { Roles } from "constants/enum.Roles";
import { ButlerAttributes } from "attributes/class.ButlerAttributes";
import { UpgraderAttributes } from "attributes/class.UpgraderAttributes";
import { CreepSizes } from "constants/enum.CreepSizes";
import { BuilderAttributes } from "attributes/class.BuilderAttributes";
import { RoleAttributes } from "interfaces/interface.RoleAttributes";
import { PaverAttributes } from "attributes/class.PaverAttributes";
import { MasonAttributes } from "attributes/class.MasonAttributes";
import { CreepRoleFunctions } from "./utilities.CreepRoleFunctions";

export class CreepSpawner {
    constructor() {
    }

    static SpawnProperSizedCreep(spawnPoint: string, creepName: string, creepMemory: CreepMemory, creepRole: Roles, currentNumberOfCreepsInRole: number) {
        let creepAttributes = this.getRoleAttributes(creepRole);
        let currentEnergyCapacity = this.getEnergyCapacity(spawnPoint);

        if (creepAttributes && creepAttributes.MiniCost > 0) {
            //Logic Tree is basically:
            //  If you have 0 creeps of role, then spawn the biggest you can at the current time
            //  If you already have creeps of role, then wait until you have enough energy to create the biggest sized creep your capacity will allow and then create that sized creep

            if (this.canSpawnCreepOfSize(spawnPoint, creepName, creepMemory, creepRole, CreepSizes.Mega, creepAttributes.Mega, creepAttributes.MegaWorth)) {
                //Spawn Mega Creep
                this.spawnCreepOfSize(spawnPoint, creepName, creepMemory, creepRole, CreepSizes.Mega, creepAttributes.Mega, creepAttributes.MegaWorth)
            }
            else if ((CreepRoleFunctions.GetCurrentCreepCountForRole(spawnPoint, creepRole) == 0
                || (currentEnergyCapacity >= creepAttributes.JumboWorth && currentEnergyCapacity < creepAttributes.MegaWorth))
                && this.canSpawnCreepOfSize(spawnPoint, creepName, creepMemory, creepRole, CreepSizes.Jumbo, creepAttributes.Jumbo, creepAttributes.JumboWorth)) {
                //Spawn Jumbo Creep
                this.spawnCreepOfSize(spawnPoint, creepName, creepMemory, creepRole, CreepSizes.Jumbo, creepAttributes.Jumbo, creepAttributes.JumboWorth);
            }
            else if ((CreepRoleFunctions.GetCurrentCreepCountForRole(spawnPoint, creepRole) == 0
                || (currentEnergyCapacity >= creepAttributes.LargeWorth && currentEnergyCapacity < creepAttributes.JumboWorth))
                && this.canSpawnCreepOfSize(spawnPoint, creepName, creepMemory, creepRole, CreepSizes.Large, creepAttributes.Large, creepAttributes.LargeWorth)) {
                //Spawn Large Creep
                this.spawnCreepOfSize(spawnPoint, creepName, creepMemory, creepRole, CreepSizes.Large, creepAttributes.Large, creepAttributes.LargeWorth)
            }
            else if ((CreepRoleFunctions.GetCurrentCreepCountForRole(spawnPoint, creepRole) == 0
                || (currentEnergyCapacity >= creepAttributes.MediumWorth && currentEnergyCapacity < creepAttributes.LargeWorth))
                && this.canSpawnCreepOfSize(spawnPoint, creepName, creepMemory, creepRole, CreepSizes.Medium, creepAttributes.Medium, creepAttributes.MediumWorth)) {
                //Spawn Medium Creep
                this.spawnCreepOfSize(spawnPoint, creepName, creepMemory, creepRole, CreepSizes.Medium, creepAttributes.Medium, creepAttributes.MediumWorth)
            }
            else if ((CreepRoleFunctions.GetCurrentCreepCountForRole(spawnPoint, creepRole) == 0
                || (currentEnergyCapacity >= creepAttributes.SmallWorth && currentEnergyCapacity < creepAttributes.MediumWorth))
                && this.canSpawnCreepOfSize(spawnPoint, creepName, creepMemory, creepRole, CreepSizes.Small, creepAttributes.Small, creepAttributes.SmallWorth)) {
                //Spawn Small Creep
                this.spawnCreepOfSize(spawnPoint, creepName, creepMemory, creepRole, CreepSizes.Small, creepAttributes.Small, creepAttributes.SmallWorth)
            }
            else if ((CreepRoleFunctions.GetCurrentCreepCountForRole(spawnPoint, creepRole) == 0
                || (currentEnergyCapacity >= creepAttributes.TinyWorth && currentEnergyCapacity < creepAttributes.SmallWorth))
                && this.canSpawnCreepOfSize(spawnPoint, creepName, creepMemory, creepRole, CreepSizes.Tiny, creepAttributes.Tiny, creepAttributes.TinyWorth)) {
                //Spawn Tiny Creep
                this.spawnCreepOfSize(spawnPoint, creepName, creepMemory, creepRole, CreepSizes.Tiny, creepAttributes.Tiny, creepAttributes.TinyWorth)
            }
            else if ((CreepRoleFunctions.GetCurrentCreepCountForRole(spawnPoint, creepRole) == 0
                || (currentEnergyCapacity >= creepAttributes.MiniWorth && currentEnergyCapacity < creepAttributes.TinyWorth))
                && this.canSpawnCreepOfSize(spawnPoint, creepName, creepMemory, creepRole, CreepSizes.Mini, creepAttributes.Mini, creepAttributes.MiniWorth)) {
                //Spawn Mini Creep
                this.spawnCreepOfSize(spawnPoint, creepName, creepMemory, creepRole, CreepSizes.Mini, creepAttributes.Mini, creepAttributes.MiniWorth)
            }
        }
    }

    private static getEnergyCapacity(spawnPoint: string) {
        return Game.spawns[spawnPoint].room.energyCapacityAvailable;
    }

    private static canSpawnCreepOfSize(spawnPoint: string, creepName: string, creepMemory: CreepMemory, creepRole: Roles, targetCreepSize: CreepSizes, bodyParts: BodyPartConstant[], creepSizeWorth: number) {
        let fullName: string = targetCreepSize + "-" + creepName;

        if (Game.spawns[spawnPoint].spawnCreep(bodyParts, fullName, { memory: creepMemory, dryRun: true }) == 0) {
            return true;
        }

        return false;
    }

    private static spawnCreepOfSize(spawnPoint: string, creepName: string, creepMemory: CreepMemory, creepRole: Roles, targetCreepSize: CreepSizes, bodyParts: BodyPartConstant[], creepSizeWorth: number) {
        let fullName: string = targetCreepSize + "-" + creepName;

        console.log('Spawning new ' + targetCreepSize + ' Sized ' + creepRole + ': ' + fullName);
        creepMemory.CurrentSize = targetCreepSize;
        creepMemory.CurrentWorth = creepSizeWorth;
        Game.spawns[spawnPoint].spawnCreep(bodyParts, fullName, { memory: creepMemory });
    }

    private static getRoleAttributes(creepRole: Roles) {
        let creepAttributes: RoleAttributes;

        if (creepRole == Roles.Butler) {
            creepAttributes = new ButlerAttributes();
        }
        else if (creepRole == Roles.Upgrader) {
            creepAttributes = new UpgraderAttributes();
        }
        else if (creepRole == Roles.Builder) {
            creepAttributes = new BuilderAttributes();
        }
        else if (creepRole == Roles.Paver) {
            creepAttributes = new PaverAttributes();
        }
        else if (creepRole == Roles.Mason) {
            creepAttributes = new MasonAttributes();
        }
        else {
            creepAttributes = {
                Mini: [],
                MiniCost: 0,
                MiniWorth: 0,
                Tiny: [],
                TinyCost: 0,
                TinyWorth: 0,
                Small: [],
                SmallCost: 0,
                SmallWorth: 0,
                Medium: [],
                MediumCost: 0,
                MediumWorth: 0,
                Large: [],
                LargeCost: 0,
                LargeWorth: 0,
                Jumbo: [],
                JumboCost: 0,
                JumboWorth: 0,
                Mega: [],
                MegaCost: 0,
                MegaWorth: 0
            };
        }

        return creepAttributes;
    }
}
