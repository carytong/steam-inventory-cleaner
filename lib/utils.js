import fs from 'fs'
export const getGameAppid = game_url => game_url.match(/\d+/)[0],
    getTxtItems = txtFile => fs.readFileSync(txtFile, 'utf-8').split('\r\n'),
    notFound = msg =>
        console.log(`${msg} can't be found, you need to remove it manually via the steam client`)