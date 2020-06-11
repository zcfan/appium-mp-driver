import screenShotCmds from './screenshot';
import findCmds from './find';
import gestureCmds from './gesture';

let commands = {};
Object.assign(
  commands,
  // contextCommands,
  // settingsCmds,
  // timeoutCmds,
  findCmds,
  // generalCmds,
  screenShotCmds,
  // elementCmds,
  gestureCmds,
  // navigationCmds,
  // executeCmds,
  // mobileCmds,
  // add other command types here
);

export default commands;