const desiredCapConstraints = {
  platformName: {
    presence: true,
    isString: true,
    inclusionCaseInsensitive: [
      'iOS',
      'Android',
      'Simulator'
    ]
  },
  automationName: {
    presence: true,
    isString: true,
    inclusionCaseInsensitive: [
      'MP',
    ]
  },
  app: {
    isString: true
  },
  MpAppAddress: {
    isString: true
  },
  avd: {
    isString: true
  },
  udid: {
    isString: true
  }
};

export default desiredCapConstraints;
