import { STEAMURL } from './static/data.js'
import { createBrowserInstance } from './lib/createBrowserInstance.js'
;(async () => {
    const browser = await createBrowserInstance()
    const page = await browser.newPage()
    await page.goto(STEAMURL)
    await page.setViewport({ width: 1920, height: 1080 })
    await new Promise(resolve => {
        console.log('Please login in and then type any character, press Enter to close the browser finally.')
        process.stdin.once('data', resolve)
    })
    await browser.close()
    console.log('Login information has been stored')
    process.stdin.pause()
})()
