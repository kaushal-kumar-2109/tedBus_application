const puppeteer = require('puppeteer');

(async () => {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        
        page.on('console', msg => console.log('CONSOLE LOG:', msg.text()));
        page.on('pageerror', error => console.error('PAGE ERROR:', error.message));
        page.on('requestfailed', request => console.error('REQUEST FAILED:', request.url(), request.failure().errorText));
        
        console.log('Navigating to http://localhost:4200...');
        await page.goto('http://localhost:4200', {waitUntil: 'networkidle2'});
        
        console.log('Closing browser...');
        await browser.close();
    } catch (e) {
        console.error('SCRIPT ERROR:', e);
    }
})();
