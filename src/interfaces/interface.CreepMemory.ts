import { CreepSizes } from "constants/enum.CreepSizes";

export interface CreepMemory {
    Role: string;
    CurrentAction: string;
    CurrentEnergySource: Source | null; //number;
    CurrentSize?: CreepSizes;
    CurrentWorth?: number;
};
