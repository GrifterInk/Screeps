import { Roles } from "constants/enum.Roles";
import { RoomGameStates } from "constants/enum.RoomGameStates";
import { RoomMemoryRoleInformation } from "./interface.RoomMemoryRoleInformation";
import { CreepSizeRanks } from "constants/enum.CreepSizeRanks";
import { RoomPositionMapping } from "../attributes/class.RoomPositionMapping";

//Example console command to adjusting RoomMemory manually:
//Memory.rooms.[roomname].CurrentEnergySource = 0;
export interface RoomMemory {
    CurrentEnergySource: number[];
    CurrentGameState: RoomGameStates;
    CurrentRoleBuildPriority: Roles;
    CurrentAllies: string[];
    CurrentMinCreepSizeRank: CreepSizeRanks;
    CurrentMaxCreepSizeRank: CreepSizeRanks;
    CurrentMaxCreeps: number;
    RoomMap: RoomPositionMapping[];
    Butlers: RoomMemoryRoleInformation;
    Planners: RoomMemoryRoleInformation;
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
