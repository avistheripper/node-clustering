const puppet = require('puppeteer');

test('Header component', () => {
    expect(2*2).toEqual(4);
});

test('Initial app test', async () => {
    const browser = await puppet.launch({
        headless: false
    });
    const page = await browser.newPage();
    await page.goto('localhost:3000');
    const text = await page.$eval('a.brand-logo', el => el.innerHTML);

    expect(text).toEqual('Blogster');
})