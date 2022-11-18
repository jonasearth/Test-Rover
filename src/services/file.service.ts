import { readFile } from 'fs';


export class FileService {

  static async readText(name: string): Promise<string> {
    return new Promise((resolve, reject)=>{
      readFile(name, (err, data) =>{
        if(err){
          throw err;
        }
        resolve(data.toString());

      })

    })
  }
}