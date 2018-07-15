import { Roles } from "constants/enum.Roles";
import { RoomGameStates } from "constants/enum.RoomGameStates";
import { RoomMemoryRoleInformation } from "./interface.RoomMemoryRoleInformation";

//Example console command to adjusting RoomMemory manually:
//Memory.rooms.[roomname].CurrentEnergySource = 0;
export interface RoomMemory {
    CurrentEnergySource: number[];
    CurrentGameState: RoomGameStates;
    CurrentRoleBuildPriority: Roles;
    CurrentAllies: string[];
    Butlers: RoomMemoryRoleInformation;
    Builders: RoomMemoryRoleInformation;
    Pavers: RoomMemoryRoleInformation;
    Masons: RoomMemoryRoleInformation;
    Upgraders: RoomMemoryRoleInformation;
    Scouts: RoomMemoryRoleInformation;
    Paladins: RoomMemoryRoleInformation;
    Archers: RoomMemoryRoleInformation;
    Marines: RoomMemoryRoleInformation;
    Snipers: RoomMemoryRoleInformation;
    SiegeCraft: RoomMemoryRoleInformation;
    Doctors: RoomMemoryRoleInformation;
    Colonists: RoomMemoryRoleInformation;
};
