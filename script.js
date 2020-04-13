const puppeteer = require('puppeteer');
const fs = require('fs');

async function run() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  let reviews = [];

  async function getPageData(pageNumber = 1) {
    await page.goto('https://platzi.com/cursos/html5-css3/opiniones/1/', {
      waitUntil: 'load',
      //remove the timeOut
      timeout: 0
    });
    /* await page.screenshot({
      path: 'screenshot.png',
      fullPage: true,
    }); */

    const data = await page.evaluate(() => {
      const $reviews = document.querySelectorAll('.Review');
      const $pagination = document.querySelectorAll('.Pagination .Pagination-number');
      const totalPages = Number($pagination[$pagination.length - 1].textContent.trim());
      const data = [];

      $reviews.forEach(($review) => {
        data.push({
          username: $review.querySelector('.Review-name').textContent.trim(),
          rating: $review.querySelectorAll('.Review-stars .fulled').length,
          content: $review.querySelector('.Review-description').textContent.trim()
        });
      });

      return {
        reviews: data,
        totalPages,
      }
    });

    reviews = [...reviews, ...data.reviews];
    console.log(data);
    console.log(` page ${pageNumber} of ${data.totalPages} completed;`);

    if (pageNumber <= data.totalPages - data.totalPages) {
      getPageData(pageNumber + 1);
    } else {
      // fs.writeFile('data.json', JSON.stringify(reviews), () => {
      fs.writeFile('data.js', `export default ${JSON.stringify(reviews)}`, () => {
        console.log('data writed');
      });
      await browser.close();
    }

  }
  getPageData();
  // await browser.close();
}

run();