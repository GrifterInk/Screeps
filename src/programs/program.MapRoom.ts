import { RoomMemory } from "interfaces/interface.RoomMemory";
import { RoomPositionMapping } from "attributes/class.RoomPositionMapping";

//TODO: If the RoomMemory.RoomMap is null or length 0, then go 0-49 (X * Y) and map out the room.
export class programMapRoom {
    lowerBound: number = 0;
    upperBound: number = 49;

    constructor() {
    }

    Run() {

        for (var roomName in Game.rooms) {//Loop through my rooms
            var room = Game.rooms[roomName];
            let roomMap: RoomPositionMapping[] = [];

            if (!(room.memory as RoomMemory).RoomMap || (room.memory as RoomMemory).RoomMap.length == 0) {
                for (let xPos: number = this.lowerBound; xPos <= this.upperBound; xPos++) {
                    for (let yPos: number = this.lowerBound; yPos <= this.upperBound; yPos++) {
                        let currentOccupancy: string | undefined = undefined;
                        let foundOccupancy: boolean = false;
                        var posLook = room.lookAt(xPos, yPos);

                        posLook.forEach(lookConstant => {
                            if (!foundOccupancy) {
                                if (lookConstant.type == "structure") {
                                    currentOccupancy = (lookConstant.structure as Structure).structureType.toString();
                                    foundOccupancy = true;
                                }
                                else if (lookConstant.type == "constructionSite") {
                                    currentOccupancy = "constructionSite";
                                    foundOccupancy = true;
                                }
                                else if (lookConstant.type == "terrain") {
                                    currentOccupancy = lookConstant.terrain; //In case terrain comes first, don't mark foundOccupancy as true yet.
                                }
                            }
                        });

                        let roomPosition: RoomPositionMapping = new RoomPositionMapping();
                        roomPosition.X = xPos;
                        roomPosition.Y = yPos;
                        roomPosition.CurrentOccupancy = currentOccupancy;

                        roomMap.push(roomPosition);
                    }
                }

                (room.memory as RoomMemory).RoomMap = roomMap;
            }
        }
    }
}
