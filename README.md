

# Introduction

​		Are you still worried about some games contaminating your inventory? This project powered by puppeteer can remove the steam games which you specified from your account in batches.

# Environment

- Nodejs

# Usage

1. get a list of the specified steam games via OCR (You may need to correct the names! ) and stored them into `./static/list.txt`;
2.  run `npm install` to install the only dependency;
3.  run `npm run login` to store login information;
4.  run `npm run remove` to remove the games contaminating your inventory.
