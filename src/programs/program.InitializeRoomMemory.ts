import { RoomMemory } from "interfaces/interface.RoomMemory";
import { RoomGameStates } from "constants/enum.RoomGameStates";
import { Roles } from "constants/enum.Roles";
import { RoomMemoryRoleInformation } from "interfaces/interface.RoomMemoryRoleInformation";
import { Butler } from "controllers/controller.Creep.Butler";
import { Builder } from "controllers/controller.Creep.Builder";
import { CreepSizeRanks } from "constants/enum.CreepSizeRanks";

export class programInitializeRoomMemory {
    constructor() {
    }

    Run() {
        //Example console command to adjusting RoomMemory manually:
        //Memory.rooms.[roomname].CurrentEnergySource = 0;

        for (var roomName in Game.rooms) {//Loop through my rooms
            var room = Game.rooms[roomName];
            if (!(room.memory as RoomMemory).CurrentGameState) {//If this room has no current game state
                console.log("Initializing Room Memory for Room " + roomName + "!");
                (room.memory as RoomMemory).CurrentGameState = RoomGameStates.Peace;
                (room.memory as RoomMemory).CurrentEnergySource = [];
                (room.memory as RoomMemory).CurrentRoleBuildPriority = Roles.Butler;
                (room.memory as RoomMemory).CurrentAllies = [];
                (room.memory as RoomMemory).CurrentMinCreepSizeRank = CreepSizeRanks.Mini;
                (room.memory as RoomMemory).CurrentMaxCreepSizeRank = CreepSizeRanks.Mega;
                (room.memory as RoomMemory).CurrentMaxCreeps = 25;
                (room.memory as RoomMemory).Butlers = {
                    CurrentCreepCount: 0,
                    CurrentCreepNeed: 0,
                    CurrentCreepWorth: 0
                };
                (room.memory as RoomMemory).Builders = {
                    CurrentCreepCount: 0,
                    CurrentCreepNeed: 0,
                    CurrentCreepWorth: 0
                };
                (room.memory as RoomMemory).Pavers = {
                    CurrentCreepCount: 0,
                    CurrentCreepNeed: 0,
                    CurrentCreepWorth: 0
                };
                (room.memory as RoomMemory).Masons = {
                    CurrentCreepCount: 0,
                    CurrentCreepNeed: 0,
                    CurrentCreepWorth: 0
                };
                (room.memory as RoomMemory).Upgraders = {
                    CurrentCreepCount: 0,
                    CurrentCreepNeed: 0,
                    CurrentCreepWorth: 0
                };
                (room.memory as RoomMemory).Scouts = {
                    CurrentCreepCount: 0,
                    CurrentCreepNeed: 0,
                    CurrentCreepWorth: 0
                };
                (room.memory as RoomMemory).Paladins = {
                    CurrentCreepCount: 0,
                    CurrentCreepNeed: 0,
                    CurrentCreepWorth: 0
                };
                (room.memory as RoomMemory).Archers = {
                    CurrentCreepCount: 0,
                    CurrentCreepNeed: 0,
                    CurrentCreepWorth: 0
                };
                (room.memory as RoomMemory).Marines = {
                    CurrentCreepCount: 0,
                    CurrentCreepNeed: 0,
                    CurrentCreepWorth: 0
                };
                (room.memory as RoomMemory).Snipers = {
                    CurrentCreepCount: 0,
                    CurrentCreepNeed: 0,
                    CurrentCreepWorth: 0
                };
                (room.memory as RoomMemory).SiegeCraft = {
                    CurrentCreepCount: 0,
                    CurrentCreepNeed: 0,
                    CurrentCreepWorth: 0
                };
                (room.memory as RoomMemory).Doctors = {
                    CurrentCreepCount: 0,
                    CurrentCreepNeed: 0,
                    CurrentCreepWorth: 0
                };
                (room.memory as RoomMemory).Colonists = {
                    CurrentCreepCount: 0,
                    CurrentCreepNeed: 0,
                    CurrentCreepWorth: 0
                };
            }
        }
    }
};
