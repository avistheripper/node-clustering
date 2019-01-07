const puppet = require('puppeteer');

test('Header component', () => {
    expect(2*2).toEqual(4);
});

test('Browser test', async () => {
    const browser = await puppet.launch({
        headless: false
    });
    const page = await browser.newPage();
})