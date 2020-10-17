import { Roles } from "constants/enum.Roles";
import { CreepMemory } from "interfaces/interface.CreepMemory";
import { CreepRoleFunctions } from "utils/utilities.CreepRoleFunctions";
import { actionSpawn } from "actions/action.Spawn";
import { InitializedRoles } from "constants/array.InitializedRole";
import { RoleAttributes } from "interfaces/interface.RoleAttributes";

export class BaseCreep {
    roleAttributes: RoleAttributes;
    currentRole: Roles;
    baseRoleNeeded: number;
    currentRoleNeeded: number;

    constructor(role: Roles, roleNeeded: number, attributes: RoleAttributes) {
        this.currentRole = role;
        this.baseRoleNeeded = roleNeeded;
        this.currentRoleNeeded = roleNeeded; //This will be dynamically updated but needs to be initialized to the base value as well.
        this.roleAttributes = attributes;
    }

    NeedToSpawn(spawnPoint: string) {
        CreepRoleFunctions.GetCurrentCreepCountForRole(spawnPoint, this.currentRole); //Important for Room Memory updating!
        let currentRoleWorth: number = CreepRoleFunctions.GetCurrentCreepWorthForRole(spawnPoint, this.currentRole);
        let currentRoleNeed: number = this.currentRoleNeeded;

        //console.log("Current " + this.currentRole + " Need: " + currentRoleNeed + " / Current " + this.currentRole + " Worth: " + currentRoleWorth);
        if (currentRoleNeed > currentRoleWorth) {
            //console.log("A new " + this.currentRole + " is needed!")
            return true;
        }

        //console.log("No new " + this.currentRole + "(s) are necessary at this time")
        return false;
    }

    Spawn(spawnPoint: string) {
        var creepName = this.currentRole + "_" + Game.time;

        let creepMemory: CreepMemory = { Role: this.currentRole, CurrentAction: "", CurrentEnergySource: null, CurrentSize: undefined, CurrentWorth: undefined };

        let spawn: actionSpawn = new actionSpawn();
        spawn.Execute(spawnPoint, creepName, creepMemory, this.currentRole, CreepRoleFunctions.GetCurrentCreepCountForRole(spawnPoint, this.currentRole));
    }

    IsBlockedByCascadingRolesNeed(spawnPoint: string) { //If we have an instance in the current role already, but don't have other instances of other classes that are necessary, be sure to build an instance of each necessary class before building subsequent of the current class.
        let blockedByCascadingRoleNeed: boolean = false;
        let foundCurrent: boolean = false;

        if(CreepRoleFunctions.GetCurrentCreepCountForRole(spawnPoint, this.currentRole) > 0){ //If this role has 0 creeps, then it cannot be blocked by a lesser role that has no creeps
            InitializedRoles.forEach(cascadingRole => {
                if(foundCurrent){
                    if(cascadingRole.NeedToSpawn(spawnPoint) && CreepRoleFunctions.GetCurrentCreepCountForRole(spawnPoint, cascadingRole.currentRole) == 0){
                        blockedByCascadingRoleNeed = true;
                    }
                }

                if(cascadingRole.currentRole == this.currentRole){
                    foundCurrent = true;
                }
            });
        }

        return blockedByCascadingRoleNeed;
    }
};
