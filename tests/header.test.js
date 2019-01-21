const puppet = require('puppeteer');

let browser, page;

beforeEach(async () => {
    browser = await puppet.launch({
        headless: false // set to true if the chromium doesn't need to be opened
    });
    page = await browser.newPage();
    await page.goto('localhost:3000');
});

afterEach(async () => {
    await browser.close();
});

test('Initial app test', async () => {
    const text = await page.$eval('a.brand-logo', el => el.innerHTML);
    expect(text).toEqual('Blogster');
});

test('Initializing the OAth flow', async () => {
    await page.click('.right a');
    const url = await page.url();
    expect(url).toMatch(/accounts\.google\.com/)
});