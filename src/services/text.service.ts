import { readFile, writeFile } from 'fs';
import { promisify } from 'util';

export class TextService {
  
  /**
   * write a text on disk
   * @param data 
   * @returns {Promise<string>} the writed string
   */
  async writeText(data: string) : Promise<string> {
    const writeFilePromise = promisify(writeFile)
    await writeFilePromise(process.env.OUTPUT_FILE_NAME, data)
    return data
  }
  
  /**
   * read a text from disk
   * @param name 
   * @returns {Promise<string> } a string from file
   */
  async readText(name: string): Promise<string> {
    const readFilePromise = promisify(readFile)
    return (await readFilePromise(name)).toString()
  }

}