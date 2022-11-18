import { HoverData, InputData } from "../schemas/inputdata";

export class ParseData {
  static SIZELINE = 0;
  static LINESEPARATOR = '\n'
  static DIMENTIONS = 2;

  static getFullDataFromString(inputDataString: string)
  {
    const inputData: InputData = {
      size: [],
      hoversData: []
    }

    const lines = ParseData.getLinesFromString(inputDataString.trim())
    inputData.size = ParseData.getSizeFromLines(lines)
    ParseData.gethoversDataFromLines(lines)
  }

  static getSizeFromLines(inputDataString: string[]){
    const sizeData = inputDataString[ParseData.SIZELINE].trim().split(` `).map(a => Number(a))
    
    sizeData.forEach((number) => {
      if( Number.isNaN(number)){
        throw new Error("Invalid Size!");
      }
    })
    
    if(sizeData.length !== ParseData.DIMENTIONS){
      throw new Error("Invalid size lenth!"); 
    }
    console.log(sizeData)
    return sizeData
  }

  static getLinesFromString(inputDataString: string): string[]{
    return inputDataString.split(ParseData.LINESEPARATOR)
  }

  static gethoversDataFromLines(lines: string[]){
    
    lines.shift()

    if(lines.length % 2 !== 0 || lines.length === 0){
      throw new Error("Invalid number of lines");
    }

  }
}