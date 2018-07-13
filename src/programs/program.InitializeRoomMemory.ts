import { RoomMemory } from "interfaces/interface.RoomMemory";
import { RoomGameStates } from "constants/enum.RoomGameStates";
import { Roles } from "constants/enum.Roles";

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
                (room.memory as RoomMemory).CurrentEnergySource = -1;
                (room.memory as RoomMemory).CurrentRoleBuildPriority = Roles.Butler;
            }
        }
    }
};
