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

test('Session setting and auth flow', async () => {
    const uid = '5c26235de754b932bee1a7ed';

    const buffer = require('safe-buffer').Buffer;
    const sessionObject = {
        passport: {
            user: uid
        }
    };
    const sessionString = 
        buffer.from(JSON.stringify(sessionObject)).toString('base64');
    const Keygrip = require('keygrip');
    const keys = require('../config/keys');
    const keygrip = new Keygrip([keys.cookieKey]);
    const sig = keygrip.sign('session=' + sessionString);

    await page.setCookie({ name: 'session', value: sessionString });
    await page.setCookie({ name: 'session.sig', value: sig });
    await page.goto('localhost:3000');

    
})