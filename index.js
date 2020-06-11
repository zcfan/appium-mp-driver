// transpile:main

import yargs from 'yargs';
import { asyncify } from 'asyncbox';
import * as server from './lib/server';
import * as driver from './lib/driver';

const { startServer } = server;

const DEFAULT_HOST = 'localhost';
const DEFAULT_PORT = 4723;

async function main () {
  let port = yargs.argv.port || DEFAULT_PORT;
  let host = yargs.argv.host || DEFAULT_HOST;
  return await startServer(port, host);
}

if (require.main === module) {
  asyncify(main);
}

const { MpDriver } = driver;

export default MpDriver;
export { MpDriver };
