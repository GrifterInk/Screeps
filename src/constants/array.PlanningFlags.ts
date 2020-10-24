import { PlanningFlag } from "attributes/class.PlanningFlag";
import { PlanningFlagTypes } from "./enum.PlanningFlagTypes";

export const PlanningFlags: PlanningFlag[] = [
    new PlanningFlag(PlanningFlagTypes.Road, COLOR_WHITE, COLOR_GREY),
    new PlanningFlag(PlanningFlagTypes.Extension, COLOR_YELLOW, COLOR_BROWN),
]
