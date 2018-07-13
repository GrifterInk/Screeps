import { Roles } from "constants/enum.Roles";
import { RoomGameStates } from "constants/enum.RoomGameStates";

//Example console command to adjusting RoomMemory manually:
//Memory.rooms.[roomname].CurrentEnergySource = 0;
export interface RoomMemory {
    CurrentEnergySource: number;
    CurrentGameState: RoomGameStates;
    CurrentRoleBuildPriority: Roles;
};
