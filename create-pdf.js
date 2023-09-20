

import fs from 'fs';
import path from 'path';
import puppeteer from 'puppeteer';
import handlebars from 'handlebars';




async function createPdf(data){
    const templatesPath = `./templates`


    const templateHtml = fs.readFileSync(`${templatesPath}/example/card.html`, 'utf8')
    const template = handlebars.compile(templateHtml)
    const html = template(data)

    var milis = new Date();
    milis = milis.getTime();
    var pdfPath = path.join('pdf', `${data.name}-${milis}.pdf`);

    var options = {
        width: '500px',
        height: '500px',
        headerTemplate: "<p></p>",
        footerTemplate: "<p></p>",
        displayHeaderFooter: false,
        margin: {
            top: "10px",
            bottom: "30px"
        },
        printBackground: true,
        path: pdfPath
    }

    const browser = await puppeteer.launch({
        args: ['--no-sandbox'],
        headless: "new",

        
        
    });

    let page = await browser.newPage();

    await page.goto(`data:text/html;charset=UTF-8,${html}`, {
        waitUntil: 'networkidle0'
    });
    await page.addStyleTag({ path: 'templates/example/style.css'});

    await page.pdf(options);
    await browser.close();
}

export default createPdf;
