
import { TextService } from "./text.service";
import { ParseData } from "./parseData.service";

/**
 * start the system
 */
export async function start() {
    try{

      const fileService = new TextService()
      //take data from file
      const fullCommands = await fileService.readText(process.env.INPUT_FILE_NAME)

      //turns a string into a manipulable object 
      const dataParsed = new ParseData().getFullDataFromString(fullCommands)
      
      // execute all commands for each hover 
      const hoverlist = dataParsed.hoversData.map((hoverData) =>{

        hoverData.hover.doCommands(hoverData.commands, dataParsed.size)
        const [x, y] = hoverData.hover.getCoordinates()
        return `${x} ${y} ${hoverData.hover.getDirection()}`
      })

      // write the result text 
      await fileService.writeText(hoverlist.join('\n'))
    }catch (e){
      console.error(e.message)
    }
  } 