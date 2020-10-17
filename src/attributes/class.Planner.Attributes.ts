
import { RoleAttributes } from "interfaces/interface.RoleAttributes";

export class PlannerAttributes implements RoleAttributes {
    //Mini Planner: 1 WORK / 2 MOVE Total Cost: 200 Energy for 3 total parts
    Mini = [WORK, MOVE, MOVE];
    MiniCost = 200;
    MiniWorth = 1;

    //Tiny Planner: 2 WORK / 2 MOVE Total Cost: 400 Energy for 6 total parts
    Tiny = [
        WORK, WORK, MOVE,
        MOVE, MOVE, MOVE
    ];
    TinyCost = 400;
    TinyWorth = 2;

    //Small Planner: 4 WORK / 8 MOVE Total Cost: 800 Energy for 12 total parts
    Small = [
        WORK, WORK, WORK, WORK,
        MOVE, MOVE, MOVE, MOVE,
        MOVE, MOVE, MOVE, MOVE
    ];
    SmallCost = 800;
    SmallWorth = 3;

    //Medium Planner: 6 WORK / 14 MOVE Total Cost: 1300 Energy for 20 total parts
    Medium = [
        WORK, WORK, WORK, WORK, WORK, WORK,
        MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,
        MOVE, MOVE, MOVE, MOVE, MOVE, MOVE
    ];
    MediumCost = 1300;
    MediumWorth = 6;

    //Large Planner: 8 WORK / 5 TOUGH / 18 MOVE Total Cost: 1750 Energy for 31 total parts
    Large = [
        WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK,
        TOUGH, TOUGH, TOUGH, TOUGH, TOUGH,
        MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,
        MOVE, MOVE, MOVE, MOVE, MOVE, MOVE
    ];
    LargeCost = 1750;
    LargeWorth = 8;

    //Jumbo Planner: 10 WORK / 10 TOUGH / 24 MOVE Total Cost: 2300 Energy for 44 total parts
    Jumbo = [
        WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK,
        TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH,
        MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,
        MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE
    ];
    JumboCost = 2300;
    JumboWorth = 12;

    //Mega Planner: 12 WORK / 10 TOUGH / 28 MOVE Total Cost: 2700 Energy for 50 total parts
    Mega = [
        WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK,
        TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH,
        MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,
        MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE
    ];
    MegaCost = 2700;
    MegaWorth = 14;
}

// BODYPART_COST: {
//     "move": 50,
//     "work": 100,
//     "carry": 50,

//     "attack": 80,
//     "heal": 250,
//     "ranged_attack": 150,
//     "tough": 10,
//     "claim": 600
// }
