import { Hover } from "../../../entities/hover";
import { DirectionEnum } from "../../../enums/direction.enum";
import { ParseData } from "../../../services/parseData.service"

describe("getFullDataFromString function", ()=>{
  test('should run successfully', ()=>{
    const parseData = new ParseData();
    jest.spyOn(parseData, 'verifyInput').mockReturnValue()
    jest.spyOn(parseData, 'getLinesFromString').mockReturnValue([])
    jest.spyOn(parseData, 'getSizeFromLines').mockReturnValue([])
    jest.spyOn(parseData, 'getHoversDataFromLines').mockReturnValue([])

    const response = parseData.getFullDataFromString('')
    expect(response).toEqual({
      size: [],
      hoversData: []
    })
  })  
})

describe("verifyInput function", ()=>{
  test('should run successfully', ()=>{
    const parseData = new ParseData();
    try{
      parseData.verifyInput(' ')
    } catch(e){
      throw new Error("Test Failed!");
    }
  })  
  test('should run successfully', ()=>{
    const parseData = new ParseData();
    try{
      parseData.verifyInput('@')
    } catch(e){
      expect(e).toStrictEqual(new Error("Caracter invalid on input: @"))
    }
    expect.assertions(1)
  })  
})
describe("isValid function", ()=>{
  test('should return true', ()=>{
    const parseData = new ParseData();
    expect(parseData.isValid('L')).toEqual(true)
  })  
  test('should return false', ()=>{
    const parseData = new ParseData();
    expect(parseData.isValid('%')).toEqual(false)
  })  
})


describe("getSizeFromLines function", ()=>{
  test('should return the size of the "world"', ()=>{
    const parseData = new ParseData();

    expect(parseData.getSizeFromLines(['5 5'])).toEqual([5,5])
  })   
  test('should throw error because size is invalid', ()=>{
    const parseData = new ParseData();
    try {
      parseData.getSizeFromLines(['5 a'])
    } catch (error) {
      
      expect(error).toStrictEqual(new Error("Invalid Size!"))
    }
    expect.assertions(1)

  })   
  test('should throw error because size length is invalid', ()=>{
    const parseData = new ParseData();

    try {
      parseData.getSizeFromLines(['5 2 2'])
    } catch (error) {
      
      expect(error).toStrictEqual(new Error("Invalid size lenth!"))
    }
    expect.assertions(1)

  })   
})
describe("getLinesFromString function", ()=>{
  test('should return lines', ()=>{
    const parseData = new ParseData();
    expect(parseData.getLinesFromString('a\na')).toEqual(['a', 'a'])
  })  
  
})
describe("getHoversDataFromLines function", ()=>{
  test('should return HoverData', ()=>{
    const parseData = new ParseData();
    parseData.size = [5,5]
    expect(parseData.getHoversDataFromLines(['5 5', '1 2 N','LMLMLMLMM'])).toHaveLength(1)
  })  
  test('should throw error because number of lines is invalid', ()=>{
    const parseData = new ParseData();

    try {
      parseData.getHoversDataFromLines(['5 2 2', 'asasd'])
    } catch (error) {
      
      expect(error).toStrictEqual(new Error("Invalid number of lines"))
    }
    expect.assertions(1)

  }) 
})

describe("parseLines function", ()=>{
  test('should return HoverData', ()=>{
    const parseData = new ParseData();
    parseData.size = [5,5]

    const response = parseData.parseLines(['1 2 N','LMLMLMLMM'])
    expect(response).toHaveLength(1)
    expect(response[0]).toMatchObject({ hover: expect.objectContaining({}), commands: ['L','M','L','M','L','M','L','M','M']})
  })  
})

describe("getHoverFromLine function", ()=>{
  test('should return HoverData', ()=>{
    const parseData = new ParseData();
    parseData.size = [5,5]

    const response = parseData.getHoverFromLine('1 2 N')
    const mockedHover = new Hover(1, 2, DirectionEnum.N)
    expect(response.getCoordinates).toEqual(mockedHover.getCoordinates)  
    expect(response.getDirection).toEqual(mockedHover.getDirection)  
  })

  test('should throw error becaus the length of info is invalid', ()=>{
    const parseData = new ParseData();
    parseData.size = [5,5]
    try {
      parseData.getHoverFromLine('1 2') 
    } catch (error) {
      expect(error).toStrictEqual(new Error("Invalid hover info"))
    }
    expect.assertions(1)

  })
  test('should throw error becaus the length of info is invalid', ()=>{
    const parseData = new ParseData();
    parseData.size = [5,5]
    try {
      parseData.getHoverFromLine('1 2 U') 
    } catch (error) {
      expect(error).toStrictEqual(new Error("Invalid Direction: U"))
    }
    expect.assertions(1)

  })
  test('should throw error becaus the length of info is invalid', ()=>{
    const parseData = new ParseData();
    parseData.size = [5,5]
    try {
      parseData.getHoverFromLine('1 22 N') 
    } catch (error) {
      expect(error).toStrictEqual(new Error("Invalid hover coordenates"))
    }
    expect.assertions(1)

  })
})


describe("getCommandsFromLine function", ()=>{
  test('should return HoverData', ()=>{
    const parseData = new ParseData();

    const response = parseData.getCommandsFromLine('MLMR')
    expect(response).toEqual(['M','L','M','R'])  
  })

  test('should throw error becaus the length of info is invalid', ()=>{
    const parseData = new ParseData();
    try {
      parseData.getCommandsFromLine('MLMN') 
    } catch (error) {
      expect(error).toStrictEqual(new Error("Invalid command: N"))
    }
    expect.assertions(1)
  })
})