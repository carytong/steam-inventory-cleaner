import { STEAMURL, RM_URL_PREFIX } from './static/data.js'
import { getGameAppid, getTxtItems, notFound } from './lib/utils.js'
import { createBrowserInstance } from './lib/createBrowserInstance.js'
;(async () => {
    const browser = await createBrowserInstance()

    const gameList = getTxtItems('./static/list.txt')

    for (const game of gameList) {
        const page = await browser.newPage()
        await page.goto(STEAMURL)
        await page.setViewport({ width: 1920, height: 1080 })
        //search the game
        //If the game can't be found, it will skip.
        await page.locator('#store_nav_search_term').fill(game)
        await page.keyboard.press('Enter')
        //click the first result
        try {
            const ownedGame = '.ds_flag.ds_owned_flag'
            await page.waitForSelector(ownedGame)
            const searchdGame = await page.$eval(
                '#search_resultsRows>a:first-of-type span.title',
                ({ innerText }) => innerText
            )
            if (searchdGame !== game) {
                notFound(game)
                await page.close()
                continue
            }
            await page.click(ownedGame)
        } catch (error) {
            notFound(game)
            await page.close()
            continue
        }
        //important
        await page.waitForNavigation()
        const game_appid = getGameAppid(page.url())
        const RM_URL = `${RM_URL_PREFIX}${game_appid}`
        // go to the target url
        await page.goto(RM_URL)
        // remove it
        await page.locator('.wizard_content_wrapper>a:last-of-type').click()
        await page.locator('#submit_remove_package_form>a:first-of-type').click()
        //not necessary but a good practice to release resource
        await page.close()
    }
    await browser.close()
})()
