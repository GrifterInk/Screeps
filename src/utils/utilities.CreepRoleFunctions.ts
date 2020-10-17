import { Roles } from "constants/enum.Roles";
import { CreepMemory } from "interfaces/interface.CreepMemory";
import { RoomMemory } from "interfaces/interface.RoomMemory";

export class CreepRoleFunctions {
    constructor() {
    }

    static GetCurrentCreepCountForRole(spawnPoint: string, creepRole: Roles) {
        let currentCreepsInRoleCount: number = 0;
        var creeps = _.filter(Game.creeps, (creep) => (creep.memory as CreepMemory).Role == creepRole);

        if (creeps.length) {
            currentCreepsInRoleCount = creeps.length;
        }

        //Update RoomMemory with current Count Information (Role Specific)
        switch (creepRole) {
            case Roles.Butler:
                (Game.spawns[spawnPoint].room.memory as RoomMemory).Butlers.CurrentCreepCount = currentCreepsInRoleCount;
                break;
            case Roles.Upgrader:
                (Game.spawns[spawnPoint].room.memory as RoomMemory).Upgraders.CurrentCreepCount = currentCreepsInRoleCount;
                break;
            case Roles.Planner:
                (Game.spawns[spawnPoint].room.memory as RoomMemory).Planners.CurrentCreepCount = currentCreepsInRoleCount;
                break;
            case Roles.Builder:
                (Game.spawns[spawnPoint].room.memory as RoomMemory).Builders.CurrentCreepCount = currentCreepsInRoleCount;
                break;
            case Roles.Paver:
                (Game.spawns[spawnPoint].room.memory as RoomMemory).Pavers.CurrentCreepCount = currentCreepsInRoleCount;
                break;
            case Roles.Mason:
                (Game.spawns[spawnPoint].room.memory as RoomMemory).Masons.CurrentCreepCount = currentCreepsInRoleCount;
                break;
        }

        return currentCreepsInRoleCount;
    }

    static GetCurrentCreepWorthForRole(spawnPoint: string, creepRole: Roles) {
        let currentCreepsInRoleWorth: number = 0;
        var creeps = _.filter(Game.creeps, (creep) => (creep.memory as CreepMemory).Role == creepRole);

        creeps.forEach(creep => {
            if ((creep.memory as CreepMemory).CurrentWorth) {
                currentCreepsInRoleWorth += ((creep.memory as CreepMemory).CurrentWorth as number);
            }
        });

        //Update RoomMemory with current Worth Information (Role Specific)
        switch (creepRole) {
            case Roles.Butler:
                (Game.spawns[spawnPoint].room.memory as RoomMemory).Butlers.CurrentCreepWorth = currentCreepsInRoleWorth;
                break;
            case Roles.Upgrader:
                (Game.spawns[spawnPoint].room.memory as RoomMemory).Upgraders.CurrentCreepWorth = currentCreepsInRoleWorth;
                break;
            case Roles.Planner:
                (Game.spawns[spawnPoint].room.memory as RoomMemory).Planners.CurrentCreepWorth = currentCreepsInRoleWorth;
                break;
            case Roles.Builder:
                (Game.spawns[spawnPoint].room.memory as RoomMemory).Builders.CurrentCreepWorth = currentCreepsInRoleWorth;
                break;
            case Roles.Paver:
                (Game.spawns[spawnPoint].room.memory as RoomMemory).Pavers.CurrentCreepWorth = currentCreepsInRoleWorth;
                break;
            case Roles.Mason:
                (Game.spawns[spawnPoint].room.memory as RoomMemory).Masons.CurrentCreepWorth = currentCreepsInRoleWorth;
                break;
        }

        return currentCreepsInRoleWorth;
    }
}
