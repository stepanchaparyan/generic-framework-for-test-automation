import puppeteer from 'puppeteer';

const defaultOptions = {
    headless: true,
    args: [ '--window-size=1000,1050', '--no-sandbox', '--disable-setuid-sandbox']
    //args: ['--start-maximized'],
    //headless: true, ignoreHTTPSErrors: true
};

export default async (options = undefined) => {
    const puppeteerOptions = (options === undefined) ? defaultOptions : options;
    return await puppeteer.launch(puppeteerOptions);
};
