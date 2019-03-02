//import { generateKeyPair } from 'crypto';

const express = require('express');
const PDFDocument = require('pdfmake');

var pdfMake = require('pdfmake');
var PdfPrinter = require('pdfmake/src/printer');
var virtualfs = require('pdfmake/build/vfs_fonts');
const moment = require('moment');


// router.post(`/assignvoucher`, async (req,res) => {


    module.exports = (req, res) => {
    const doc = new PDFDocument()
  let filename = encodeURIComponent('file.pdf')

  console.log(`pdfservice generating for user: `, req.body.user) 
  console.log(`voucher: `, req.body.voucher)

  res.setHeader('Content-disposition', 'attachment; filename="' + filename + '"')
  res.setHeader('Contend-type', 'application/pdf')

 
  var data = [{
    "entrie_id": 57,
    "title": "Hr. Dr.",
    "name": "sdfg",
    "surname": "dfghfgh",
    "tel": "67567",
    "mtel": "86976",
    "mail": "cjf@dgh.de",
    "company": "dfgdfh",
    "department": "gfgh"
  },
  {
    "entrie_id": 41,
    "title": "Herr Dr.",
    "name": "Axelsaft",
    "surname": "Schweiss",
    "tel": "0001",
    "mtel": "70004",
    "mail": "axelsaft@bla.com",
    "company": "FRI",
    "department": "Axel-Chirurgie"
  },
  {
    "entrie_id": 42,
    "title": "Herr Dr.",
    "name": "Heinrich",
    "surname": "Schweß",
    "tel": "5456465",
    "mtel": "70005",
    "mail": "5@bla.com",
    "company": "FRI",
    "department": "Axel-Chirurgie"
  }
]

var fonts = {
    Roboto: {
      normal: 'src/fonts/arial.ttf',
      bold: 'src/fonts/bold.ttf',
      italics: 'src/fonts/arial.ttf',
      bolditalics: 'src/fonts/arial.ttf'
    }
  };
  var printer = new PdfPrinter(fonts);
  //var fs = require('fs');
  function getDate() {
    let m = moment().format('YYYY-MM-DD');
    console.log('Generating PDF at: ', m)
    return m
  }

  function buildTableBody(data, columns) {
    var body = [];
    body.push(columns);

    data.forEach(function(row) {
      var dataRow = [];
      //  console.log("PDF - Working Row: ", row);
      columns.forEach(function(column) {
        dataRow.push(row[column].toString());
      })

      body.push(dataRow);


    });

    return body;
  }


  function table(data, columns) {
    return {
      table: {
        headerRows: 1,
        body: buildTableBody(data, columns)
      },
      layout: {
        hLineWidth: function(i, node) {
          return (i === 0 || i === node.table.body.length) ? 2 : 1;
        },
        vLineWidth: function(i, node) {
          return (i === 0 || i === node.table.widths.length) ? 2 : 1;
        },
        hLineColor: function(i, node) {
          return (i === 0 || i === node.table.body.length) ? 'black' : 'gray';
        },
        vLineColor: function(i, node) {
          return (i === 0 || i === node.table.widths.length) ? 'black' : 'gray';
        },
        fillColor: function(i, node) {
          return (i % 2 === 0) ? '#CCCCCC' : null;
        },
      }
    }
  }


  /// So funzt es
  var dd = {
    pageSize: 'LEGAL',
    pageMargins: [20, 80, 20, 60],

    header: {

      columns: [{
          // usually you would use a dataUri instead of the name for client-side printing
          // sampleImage.jpg however works inside playground so you can play with it
          image: 'src/images/logo.png',
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
  //  pdfDoc.pipe(fs.createWriteStream('./basics.pdf'));
  pdfDoc.pipe(res);
  pdfDoc.end();
////////////////////

 

}


// export default pdfService;  