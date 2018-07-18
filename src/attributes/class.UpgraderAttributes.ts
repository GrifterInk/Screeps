import { RoleAttributes } from "interfaces/interface.RoleAttributes";

export class UpgraderAttributes implements RoleAttributes {
    //Mini Upgrader: 1 WORK / 1 CARRY / 1 MOVE Total Cost: 200 Energy for 3 total parts
    Mini = [WORK, CARRY, MOVE];
    MiniCost = 200;
    MiniWorth = 1;

    //Tiny Upgrader: 2 WORK / 2 CARRY / 1 MOVE Total Cost: 350 Energy for 5 total parts
    Tiny = [
        WORK, WORK,
        CARRY, CARRY,
        MOVE
    ];
    TinyCost = 350;
    TinyWorth = 1;

    //Small Upgrader: 4 WORK / 4 CARRY / 2 MOVE Total Cost: 700 Energy for 10 total parts
    Small = [
        WORK, WORK, WORK, WORK,
        CARRY, CARRY, CARRY, CARRY,
        MOVE, MOVE
    ];
    SmallCost = 700;
    SmallWorth = 1;

    //Medium Upgrader: 6 WORK / 8 CARRY / 4 MOVE Total Cost: 1200 Energy for 18 total parts
    Medium = [
        WORK, WORK, WORK, WORK, WORK, WORK,
        CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY,
        MOVE, MOVE, MOVE, MOVE
    ];
    MediumCost = 1200;
    MediumWorth = 2;

    //Large Upgrader: 8 WORK / 12 CARRY / 5 TOUGH / 6 MOVE Total Cost: 1750 Energy for 31 total parts
    Large = [
        WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK,
        CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY,
        TOUGH, TOUGH, TOUGH, TOUGH, TOUGH,
        MOVE, MOVE, MOVE, MOVE, MOVE, MOVE
    ];
    LargeCost = 1750;
    LargeWorth = 2;

    //Jumbo Upgrader: 10 WORK / 16 CARRY / 10 TOUGH / 8 MOVE Total Cost: 2300 Energy for 44 total parts
    Jumbo = [
        WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK,
        CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY,
        TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH,
        MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE
    ];
    JumboCost = 2300;
    JumboWorth = 3;

    //Mega Upgrader: 12 WORK / 18 CARRY / 10 TOUGH / 10 MOVE Total Cost: 2700 Energy for 50 total parts
    Mega = [
        WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK,
        CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY,
        TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH,
        MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE
    ];
    MegaCost = 2700;
    MegaWorth = 3;
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
