import {createLogger , format, transports} from 'winston';
import path from 'path';
import { fileURLToPath } from 'url';


const __filepath = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filepath);


 export  const logger = createLogger({
  level: 'info', // levels: error, warn, info, verbose, debug, silly
  format: format.combine(
    format.timestamp(),
    format.printf(({ timestamp, level, message }) => {
      return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
    })
  ),
  transports: [
    new transports.File({ filename: path.join(__dirname, '../logs/app.log') }),
    new transports.Console()
  ]
});

