import { Tower } from "controllers/controller.Structure.Tower";
import { SpawnPoints } from "constants/array.SpawnPoints";

export class programTowerDefense {
    constructor() {
    }

    Run() {
        SpawnPoints.forEach(spawnPoint => {
            let tower: Tower = new Tower();

            tower.Defend(spawnPoint);
        });
    }
}
