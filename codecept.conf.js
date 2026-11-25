const { setCommonPlugins } = require('@codeceptjs/configure');

// HEADLESS=true (npm run test:headless) roda o Chrome sem janela, com
// tamanho fixo: sem isso o Chrome headless do Linux abre em 800x600 e o
// layout responsivo esconde parte dos elementos.
const headless = process.env.HEADLESS === 'true';
const chromeArgs = headless
  ? ['--headless=new', '--window-size=1280,1024', '--no-sandbox', '--disable-dev-shm-usage']
  : [];

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
      desiredCapabilities: {
        'goog:chromeOptions': { args: chromeArgs },
      },
    },
  },
  include: {
    I: './steps_file.js',
    home_page: './pages/home_page.js',
    form_page: './pages/form_page.js',
  },
};
