export class arrayFunctions {
    constructor() {
    }

    static GetRandomValueFromArray(myArray: any[]) {
        var rand = myArray[Math.floor(Math.random() * myArray.length)];

        return rand;
    }
};
