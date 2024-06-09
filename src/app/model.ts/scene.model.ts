import { DirectionEnum } from "../helpers/constants";

export interface Scene {
  id: number;
  background_url: string;
  hitzones: hitzone[];
  message: string | null;
}

export interface hitzone {
  direction: DirectionEnum;
  goto: number;
}
