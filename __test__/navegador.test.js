const puppeteer = require('puppeteer')

describe('Mi primer tst en puppeteer', () => {

    it('Debe de abrir y cerrar el navegador', async() => {
        const browser = await puppeteer.launch({
            headless: false, 
            executablePath: '/usr/bin/google-chrome',
            // slowMo: 0,
            // devtools: false,
            // defaultViewport: {
            //     width: 2100,
            //     height: 1080
            // }
            // args: ['--window-size=1920,1080'],
            defaultViewport: null
        }) 

        const page = await browser.newPage()
        await page.goto('https://github.com/');
        // await page.waitForTimeout(1000)
        await page.waitForSelector('img')

        await page.reload()
        await page.waitForSelector('img')

        await page.goto('https://platzi.com/');
        await page.waitForSelector('#Header-v2 > nav.Nav-header.Nav-header-mobileCtas > div.Logo > div > a > div > figure > img')

        await page.goBack()
        await page.waitForSelector('img')

        await page.goForward()

        const page2 = await browser.newPage()
        await page2.goto('https://wikipedia.com') 

        await page.bringToFront()
        await page.waitForSelector('#Header-v2 > nav.Nav-header.Nav-header-mobileCtas > div.Logo > div > a > div > figure > img')

        // await page.waitForTimeout(2000)
        await browser.close()
    }, 30000)
})

