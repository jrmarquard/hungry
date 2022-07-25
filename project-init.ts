import fs from 'fs';

/* Copy env file. */
if (!fs.existsSync(`./test2`)) {
  fs.copyFile('./test1', './test2', (err: any) => {
    if (err) throw err;
    console.log('source.txt was copied to destination.txt');
  });
}
