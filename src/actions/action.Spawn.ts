import { CreepMemory } from "interfaces/interface.CreepMemory";
import { Roles } from "constants/enum.Roles";
import { ButlerAttributes } from "attributes/class.ButlerAttributes";
import { UpgraderAttributes } from "attributes/class.UpgraderAttributes";
import { CreepSizes } from "constants/enum.CreepSizes";
import { BuilderAttributes } from "attributes/class.BuilderAttributes";
import { RoleAttributes } from "interfaces/interface.RoleAttributes";
import { PaverAttributes } from "attributes/class.PaverAttributes";
import { MasonAttributes } from "attributes/class.MasonAttributes";
import { CreepRoleFunctions } from "utils/utilities.CreepRoleFunctions";

export class actionSpawn {
    constructor() {
    }

    Execute(spawnPoint: string, creepName: string, creepMemory: CreepMemory, creepRole: Roles, currentNumberOfCreepsInRole: number) {
        let creepAttributes = this.getRoleAttributes(creepRole);
        let currentEnergyCapacity = this.getEnergyCapacity(spawnPoint);

        if (creepAttributes && creepAttributes.MiniCost > 0) {
            if (this.canSpawnCreepOfSize(spawnPoint, creepName, creepMemory, creepRole, CreepSizes.Mega, creepAttributes.Mega, creepAttributes.MegaWorth, creepAttributes.MegaCost, 0, currentEnergyCapacity)) {
                //Spawn Mega Creep
                this.spawnCreepOfSize(spawnPoint, creepName, creepMemory, creepRole, CreepSizes.Mega, creepAttributes.Mega, creepAttributes.MegaWorth)
            }
            else if (this.canSpawnCreepOfSize(spawnPoint, creepName, creepMemory, creepRole, CreepSizes.Jumbo, creepAttributes.Jumbo, creepAttributes.JumboWorth, creepAttributes.JumboCost, creepAttributes.MegaCost, currentEnergyCapacity)) {
                //Spawn Jumbo Creep
                this.spawnCreepOfSize(spawnPoint, creepName, creepMemory, creepRole, CreepSizes.Jumbo, creepAttributes.Jumbo, creepAttributes.JumboWorth);
            }
            else if (this.canSpawnCreepOfSize(spawnPoint, creepName, creepMemory, creepRole, CreepSizes.Large, creepAttributes.Large, creepAttributes.LargeWorth, creepAttributes.LargeCost, creepAttributes.JumboCost, currentEnergyCapacity)) {
                //Spawn Large Creep
                this.spawnCreepOfSize(spawnPoint, creepName, creepMemory, creepRole, CreepSizes.Large, creepAttributes.Large, creepAttributes.LargeWorth)
            }
            else if (this.canSpawnCreepOfSize(spawnPoint, creepName, creepMemory, creepRole, CreepSizes.Medium, creepAttributes.Medium, creepAttributes.MediumWorth, creepAttributes.MediumCost, creepAttributes.LargeCost, currentEnergyCapacity)) {
                //Spawn Medium Creep
                this.spawnCreepOfSize(spawnPoint, creepName, creepMemory, creepRole, CreepSizes.Medium, creepAttributes.Medium, creepAttributes.MediumWorth)
            }
            else if (this.canSpawnCreepOfSize(spawnPoint, creepName, creepMemory, creepRole, CreepSizes.Small, creepAttributes.Small, creepAttributes.SmallWorth, creepAttributes.SmallCost, creepAttributes.MediumCost, currentEnergyCapacity)) {
                //Spawn Small Creep
                this.spawnCreepOfSize(spawnPoint, creepName, creepMemory, creepRole, CreepSizes.Small, creepAttributes.Small, creepAttributes.SmallWorth)
            }
            else if (this.canSpawnCreepOfSize(spawnPoint, creepName, creepMemory, creepRole, CreepSizes.Tiny, creepAttributes.Tiny, creepAttributes.TinyWorth, creepAttributes.TinyCost, creepAttributes.SmallCost, currentEnergyCapacity)) {
                //Spawn Tiny Creep
                this.spawnCreepOfSize(spawnPoint, creepName, creepMemory, creepRole, CreepSizes.Tiny, creepAttributes.Tiny, creepAttributes.TinyWorth)
            }
            else if (this.canSpawnCreepOfSize(spawnPoint, creepName, creepMemory, creepRole, CreepSizes.Mini, creepAttributes.Mini, creepAttributes.MiniWorth, creepAttributes.MiniCost, creepAttributes.TinyCost, currentEnergyCapacity)) {
                //Spawn Mini Creep
                this.spawnCreepOfSize(spawnPoint, creepName, creepMemory, creepRole, CreepSizes.Mini, creepAttributes.Mini, creepAttributes.MiniWorth)
            }
        }
    }

    private canSpawnCreepOfSize(spawnPoint: string, creepName: string, creepMemory: CreepMemory, creepRole: Roles, targetCreepSize: CreepSizes, bodyParts: BodyPartConstant[], creepSizeWorth: number, creepSizeCost: number, largerCreepSizeCost: number, currentEnergyCapacity: number) {
        //Logic Tree is basically:
        //  If you have 0 creeps of role, then spawn the biggest you can at the current time
        //  If you already have creeps of role, then wait until you have enough energy to create the biggest sized creep your capacity will allow and then create that sized creep
        //  BUT...we don't want to have to wait an exceptionally long time, so make sure our current energy is within a certain threshold of largest sized creep

        let fullName: string = targetCreepSize + "-" + creepName;
        let currentEnergyAvailable = this.getCurrentEnergyAvailable(spawnPoint);

        let threshold: number = 0;

        switch (targetCreepSize) {
            case CreepSizes.Mega:
                threshold = .90;
            case CreepSizes.Jumbo:
                threshold = .80;
            case CreepSizes.Large:
                threshold = .75;
            case CreepSizes.Medium:
                threshold = .60;
            case CreepSizes.Small:
                threshold = .40;
            case CreepSizes.Tiny:
                threshold = .20;
            case CreepSizes.Mini:
                threshold = 0;
        }

        if ((CreepRoleFunctions.GetCurrentCreepCountForRole(spawnPoint, creepRole) == 0  //if you have 0 creeps, spawn the biggest possible
            || (largerCreepSizeCost == 0) //Case of attempting to build a Mega creep - can't check the total capacity of the next size up
            || (currentEnergyCapacity >= creepSizeCost
                && currentEnergyCapacity < largerCreepSizeCost
                && currentEnergyAvailable >= Math.ceil(creepSizeCost * threshold))) //Case of checking what total capacity is available as well as checking to make sure we don't have to wait too long
            && Game.spawns[spawnPoint].spawnCreep(bodyParts, fullName, { memory: creepMemory, dryRun: true }) == 0) {
            return true;
        }

        return false;
    }

    private getEnergyCapacity(spawnPoint: string) {
        return Game.spawns[spawnPoint].room.energyCapacityAvailable;
    }

    private getCurrentEnergyAvailable(spawnPoint: string) {
        return Game.spawns[spawnPoint].room.energyAvailable;
    }

    private canSpawnCreepOfSize2(spawnPoint: string, creepName: string, creepMemory: CreepMemory, creepRole: Roles, targetCreepSize: CreepSizes, bodyParts: BodyPartConstant[], creepSizeWorth: number) {
        let fullName: string = targetCreepSize + "-" + creepName;

        if (Game.spawns[spawnPoint].spawnCreep(bodyParts, fullName, { memory: creepMemory, dryRun: true }) == 0) {
            return true;
        }

        return false;
    }

    private spawnCreepOfSize(spawnPoint: string, creepName: string, creepMemory: CreepMemory, creepRole: Roles, targetCreepSize: CreepSizes, bodyParts: BodyPartConstant[], creepSizeWorth: number) {
        let fullName: string = targetCreepSize + "-" + creepName;

        console.log('Spawning new ' + targetCreepSize + ' Sized ' + creepRole + ': ' + fullName);
        creepMemory.CurrentSize = targetCreepSize;
        creepMemory.CurrentWorth = creepSizeWorth;
        Game.spawns[spawnPoint].spawnCreep(bodyParts, fullName, { memory: creepMemory });
    }

    private getRoleAttributes(creepRole: Roles) {
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
