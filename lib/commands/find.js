/* eslint-disable */
import { errors } from 'appium-base-driver';

let commands = {};

commands.findElOrEls = async function (strategy, selector, mult, context) {
  this.findedElements = this.findedElements || {};

  let result;
  const doFind = async () => {
    if(strategy !== 'css selector') {
      throw new Error('Unsupported strategy for findElOrEls: ' + strategy);
    }
    
    // 默认在当前页面上查找元素
    let context;
    if (typeof context === 'undefined' || !context) {
      context = await this.mpProgram.currentPage();
    } else {
      context = this.findedElements[context];
    }
  
    if (mult) {
      result = await context.$$(selector);
      if (result) {
        result = result.map(el => {
          this.findedElements[el.id] = el;
          return {
            elementId: el.id
          };
        })
        return true;
      } else {
        return false;
      }
    } else {
      result = await context.$(selector);
      if (result) {
        this.findedElements[result.id] = result;
        result = {
          elementId: result.id
        };
        return true;
      } else {
        return false;
      }
    }
  }

  try {
    await this.implicitWaitForCondition(doFind);
  } catch (err) {
    if (err.message && err.message.match(/Condition unmet/)) {
      // 没有找到元素
      throw new errors.NoSuchElementError(result);
    } else {
      throw err;
    }
  }
  return result;
};

export default commands;