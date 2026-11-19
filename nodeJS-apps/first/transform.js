import fs from 'fs';
import zlib from 'zlib';

const readStream = fs.createReadStream('./nodeJS-apps/first/text.txt');

const gzip = zlib.createGzip();

const writeStream = fs.createWriteStream('./nodeJS-apps/first/data.txt.gz');

readStream.pipe(gzip).pipe(writeStream);