import { actionSupplyEnergy } from "actions/action.SupplyEnergy";
import { Roles } from "constants/enum.Roles";
import { actionHarvest } from "actions/action.Harvest";
import { RoomMemory } from "interfaces/interface.RoomMemory";
import { BaseCreep } from "./controller.Creep.BaseCreep";
import { PlannerAttributes } from "attributes/class.Planner.Attributes";
import { actionPlanExtension } from "actions/action.PlanExtension";
import { actionUpgrade } from "actions/action.Upgrade";

export class Planner extends BaseCreep {
    constructor(){
        super(Roles.Planner, 1, new PlannerAttributes()) //We should always have a Planner (hence 1)
    }

    NeedToSpawn(spawnPoint: string) {
        this.currentRoleNeeded = this.getCurrentPlannersNeed(spawnPoint); //Important, must set this for base NeedToSpawn class to work properly
        return super.NeedToSpawn(spawnPoint); //Calls the inherited classes NeedToSpawn method (which is generic across roles)
    }

    Act(creep: Creep) {
        //Planner Actions Priority should be: Plan Extensions / Plan Defenses / Harvest / SupplyEnergy / Upgrade
        let planExtension: actionPlanExtension = new actionPlanExtension();
        let supplyEnergy: actionSupplyEnergy = new actionSupplyEnergy();
        let harvest: actionHarvest = new actionHarvest();

        //TODO: Plan Roads/Defenses.
        if(planExtension.IsNecessary(creep)){
            planExtension.Exectute(creep);
        }

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

        (Game.spawns[spawnPoint].room.memory as RoomMemory).Planners.CurrentCreepNeed = currentPlannerNeed;

        //console.log("Planers Needed: " + currentPlannerNeed);
        return currentPlannerNeed;
    }
};
