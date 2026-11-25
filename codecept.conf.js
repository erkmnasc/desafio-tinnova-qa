const { setHeadlessWhen, setCommonPlugins } = require('@codeceptjs/configure');
// modo headless com HEADLESS=true (npm run test:headless)
setHeadlessWhen(process.env.HEADLESS);

// plugins comuns: screenshotOnFail, retryFailedStep etc.
setCommonPlugins();

/** @type {CodeceptJS.MainConfig} */
exports.config = {
  name: 'desafio-tinnova-qa',
  tests: './steps/*_test.js',
  output: './output',
  helpers: {
    WebDriver: {
      url: 'https://tinnova-teste-qa.vercel.app',
      browser: 'chrome',
      windowSize: '1280x1024',
      waitForTimeout: 10000,
    },
  },
  include: {
    I: './steps_file.js',
    home_page: './pages/home_page.js',
    form_page: './pages/form_page.js',
  },
};
