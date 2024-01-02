import 'zone.js/node';

import { APP_BASE_HREF } from '@angular/common';
import { ngExpressEngine } from '@nguniversal/express-engine';
///import { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader';
import * as express from 'express';
//import * as https from 'https';
//import * as fs from 'fs';
import { existsSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { AppServerModule } from './src/main.server';
//import * as compression from 'compression';
import { CommonEngine } from '@angular/ssr';
import { fileURLToPath } from 'node:url';
import * as compression from 'compression';
import * as bodyParser from 'body-parser';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';
import * as cors from 'cors';




// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
  const server = express();
  const serverDistFolder = dirname(fileURLToPath(import.meta.url));
  //const browserDistFolder = resolve(serverDistFolder, '../browser');
  const browserDistFolder = join(process.cwd(), 'dist/camerphone/browser');
  //const indexHtml = existsSync(join(browserDistFolder, 'index.original.html')) ? 'index.original.html' : 'index';
  //const distFolder = join(process.cwd(), 'dist','camerphone', 'browser');
  //const indexHtml = join(browserDistFolder, 'index.html');
  //const commonEngine = new CommonEngine();
  //const { AppModuleNgFactory, LAZY_MODULE_MAP } = require('main.bundle.js');
  //const DIST_FOLDER = join(__dirname, 'browser');

  // server.use(compression());
  
  // Our Universal express-engine (found @ https://github.com/angular/universal/tree/main/modules/express-engine)
  
  server.engine('html', ngExpressEngine({
    bootstrap: AppServerModule
  }));

  server.set('view engine', 'html');
  server.set('views', browserDistFolder);
  //server.set('views', DIST_FOLDER);

  const shouldCompress =  (req: express.Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: express.Response<any, Record<string, any>>) => {
    if (req.headers['x-no-compression']) {
      // don't compress responses if this request header is present
      return false;
    }

    // fallback to standard compression
    return compression.filter(req, res);
  };

 // server.use(compression());
  server.use(cors())

  server.use(compression({
    // filter decides if the response should be compressed or not,
    // based on the `shouldCompress` function above
    filter: shouldCompress,
    // threshold is the byte threshold for the response body size
    // before compression is considered, the default is 1kb
    threshold: 0
  }));
 // server.set('views', distFolder);

  // Example Express Rest API endpoints
  // server.get('/api/**', (req, res) => { });
  // Serve static files from /browser
  // server.get('*.*', express.static(distFolder, {
  //   maxAge: '1y'
  // }));
  server.get('*.*', express.static(browserDistFolder, {
    maxAge: '1y'
  }));

  // All regular routes use the Universal engine
  // server.get('*', (req, res) => {
  //   res.render(indexHtml, { req, providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }] });
  // });

  // All regular routes use the Angular engine
  server.get('*', (req, res, next) => {
    res.render('index', { req });
    // const {protocol, originalUrl, baseUrl, headers} = req;

    // commonEngine
    //     .render({
    //       bootstrap: AppServerModule,
    //       documentFilePath: indexHtml,
    //       url: `${protocol}://${headers.host}${originalUrl}`,
    //       publicPath: browserDistFolder,
    //       providers: [{provide: APP_BASE_HREF, useValue: req.baseUrl}],
    //     })
    //     .then((html) => res.send(html))
    //     .catch((err) => next(err));
  });


  return server;
}


function isRunningOnApachePassenger(): boolean {
  return moduleFilename.includes('lsnode.js');
}

function run(): void {
  // Start up the Node server

  // https certificates
  //const privateKey = fs.readFileSync('../../../ssl/keys/be898_204f5_b7d85c12b3f3e2d8349b3fb9b9e18da5.key');
  //const certificate = fs.readFileSync('../../../ssl/certs/camerphone_com_be898_204f5_1707436799_66ddc278d25256bfb95d66b03851e28a.crt');

  // Start up the Node server
  //const server = https.createServer({ key: privateKey, cert: certificate }, app());

  const server = app();
  

  if (isRunningOnApachePassenger()) {
    server.listen(() => {
      console.log('Node Express listening to Passenger Apache');
    });
    return;
  }

  

  const port = process.env['PORT'] || 4000;
  const DIST_FOLDER = join(__dirname, 'browser');
  //const {AppServerModuleNgFactory, LAZY_MODULE_MAP, ngExpressEngine, provideModuleMap} = require('./dist/server/main');
  
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}



// Webpack will replace 'require' with '__webpack_require__'
// '__non_webpack_require__' is a proxy to Node 'require'
// The below code is to ensure that the server is run only when not requiring the bundle.
declare const __non_webpack_require__: NodeRequire;
const mainModule = __non_webpack_require__.main;
const moduleFilename = mainModule && mainModule.filename || '';


if (
  moduleFilename === __filename ||
  moduleFilename.includes('iisnode') ||
  isRunningOnApachePassenger() ||
  moduleFilename.includes('node-loader.js')
) {
  run();
}


export * from './src/main.server';