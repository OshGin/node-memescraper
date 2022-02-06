import fs from 'node:fs';
import axios from 'axios';
import cheerio from 'cheerio';
import fetch from 'node-fetch';

const url = 'http://memegen-link-examples-upleveled.netlify.app/';

async function download(link, fileName) {
  const response = await fetch(link);
  const arrayBuffer = await response.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  fs.writeFile('./memes/' + fileName, buffer, () => {});
}

axios
  .get(url)
  .then((response) => {
    const $ = cheerio.load(response.data);
    $('img').each(function (index, element) {
      if (index < 10) {
        download(
          $(element).attr('src'),
          index < 9 ? '0' + (index + 1) + '.jpg' : index + 1 + '.jpg',
        ).catch((error) => {
          console.error(error);
        });
      }
    });
  })
  .catch((error) => {
    console.log(error);
  });
