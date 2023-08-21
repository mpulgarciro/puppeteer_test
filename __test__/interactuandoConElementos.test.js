const puppeteer = require('puppeteer')

describe('Interactuando con elementos', () => {

    it('Debe de abrir y cerrar el navegador', async() => {
        const browser = await puppeteer.launch({
            headless: false, 
            executablePath: '/usr/bin/google-chrome',
            defaultViewport: null
        }) 

        const page = await browser.newPage()

        await page.goto('https://demo.guru99.com/test/simple_context_menu.html')

        page.on('dialog', async(dialog) => {
            await dialog.accept()
        })
        
        // await page.click('#authentication > span', {button: 'right', delay: 500})
        // await page.waitForTimeout(3000)
        
        await page.click('#authentication > button', {clickCount: 2, delay: 1000 })
        await page.waitForTimeout(3000)

        await page.goto('https://devexpress.github.io/testcafe/example/')

        await page.type('#developer-name', 'Mijail', {delay:100})
        
        await page.click('#remote-testing')
        await page.click('#tried-test-cafe')
        await page.type('#comments', 'Esto es un comentario', {delay: 100})
        await page.select('#preferred-interface', 'JavaScript API')
        await page.click('#submit-button')
        await page.waitForTimeout(3000)

        await browser.close()
    }, 350000)
})

