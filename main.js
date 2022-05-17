const puppeteer = require('puppeteer');

async function scrapePay(){
    const browser = await puppeteer.launch({ args: ['--no-sandbox'] }); //{headless: false}

  const page = await browser.newPage();
  await page.goto('https://www.spotrac.com/nfl/cleveland-browns/cap/', { waitUntil: 'domcontentloaded' });

  const itemValue = await page.waitForSelector('tbody > tr > td[class=" right  "] > span[class="cap "]').then(() =>page.evaluate(() => {
    const playerBases = [];

    const playerBaseList = document.querySelectorAll('tbody > tr > td[class=" right  "] > span[class="cap "]');
    console.log(playerBaseList);
    playerBaseList.forEach(item => {
      const pay = item.innerHTML;
      playerBases.push(pay);
    });

    return playerBases;
  }));
                                                                                                                             
  let pages = await browser.pages();
  await Promise.all(pages.map(page => page.close()));
  await browser.close();    
  
  // console.log(itemValue);

  console.log("itemValue is " + itemValue.length);

  const markedList = []
  itemValue.forEach(item => {
    let numberEdited = item.replace(/\D/g,'');

    let markedUp = numberEdited * 1.2;
    let markedRounded = Number(markedUp.toFixed(3));

    markedList.push(markedRounded);
  });

  console.log(markedList);
  console.log("marked list is " + markedList.length);
  return markedList;
}

scrapePay();