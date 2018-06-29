import { CreepSizes } from "constants/enum.CreepSizes";

export interface CreepMemory {
    Role: string;
    CurrentAction: string;
    CurrentEnergySource: number;
    CurrentSize?: CreepSizes;
    CurrentWorth?: number;
};
