const puppeteer = require('puppeteer')

describe('Tipos de espera', () => {

    jest.setTimeout(350000)
    it('Mostrar todos los diferentes tipos de espera', async() => {
        const browser = await puppeteer.launch({
            headless: false, 
            executablePath: '/usr/bin/google-chrome',
            defaultViewport: null,
            //slowMo: 500
        }) 

        const page = await browser.newPage()
        // page.setDefaultTimeout(200000)
        // page.setDefaultNavigationTimeout(10000)
        await page.goto('https://platzi.com', {waitUntil: 'networkidle0'})

        // Espera explicita

        // await page.waitForTimeout(5000)

        // Espera por un selector
        // await page.waitForSelector('#Header-v2 > nav.Nav-header.Nav-header-mobileCtas > div.Logo > div > a > div > figure > img')

        // Espera por un xpath
        await page.waitForXPath('//*[@id="Header-v2"]/nav[1]/div[1]/div/a/div/figure/img')
        
        await page.goto('https://demoqa.com/modal-dialogs', {waitUntil: 'networkidle2'})
        const button = await page.waitForSelector('#showSmallModal', {visible: true})
        //const button = await page.waitForXPath('//*[@id="showSmallModal"]', {visible: true})
        
        await button.click()

        //Esperar por funcion

        await page.waitForFunction(() => document.querySelector('#example-modal-sizes-title-sm').innerText === 'Small Modal')
        // Ejemplo para observar el viewport

        // const observarResize = page.waitForFunction('window.innerWidth < 100')
        // await page.setViewport({width: 50, height: 50})
        // await observarResize
        await page.click('#closeSmallModal')
        await page.waitForFunction(() => !document.querySelector('#example-modal-sizes-title-sm'), {
            timeout: 30000
        })

        await browser.close()
    })
})

