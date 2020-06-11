/* eslint-disable */
import { errors } from 'appium-base-driver';

let commands = {};

commands.click = async function (elementId = null) {
  await this.tapEl(elementId);
};

commands.tapEl = async function (elementId, longPress) {
  const page = await this.mpProgram.currentPage();
  const el = await page.$(elementId);
  if (el) {
    if (longPress) {
      await el.longPress();
    } else {
      await el.tap();
    }
  } else {
    throw new Error(`click failed, element ${elementId} not found`);
  }
};

commands.tap = async function (gestures, longPress) {
  let elementId = gestures[0].options.element;
  await this.tapEl(elementId, longPress);
};

commands.performTouch = async function (gestures) {
  if (gestures.length === 3) {
    
    if (gestures[0].action === 'press' && gestures[1].action === 'moveTo' && gestures[2].action === 'release') {
      return await this.doSwipe(gestures);
    }

  } else if (gestures.length === 2) {
    
    if (gestures[0].action === 'press' && gestures[1].action === 'release') {
      return await this.tap(gestures, false);
    } else if (gestures[0].action === 'longPress' && gestures[1].action === 'release') {
      return await this.tap(gestures, true);
    }

  } else if (gestures.length === 1) {
    if (gestures[0].action === 'tap') {

      return await this.tap(gestures, false);
    
    } else if (gestures[0].action === 'pageScrollTo') {

      // 小程序 page 特有的 API
      await this.mpProgram.pageScrollTo(gestures[0].options.scrollTop)
      return true
    
    } else if (gestures[0].action === 'scrollTo') {

      // 小程序 scroll-view 特有的 API
      const opts = gestures[0].options;
      const page = await this.mpProgram.currentPage();
      const scrollView = await page.$(opts.element);
      if (!scrollView) {
        throw new errors.NoSuchElementError(scrollView);
      }
      if (scrollView.tagName !== 'scrollView') {
        throw new Error(`element ${opts.element} is not a scrollView`)
      }
      await scrollView.scrollTo(opts.x, opts.y);
      return true;
    
    } else if (gestures[0].action === 'swipeTo') {

      // 小程序 swiper 组件特有的 API，微信能搞点阳间的玩意不
      const opts = gestures[0].options;
      const page = await this.mpProgram.currentPage();
      const swiper = await page.$(opts.element);
      if (!swiper) {
        throw new errors.NoSuchElementError(swiper);
      }
      if (swiper.tagName !== 'swiper') {
        throw new Error(`element ${opts.element} is not a swiper`)
      }
      await swiper.swipeTo(opts.index);
      return true;

    }
  }
};


export default commands;
 