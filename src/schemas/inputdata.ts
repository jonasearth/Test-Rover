import { Hover } from "../entities/hover"
import { CommandEnum } from '../enums/command.enum'

export interface InputData {
  size: number[],
  hoversData: HoverData[]
}

export interface HoverData {
  hover: Hover,
  commands: CommandEnum[]
}