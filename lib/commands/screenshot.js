let commands = {};

commands.getScreenshot = async function () {
  return await this.mpProgram.screenshot();
};

export default commands;
