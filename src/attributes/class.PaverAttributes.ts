export class PaverAttributes {
    //Mini Paver: 1 WORK / 1 CARRY / 1 MOVE Total Cost: 200 Energy for 3 total parts
    Mini: BodyPartConstant[] = [WORK, CARRY, MOVE];
    MiniCost: number = 200;
    MiniWorth: number = 1

    //Tiny Paver: 2 WORK / 2 CARRY / 1 MOVE Total Cost: 350 Energy for 5 total parts
    Tiny: BodyPartConstant[] = [
        WORK, WORK,
        CARRY, CARRY,
        MOVE
    ];
    TinyCost: number = 350;
    TinyWorth: number = 2

    //Small Paver: 4 WORK / 4 CARRY / 2 MOVE Total Cost: 700 Energy for 10 total parts
    Small: BodyPartConstant[] = [
        WORK, WORK, WORK, WORK,
        CARRY, CARRY, CARRY, CARRY,
        MOVE, MOVE
    ];
    SmallCost: number = 700;
    SmallWorth: number = 3

    //Medium Paver: 6 WORK / 8 CARRY / 4 MOVE Total Cost: 1200 Energy for 18 total parts
    Medium: BodyPartConstant[] = [
        WORK, WORK, WORK, WORK, WORK, WORK,
        CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY,
        MOVE, MOVE, MOVE, MOVE
    ];
    MediumCost: number = 1200;
    MediumWorth: number = 4

    //Large Paver: 8 WORK / 12 CARRY / 5 TOUGH / 6 MOVE Total Cost: 1750 Energy for 31 total parts
    Large: BodyPartConstant[] = [
        WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK,
        CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY,
        TOUGH, TOUGH, TOUGH, TOUGH, TOUGH,
        MOVE, MOVE, MOVE, MOVE, MOVE, MOVE
    ];
    LargeCost: number = 1750;
    LargeWorth: number = 5

    //Jumbo Paver: 10 WORK / 16 CARRY / 10 TOUGH / 8 MOVE Total Cost: 2300 Energy for 44 total parts
    Jumbo: BodyPartConstant[] = [
        WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK,
        CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY,
        TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH,
        MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE
    ];
    JumboCost: number = 2300;
    JumboWorth: number = 6

    //Mega Paver: 12 WORK / 18 CARRY / 10 TOUGH / 10 MOVE Total Cost: 2700 Energy for 50 total parts
    Mega: BodyPartConstant[] = [
        WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK,
        CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY,
        TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH,
        MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE
    ];
    MegaCost: number = 2700;
    MegaWorth: number = 7
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
