//import { generateKeyPair } from 'crypto';

const express = require('express');
const PDFDocument = require('pdfmake');

var pdfMake = require('pdfmake');
var PdfPrinter = require('pdfmake/src/printer');
var virtualfs = require('pdfmake/build/vfs_fonts');
const moment = require('moment');

// var fs = require('fs');



    module.exports = (req, res) => {
    const doc = new PDFDocument()
  let filename = encodeURIComponent('file.pdf')

  console.log(`pdfservice generating for user: `, req.query.user) 
  console.log(`voucher: `, req.query.voucher)

  res.setHeader('Content-disposition', 'attachment; filename="' + filename + '"')
  res.setHeader('Contend-type', 'application/pdf')

   

var fonts = {
    Roboto: {
      normal: 'fonts/arial.ttf',
      bold: 'fonts/bold.ttf',
      italics: 'fonts/arial.ttf',
      bolditalics: 'fonts/arial.ttf'
    }
  };
  var printer = new PdfPrinter(fonts);
  //var fs = require('fs');
  function getDate() {
    let m = moment().format('YYYY-MM-DD');
    console.log('Generating PDF at: ', m)
    return m
  }



  /// So funzt es
  var dd = {
    pageSize: 'LEGAL',
    pageMargins: [20, 80, 20, 60],

    header: {

      columns: [{
          // usually you would use a dataUri instead of the name for client-side printing
          // sampleImage.jpg however works inside playground so you can play with it
          image: 'images/logo.png',
          width: 130,
          absolutePosition: {
            x: 400,
            y: 10
          }
        },
        {
          text: 'Telefonliste - ' + getDate(),
          bold: true,
          absolutePosition: {
            x: 50,
            y: 30
          }
        }
      ]
    },
    content: [
      
     // table(results.rows, ['title', 'name', 'surname', 'tel', 'mtel', 'mail', 'company', 'department']),
      


      {
        text: 'EnteEnteEnteEnteEnteEnteEnteEnteEnteEnteEnteEnteEnteEnte'
      },
      {
        text: 'BLABLA-BLUBLU',
        bold: true
      }
    ]
  }

  /*
        var docDefinition = {
          content: [
            'First paragraph',
            'Another paragraph, this time a little bit longer to make sure, this line will be divided into at least two lines'
          ]
        };
  */
  var pdfDoc = printer.createPdfKitDocument(dd);
  console.log("pdfService.js ending")
  //pdfDoc.pipe(fs.createWriteStream('./basics.pdf'));
  pdfDoc.pipe(res);
  pdfDoc.end();
////////////////////

 

}


// export default pdfService;  