import chrome from 'selenium-webdriver/chrome';

let chromeOptions = new chrome.Options();
chromeOptions.addArguments('--headless');
//options.addArguments('--start-maximized');
chromeOptions.addArguments('--window-size=1000,1000');
chromeOptions.addArguments('--disable-infobars');
//chromeOptions.addArguments('--disable-extensions');
chromeOptions.addArguments('--log-level=3');
chromeOptions.addArguments('--desable-gpu');

export default chromeOptions;
