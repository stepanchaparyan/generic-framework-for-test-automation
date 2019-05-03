import firefox from 'selenium-webdriver/firefox';

let firefoxOptions = new firefox.Options();
firefoxOptions.addArguments('--headless');
//options.addArguments('--start-maximized');
firefoxOptions.addArguments('--window-size=1000,1000');
firefoxOptions.addArguments('disable-infobars');

export default firefoxOptions;
