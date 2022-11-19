import { CommandEnum } from "../../../enums/command.enum"
import { InputData } from "../../../schemas/inputdata"
import { start } from "../../../services/start.service"
import { TextService } from "../../../services/text.service"
import { ParseData } from "../../../services/parseData.service"
import hoverHelper from "../../helpers/hover.helper"
jest.mock('../../../services/text.service')
jest.mock('../../../services/parseData.service')

// Disable all logs when running the tests
beforeAll(() => {
  console.log = console.warn = console.info = console.error = jest.fn();
});

test('should run successfully', async ()=>{
  const readText = jest.spyOn(TextService.prototype, 'readText').mockResolvedValue(`5 5\n1 2 N\nLMLMLMLMM`)
  const writeText = jest.spyOn(TextService.prototype, 'writeText').mockResolvedValue('0 1 N')
  jest.spyOn(ParseData.prototype, 'getFullDataFromString').mockReturnValue({
    size: [5,5],
    hoversData: [
      {
        commands: [CommandEnum.M],
        hover: hoverHelper
      }
    ]
  } as InputData)

  await start()
  expect(readText).toBeCalled();
  expect(writeText).toBeCalled();
})



test('should throw error', async ()=>{
  jest.spyOn(TextService.prototype, 'readText').mockRejectedValue(new Error("File Not Exist!"))
  const error = jest.spyOn(console, 'error')
  
  await start()
  expect(error).toBeCalledWith('File Not Exist!')
})