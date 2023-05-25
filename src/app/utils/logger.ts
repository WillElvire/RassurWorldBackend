import { configure, getLogger } from 'log4js';
import { environment } from '../config/environment';

// appenders
configure({
  appenders: {
    console: { type: 'stdout', layout: { type: 'colored' } },
    dateFile: {
      type: 'dateFile',
      filename: `${environment.logDir}/${new Date().getDate() +"_"+ (new Date().getMonth()+1) +"_"+ new Date().getFullYear()}.log`,
      layout: { type: 'basic' },
      compress: true,
      daysToKeep: 14,
      keepFileExt: true
    }
  },
  categories: {
    default: { appenders: ['console', 'dateFile'], level: environment.logLevel }
  }
});
// fetch logger and export
export const logger = getLogger();