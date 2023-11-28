import puppeteer from "puppeteer";
import {writeFileSync} from "fs";
import {parse} from 'json2csv';
const saveAsCSV = (csvData) => {
  if (csvData.length > 0) {
    const csv = parse(csvData)
    writeFileSync('newme.csv', csv);
  }
}
const browser = await puppeteer.launch({
  headless: false,
  defaultViewport: null,
  slowMo: 50,
  devtools: false,
  ignoreDefaultArgs: ['--enable-automation'],
  userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36'
});

const data = [];

const page = await browser.newPage();
await page.setDefaultNavigationTimeout(0);
await page.goto("https://newme.asia/collection/indofusion/?orderby=menu_order");
await page.waitForTimeout(500);
//await page.click('div#products div.css-jgblh0 div.css-1jke4yk:nth-child(3) div.css-79elbk img');
const len = await page.$$eval('div#products div.css-jgblh0 div.css-1jke4yk', els => els.length);
console.log("@@@@@ ", len)

for (let i = 0; i < len - 2; i++) {
  await page.click('div#products div.css-jgblh0 div.css-1jke4yk:nth-child(' + (len) + ') ');
}