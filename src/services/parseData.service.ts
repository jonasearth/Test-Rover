import { Hover } from "../entities/hover";
import { CommandEnum } from "../enums/command.enum";
import { DirectionEnum } from "../enums/direction.enum";
import { HoverData, InputData } from "../schemas/inputdata";

export class ParseData {
  
  size: number[];

  /**
   * Get a InputData object from a string
   * @param inputDataString 
   * @returns {InputData}
   */
  getFullDataFromString(inputDataString: string): InputData
  {
    const inputData: InputData = {
      size: [],
      hoversData: []
    }

    this.verifyInput(inputDataString)
    const lines = this.getLinesFromString(inputDataString.trim())
    inputData.size = this.getSizeFromLines(lines)
    this.size = inputData.size;
    inputData.hoversData = this.getHoversDataFromLines(lines)

    return inputData

  }

  /**
   * take string and validate if is valid
   * @param inputDataString 
   */
  verifyInput(inputDataString: string): void{
    
    for (let letter of inputDataString) {
      if (!this.isValid(letter)) {
        throw new Error(`Caracter invalid on input: ${letter}`);
      } 
    }
  }

  /**
   * verify if the letter is valid
   * @param letter 
   * @returns {boolean}
   */
  isValid(letter: string): boolean{
    return !!letter.match(/[\n NMSWELR0-9]/i)
  }

  /**
   * Get the size of the "world"
   * @param inputDataString 
   * @returns {number{}}
   */
  getSizeFromLines(inputDataString: string[]): number[] {
    const sizeData = inputDataString[0].trim().split(` `).map(a => Number(a))
    sizeData.forEach((number) => {
      if( Number.isNaN(number)){
        throw new Error("Invalid Size!");
      }
    })
    
    if(sizeData.length !== 2){
      throw new Error("Invalid size lenth!"); 
    }
    return sizeData
  }

  /**
   * split the string by lines
   * @param inputDataString 
   * @returns {string[]}
   */
  getLinesFromString(inputDataString: string): string[]{
    return inputDataString.split('\n')
  }

  /**
   * Get Hover location and commands 
   * @param lines 
   * @returns {HoverData[]}
   */
  getHoversDataFromLines(lines: string[]): HoverData[] {
    
    lines.shift()

    if(lines.length % 2 !== 0 || lines.length === 0){
      throw new Error("Invalid number of lines");
    }
    return this.parseLines(lines)
  }

  /**
   * Get Hover location and commands
   * @param lines 
   * @returns {HoverData[]}
   */
  parseLines(lines: string[]): HoverData[] {
     
    /**
     * agroup in 2 lines (hover info and command to this hover)
     */
    const hoversData =  lines.reduce((previous, _current, index, array) => {
      if(index % 2 === 0) previous.push([array[index], array[index+1]]);
        return previous
      }, [] as string[][])


    return hoversData.map((hoverData)=> {
        const hover = this.getHoverFromLine(hoverData[0])
        const commands = this.getCommandsFromLine(hoverData[1])
        return {
          hover,
          commands,
        }
      })
  }

  /**
   * make a hover entity from line
   * @param line 
   * @returns {Hover}
   */
  getHoverFromLine(line: string): Hover {
    
    const hoverData = line.trim().split(' ')
    if(hoverData.length !== 3){
      throw new Error("Invalid hover info");
    }

    const [_x, _y, direction] = hoverData;
    const x = Number(hoverData[0])
    const y = Number(hoverData[1])

    if(!Object.values(DirectionEnum).includes(direction as DirectionEnum)){
      throw new Error(`Invalid Direction: ${direction}`);
    }
    if(
      isNaN(x) || isNaN(y) ||
      x > this.size[0] || x < 0 ||
      y > this.size[1] || y < 0
    ){
      throw new Error("Invalid hover coordenates");
    }
    return new Hover(x, y, direction as DirectionEnum)
  }
  
  /**
   * make a array of commands
   * @param line 
   * @returns {CommandEnum[]}
   */
  getCommandsFromLine(line: string): CommandEnum[] {
    return line.split('').map((command)=> {
      if(!Object.values(CommandEnum).includes(command as CommandEnum)){
        throw new Error(`Invalid command: ${command}`)
      }
      return command as CommandEnum
    })
  }
  
}