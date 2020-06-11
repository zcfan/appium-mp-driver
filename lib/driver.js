import { BaseDriver, DeviceSettings } from 'appium-base-driver';
import { desiredCapConstraints } from './desired-caps';
import automator from 'miniprogram-automator';
import commands from './commands';
import _ from 'lodash';

class MpDriver extends BaseDriver {
  constructor (opts, shouldValidateCaps) {
    super(opts, shouldValidateCaps);
    this.desiredCapConstraints = desiredCapConstraints;
    // 小程序自动化支持 css selector
    this.locatorStrategies = ['css selector'];
    this.settings = new DeviceSettings({'TimeDilation': 1, 'SourceTreeFilter': ''},
                                   this.onSettingsUpdate.bind(this));
  }

  async onSettingsUpdate (key, value) {
    if (key === 'TimeDilation') {
      await this.setTimeDilation(value);
    } else if (key === 'SourceTreeFilter') {
      await this.setSourceTreeFilter(value);
    }
  }

  async createSession (...args) {
    try {
      let [sessionId, caps] = await super.createSession(...args);

      this.mpProgram = await automator.launch({
        cliPath: this.opts.cliPath,
        projectPath: this.opts.projectPath
      });

      return [sessionId, caps];
    } catch (e) {
      try {
        await this.deleteSession();
      } catch (ign) {}
      throw e;
    }
  }

  async deleteSession () {
    await super.deleteSession();
    this.mpProgram.close();
  }
}

for (let [cmd, fn] of _.toPairs(commands)) {
  MpDriver.prototype[cmd] = fn;
}
export { MpDriver };