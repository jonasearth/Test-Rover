import { CommandEnum } from '../enums/command.enum';
import { DirectionEnum } from '../enums/direction.enum'

export class Hover {
  private coordinates: number[];
  private direction: DirectionEnum;

  /**
   * get a new cordinate based in current direction
   */
  private getNewCoordinatesAfterMove = {
    [DirectionEnum.N]: () => [this.coordinates[0], this.coordinates[1]+1],
    [DirectionEnum.S]: () => [this.coordinates[0], this.coordinates[1]-1],
    [DirectionEnum.E]: () => [this.coordinates[0]+1, this.coordinates[1]],
    [DirectionEnum.W]: () => [this.coordinates[0]-1, this.coordinates[1]]
  }

  /**
   * get a new direction based in current direction and turn command
   */
  private getNewDirection = {
    [DirectionEnum.N]: (command: CommandEnum) => command === CommandEnum.L ? DirectionEnum.W:DirectionEnum.E,
    [DirectionEnum.S]: (command: CommandEnum) => command === CommandEnum.L ? DirectionEnum.E:DirectionEnum.W,
    [DirectionEnum.E]: (command: CommandEnum) => command === CommandEnum.L ? DirectionEnum.N:DirectionEnum.S,
    [DirectionEnum.W]: (command: CommandEnum) => command === CommandEnum.L ? DirectionEnum.S:DirectionEnum.N,
  }

  constructor(x: number, y: number, direction: DirectionEnum){
    if(!Object.keys(DirectionEnum).includes(direction)){
      throw new Error(`This Direction is not allowed: ${direction}`);  
    }
    this.coordinates = [x, y];
    this.direction = direction;
  }

  /**
   * do a list of commands 
   * @param commands 
   * @param worldSize 
   */
  public doCommands(commands:CommandEnum[], worldSize: number[]):void{
    commands.forEach((command)=>{
      if(command === CommandEnum.M){
        this.move(worldSize)
        return
      }
      this.turn(command)
    })
  }

  /**
   * move the hover to next coordinate
   * @param worldSize 
   */
  private move(worldSize: number[]):void {
    const newCoordinate = this.getNewCoordinatesAfterMove[this.direction]();
    if(
      newCoordinate[0] > worldSize[0] || newCoordinate[0] < 0 ||
      newCoordinate[1] > worldSize[1] || newCoordinate[1] < 0 
    ){
      throw new Error("Your hover was destroyed because it left the map :(");
    }
    this.coordinates = newCoordinate
  }

  /**
   * change hover's direction
   * @param command 
   */
  private turn(command: CommandEnum): void{
    this.direction = this.getNewDirection[this.direction](command)
  }

  public getDirection(): DirectionEnum {
    return this.direction
  }
  public getCoordinates(): number[] {
    return this.coordinates
  }
}