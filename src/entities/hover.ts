import { DirectionEnum } from '../enums/direction.enum'

export class Hover {
  private coordinates: number[];
  private direction: DirectionEnum;

  constructor(x: number, y: number, direction: DirectionEnum){
    if(!Object.keys(DirectionEnum).includes(direction)){
      throw new Error(`This Direction is not allowed: ${direction}`);  
    }
    this.coordinates = [x, y];
    this.direction = direction;
  }
}