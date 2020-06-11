import { server as baseServer, routeConfiguringFunction as makeRouter } from 'appium-base-driver';
import { MpDriver } from './driver';

// eslint-disable-next-line no-console
console.log(MpDriver);

async function startServer (port, host) {
  let d = new MpDriver();
  let routeConfiguringFunction = makeRouter(d);
  let server = await baseServer({routeConfiguringFunction, port, hostname: host});
  // eslint-disable-next-line no-console
  console.log(`MpDriver server listening on http://${host}:${port}`);
  d.server = server;
  return server;
}

export { startServer };