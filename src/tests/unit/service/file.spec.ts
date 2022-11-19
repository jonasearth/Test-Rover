import { CommandEnum } from "../../../enums/command.enum"
import { InputData } from "../../../schemas/inputdata"
import { start } from "../../../services/start.service"
import { TextService } from "../../../services/text.service"
import * as util from 'util'
jest.mock('util')

describe("readText function", ()=>{
  test('should run successfully', async ()=>{
    const promisify = jest.spyOn(util, 'promisify').mockReturnValue(()=> Buffer.alloc(11))
    const fileService = new TextService()

    fileService.readText('aaa')
    expect(promisify).toBeCalled()
  })  
})

describe("writeText function", ()=>{
  test('should run successfully', async ()=>{
    const promisify = jest.spyOn(util, 'promisify').mockReturnValue(()=> void(0))
    const fileService = new TextService()

    fileService.writeText('aaa')
    expect(promisify).toBeCalled()
  })  
})
