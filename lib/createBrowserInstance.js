import puppeteer from 'puppeteer'
import { executablePath } from '../static/data.js'

async function createBrowserInstance() {
    return await puppeteer.launch({
        headless: false,
        userDataDir: './data',
        executablePath,
    })
}

export { createBrowserInstance }
