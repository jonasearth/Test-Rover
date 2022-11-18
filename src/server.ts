import { FileService } from "./services/file.service";
import { ParseData } from "./services/parseData.service";


async function start() {
  const fullCommands = await FileService.readText('input.txt')
  console.log(fullCommands)
  console.log(ParseData.getFullDataFromString(fullCommands))
  
} 

start()