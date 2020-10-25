import { RoomPositionMapping } from "attributes/class.RoomPositionMapping";
import { PlanningFlagTypes } from "constants/enum.PlanningFlagTypes";
import { RoomMemory } from "interfaces/interface.RoomMemory";

export class actionFindPlainForConstructionSite {
    constructor() {
    }

    Execute(creep: Creep, siteType: PlanningFlagTypes) {
        let targetPosition: RoomPositionMapping | null = null;

        if (siteType == PlanningFlagTypes.Extension) {
            targetPosition = this.findSiteForExtension(creep);
        }

        return targetPosition;
    }

    private findSiteForExtension(creep: Creep) {
        let targetPosition: RoomPositionMapping | null = null;
        let roomMap: RoomPositionMapping[] = (creep.room.memory as RoomMemory).RoomMap;
        let foundPosition: boolean = false;

        if (roomMap && roomMap.length) {
            let extensions = roomMap.filter(rm => rm.CurrentOccupancy == "extension");

            if (extensions && extensions.length) { //We have other extensions built already, let's try to keep them grouped but with space in between.
                extensions.forEach(ext => {
                    if (!foundPosition && ext.X && ext.Y) {
                        let openNearbyPosition = this.getNearbyOpenPositions(new RoomPosition(ext.X, ext.Y, creep.room.name), 1, 2, roomMap);
                        if (openNearbyPosition) {
                            foundPosition = true;
                            targetPosition = openNearbyPosition;
                        }
                    }
                });
            }

            if (!foundPosition) { //No other extensions have been built or we couldn't find an open position near any of them, try to use the spawn point as an origin.
                var spawn = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return structure.structureType == STRUCTURE_SPAWN;
                    }
                });
                if (spawn && spawn.length) {
                    let openNearbyPosition = this.getNearbyOpenPositions(spawn[0].pos, 1, 3, roomMap);
                    if (openNearbyPosition) {
                        foundPosition = true;
                        targetPosition = openNearbyPosition;
                    }
                }
            }
        }

        return targetPosition;
    }


    private getNearbyOpenPositions(targetPosition: RoomPosition, bufferSpaces: number, searchRadius: number, roomMap: RoomPositionMapping[]) {
        // let nearbyPositions = roomMap.filter(rm =>
        //     rm.X && (rm.X >= (targetPosition.x - searchRadius) && rm.X <= (targetPosition.x - bufferSpaces) || (rm.X <= (targetPosition.x + searchRadius) && rm.X >= (targetPosition.x + bufferSpaces)))
        //     && rm.Y && (rm.Y >= (targetPosition.y - searchRadius) && rm.Y <= (targetPosition.y - bufferSpaces) || (rm.Y <= (targetPosition.y + searchRadius) && rm.Y >= (targetPosition.y + bufferSpaces)))
        //     && rm.CurrentOccupancy == "plain"
        // )

        let bufferXMin: number = targetPosition.x - bufferSpaces;
        let bufferXMax: number = targetPosition.x + bufferSpaces;
        let bufferYMin: number = targetPosition.y - bufferSpaces;
        let bufferYMax: number = targetPosition.y + bufferSpaces;


        let nearbyPositions = roomMap.filter(rm => rm.X && rm.Y
            && (rm.X >= targetPosition.x - searchRadius && rm.X <= targetPosition.x + searchRadius)
            && (rm.Y >= targetPosition.y - searchRadius && rm.Y <= targetPosition.y + searchRadius)
            && (
                (rm.X <= bufferXMin || rm.X >= bufferXMax)
                || (rm.Y <= bufferYMin || rm.Y >= bufferYMax)
            )
            && rm.CurrentOccupancy == "plain"
        )

        if (nearbyPositions && nearbyPositions.length) {
            //Favor positions that are vertical/horizontal before going diagonal.
            let returnPos: RoomPositionMapping | undefined = nearbyPositions.find(p => p.X == targetPosition.x);
            if (returnPos) {
                console.log("Found Vertical Position for Construction Site!");
                return returnPos;
            }

            returnPos = nearbyPositions.find(p => p.Y == targetPosition.y);
            if (returnPos) {
                console.log("Found Horizaontal Position for Construction Site!");
                return returnPos;
            }

            console.log("Found Diagonal Position for Construction Site!");
            return nearbyPositions[0]; //Couldn't find a position that was either horizontal or vertical, so just go no a diagonal.
        }

        return null;
    }
}
