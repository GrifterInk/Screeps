import { PlanningFlagTypes } from "constants/enum.PlanningFlagTypes";

export class PlanningFlag {
    FlagType: PlanningFlagTypes;
    PrimaryColor: ColorConstant;
    SecondaryColor: ColorConstant;

    constructor(flagType: PlanningFlagTypes, primaryColor: ColorConstant, secondaryColor: ColorConstant){
        this.FlagType = flagType;
        this.PrimaryColor = primaryColor;
        this.SecondaryColor = secondaryColor;
    }
}
