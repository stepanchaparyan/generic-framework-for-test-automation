import chrome from 'selenium-webdriver/chrome';

let chromeOptions = new chrome.Options();
//chromeOptions.addArguments('--headless');
//options.addArguments('--start-maximized');
chromeOptions.addArguments('--window-size=1000,1000');
chromeOptions.addArguments('disable-infobars');

export default chromeOptions;
