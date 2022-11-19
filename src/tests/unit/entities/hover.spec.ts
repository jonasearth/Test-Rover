import { Hover } from "../../../entities/hover";
import { CommandEnum } from "../../../enums/command.enum";
import { DirectionEnum } from "../../../enums/direction.enum";

describe("constructor function", ()=>{
  test('should run successfully', ()=>{
    const hover = new Hover(1, 1, DirectionEnum.N);
   
    expect(hover.getCoordinates()).toEqual([1, 1])
    expect(hover.getDirection()).toEqual(DirectionEnum.N)
  })  
  test('should throw error becaus direction is wrong', ()=>{
    try {
      const hover = new Hover(1, 1, 'F' as DirectionEnum);
      
    } catch (error) {
      expect(error).toStrictEqual(new Error('This Direction is not allowed: F'))
    }
    expect.assertions(1)
  }) 
})

describe("doCommands function", ()=>{
  test('should run successfully', ()=>{
    const hover = new Hover(1, 1, DirectionEnum.N);
    hover.doCommands([
      CommandEnum.R,
      CommandEnum.M,
      CommandEnum.R,
      CommandEnum.M,
      CommandEnum.R,
      CommandEnum.M,
      CommandEnum.R,
      CommandEnum.M,
      CommandEnum.R,
      CommandEnum.M,
      CommandEnum.L,
      CommandEnum.M
    ], [5,5])
    expect(hover.getCoordinates()).toEqual([2, 2])
    expect(hover.getDirection()).toEqual(DirectionEnum.N)
    hover.doCommands([
      CommandEnum.L,
    ], [5,5])
    expect(hover.getDirection()).toEqual(DirectionEnum.W)
    hover.doCommands([
      CommandEnum.L,
    ], [5,5])
    expect(hover.getDirection()).toEqual(DirectionEnum.S)
    hover.doCommands([
      CommandEnum.L,
    ], [5,5])
    expect(hover.getDirection()).toEqual(DirectionEnum.E)
  })  
  test('should throw error because rover left the mapa', ()=>{
    const hover = new Hover(1, 1, DirectionEnum.N);
    try {
      hover.doCommands([
        CommandEnum.M,
        CommandEnum.M,
        CommandEnum.M,
        CommandEnum.M,
        CommandEnum.M,
        CommandEnum.M,
        CommandEnum.M,
      ], [5,5])
      
    } catch (error) {
      expect(error).toStrictEqual(new Error("Your hover was destroyed because it left the map :("))
    }
  })  
})
