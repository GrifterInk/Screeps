import { actionSupplyEnergy } from "actions/action.SupplyEnergy";
import { actionUpgrade } from "actions/action.Upgrade";
import { Roles } from "constants/enum.Roles";
import { actionHarvest } from "actions/action.Harvest";
import { UpgraderAttributes } from "attributes/class.UpgraderAttributes";
import { RoomMemory } from "interfaces/interface.RoomMemory";
import { BaseCreep } from "./controller.Creep.BaseCreep";

export class Upgrader extends BaseCreep {
    constructor() {
        super(Roles.Upgrader, 1, new UpgraderAttributes()); //We should always have 1 Upgrader
    }

    NeedToSpawn(spawnPoint: string) {
        this.currentRoleNeeded = this.getCurrentUpgradersNeed(spawnPoint); //Important, must set this for base NeedToSpawn class to work properly
        return super.NeedToSpawn(spawnPoint); //Calls the inherited classes NeedToSpawn method (which is generic across roles)
    }

    Act(creep: Creep) {
        //Upgrader Actions Priority should be: Harvest / Upgrade
        let supplyEnergy: actionSupplyEnergy = new actionSupplyEnergy();
        let harvest: actionHarvest = new actionHarvest();

        if (harvest.IsNecessary(creep)) {
            harvest.Execute(creep);
        }
        else {
            let upgrade: actionUpgrade = new actionUpgrade();
            upgrade.Execute(creep);
        }
    }

    private getCurrentUpgradersNeed(spawnPoint: string) {
        let currentUpgradersNeed: number = this.baseRoleNeeded;

        //Want to really push upgrading, but not at the expense of not being able to do anything else
        //so adding some logic to make sure that we have at least 1 bot of other roles that are needed but have less priority than upgraders
        //Remember that as coded, we will still say we need 1 upgrader as higher priority than any lower priority roles
        if (!this.IsBlockedByCascadingRolesNeed(spawnPoint)) {
            let currentRoomControllerLevel = (Game.spawns[spawnPoint].room.controller as StructureController).level;

            if (currentRoomControllerLevel < 4) {
                currentUpgradersNeed = currentRoomControllerLevel + 4;
            }
            else if (currentRoomControllerLevel < 8) {
                currentUpgradersNeed = currentRoomControllerLevel + 8;
            }
            else if (currentRoomControllerLevel === 8) {
                currentUpgradersNeed = 1; //We only need 1 upgrader at level 8, because we just want to prevent the controller from degrading!
            }
        }

        (Game.spawns[spawnPoint].room.memory as RoomMemory).Upgraders.CurrentCreepNeed = currentUpgradersNeed;

        return currentUpgradersNeed;
    }
};
