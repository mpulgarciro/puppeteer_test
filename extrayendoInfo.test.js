const puppeteer = require('puppeteer')

describe('Extrayendo informacion', () => {

    xit('Extraer el titulo de la pagina y la url', async() => {
        const browser = await puppeteer.launch({
            headless: false, 
            executablePath: '/usr/bin/google-chrome',
            defaultViewport: null,
            //slowMo: 500
        }) 

        const page = await browser.newPage()
        await page.goto('https://platzi.com', {waitUntil: 'networkidle0'})
        const titulo = await page.title()
        const url = await page.url()
        console.log('titulo', titulo)
        console.log('url', url)
   
        await browser.close()
    }, 350000)

    xit('Extraer la informacion de un elemento', async() => {
        const browser = await puppeteer.launch({
            headless: false, 
            executablePath: '/usr/bin/google-chrome',
            defaultViewport: null,
            //slowMo: 500
        }) 

        const page = await browser.newPage()
        await page.goto('https://platzi.com', {waitUntil: 'networkidle0'})
        await page.waitForSelector('#cms-landings > section > section.Hero.Bg-animation > div > h1 > span')
        const span = await page.$eval('#cms-landings > section > section.Hero.Bg-animation > div > h1 > span', (span) => span.textContent)
        console.log('span', span)

        const [p] = await page.$x('//*[@id="cms-landings"]/section/section[1]/div/p[2]')
        const propiedad = await p.getProperty('textContent')
        const texto = await propiedad.jsonValue()
        console.log('p', texto)

        //Segunda forma
        const texto2 = await page.evaluate((name) => name.textContent, p)
        console.log('texto2 ', texto2)

        const button3 = await page.waitForXPath('//*[@id="cms-landings"]/section/section[1]/div/p[2]')
        const texto3 = await page.evaluate((name) => name.textContent, button3)
        console.log('texto3 ', texto3)
        await browser.close()
    }, 350000)

    it('Contar los elementos de una pagina', async() => {
        const browser = await puppeteer.launch({
            headless: false, 
            executablePath: '/usr/bin/google-chrome',
            defaultViewport: null,
            //slowMo: 500
        }) 

        const page = await browser.newPage()
        await page.goto('https://platzi.com', {waitUntil: 'networkidle0'})
        const images = await page.$$eval('img', (imagenes) => imagenes.length)
        console.log('imagenes ', images)
   
        await browser.close()
    }, 30000)
})

