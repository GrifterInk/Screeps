import { actionSupplyEnergy } from "actions/action.SupplyEnergy";
import { actionUpgrade } from "actions/action.Upgrade";
import { Roles } from "constants/enum.Roles";
import { actionHarvest } from "actions/action.Harvest";
import { ButlerAttributes } from "attributes/class.ButlerAttributes";
import { RoomMemory } from "interfaces/interface.RoomMemory";
import { BaseCreep } from "./controller.Creep.BaseCreep";

export class Planner extends BaseCreep {
    constructor(){
        super(Roles.Planner, 1, new ButlerAttributes()) //We should always have a Planner (hence 1)
    }

    NeedToSpawn(spawnPoint: string) {
        this.currentRoleNeeded = this.getCurrentPlannersNeed(spawnPoint); //Important, must set this for base NeedToSpawn class to work properly
        return super.NeedToSpawn(spawnPoint); //Calls the inherited classes NeedToSpawn method (which is generic across roles)
    }

    Act(creep: Creep) {
        //Butler Actions Priority should be: Plan Roads / Plan Defenses / Harvest / SupplyEnergy / Upgrade
        let supplyEnergy: actionSupplyEnergy = new actionSupplyEnergy();
        let harvest: actionHarvest = new actionHarvest();

        //TODO: Plan Roads/Defenses.

        if (harvest.IsNecessary(creep)) {
            harvest.Execute(creep);
        }
        else if (supplyEnergy.IsNecessary(creep)) {
            supplyEnergy.Execute(creep);
        }
        else {
            let upgrade: actionUpgrade = new actionUpgrade();
            upgrade.Execute(creep);
        }
    }

    private getCurrentPlannersNeed(spawnPoint: string) {
        let currentPlannerNeed: number = this.baseRoleNeeded;

        if(!this.IsBlockedByCascadingRolesNeed(spawnPoint)){
            //I think we want 1 planner at all times, but probably only need 1 planner, so just stick with the baseRoleNeeded.
        }

        (Game.spawns[spawnPoint].room.memory as RoomMemory).Butlers.CurrentCreepNeed = currentPlannerNeed;

        return currentPlannerNeed;
    }
};
