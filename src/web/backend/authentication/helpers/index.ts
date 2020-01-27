import axios from 'axios';
import fs from 'fs';

export type LoginUserData = {
  login: string,
  password: string
}

export const urlFileSaver = (url: string, filePath: string): Promise<void>  => {
  const writer = fs.createWriteStream(filePath);

  return new Promise((resolve, reject) => {
    axios({
      url,
      method: "get",
      responseType: "stream"
    }).then((response) => {
      response.data.pipe(writer);
    }).catch((e) => {
      reject();
    });

    writer.on('finish', () => { resolve() });
    writer.on('error', () => { reject() });
  });
}
