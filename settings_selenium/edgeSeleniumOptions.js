import edge from 'selenium-webdriver/edge';

let edgeOptions = new edge.Options();
edgeOptions.set('--headless');
//edgeOptions.set('--start-maximized');
edgeOptions.set('--window-size=200,200');
//edgeOptions.addArguments('disable-infobars');
//edgeOptions.set("--browserSize", "290x500");


export default edgeOptions;
