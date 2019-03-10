//import { generateKeyPair } from 'crypto';

const express = require('express');
const PDFDocument = require('pdfmake');
const moment = require('moment');
var pdfMake = require('pdfmake');
var PdfPrinter = require('pdfmake/src/printer');
var virtualfs = require('pdfmake/build/vfs_fonts');

var fs = require('fs');

class PdfService {

    static patVoucher(req, res, oneVoucher) {

        console.log("PdfService - Voucher: ", oneVoucher.voucher)

        console.log(`PdfService - query`, req.query)

        console.log(`PdfService - Pat`, req.query.pat)
        console.log(`PdfService - Name`, req.query.chr)
        console.log(`PdfService - Nachname`, req.query.name)
        console.log(`PdfService - User`, req.query.user)

        const doc = new PDFDocument()
        let filename = encodeURIComponent('file.pdf')

        res.setHeader('Content-disposition', 'attachment; filename="' + filename + '"')
        res.setHeader('Contend-type', 'application/pdf')

        var fonts = {
            Roboto: {
                normal: 'fonts/arial.ttf',
                bold: 'fonts/arial.ttf',
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
            pageMargins: [
                20, 80, 20, 60
            ],

            header: {},

            content: [

                // table(results.rows, ['title', 'name', 'surname', 'tel', 'mtel', 'mail',
                // 'company', 'department']),

                {

                    // usually you would use a dataUri instead of the name for client-side printing
                    // sampleImage.jpg however works inside playground so you can play with it
                    image: 'images/logo-mcb.png',
                    width: 250,
                    height: 100,
                    absolutePosition: {
                        x: 50,
                        y: 30
                    },
                    noWrap: false
                }, {
                  absolutePosition: {
                        x: 350,
                        y: 50
                    },
                    text: 'Ausgestellt am: ' + getDate(),
                    fontSize: 12,
                    bold: false,
                    alignment: 'left'
                }, {
                    absolutePosition: {
                        x: 350,
                        y: 65
                    },

                    text: 'Ausgestellt für: ' + req.query.chr + ", "+ req.query.name,  
                    fontSize: 12,
                    bold: false,
                    alignment: 'left'
                }, {
                  absolutePosition: {
                    x: 350,
                    y: 80
                },                
                text: 'Ausgestellt durch: ' + req.query.user,
                fontSize: 12,
                bold: false,
                alignment: 'left'
                }, {     
                  absolutePosition: {
                  x: 350,
                  y: 95
              },
              text: 'Fallnummer: ' + req.query.pat,
              fontSize: 12,
              bold: false,
              alignment: 'left'
              }, {
                  absolutePosition: {
                        
                        y: 200
                    },
                    text: 'Ihr persönlicher WLAN-Zugangscode',
                    fontSize: 22,
                    alignment: 'center'
                }, {                  
                  absolutePosition: {
                        
                        y: 250
                    },
                    text: "Der Zugang ist gülltig für 7 Tage." ,
                    bold: false,
                    fontSize: 16,
                    alignment: 'center'
                },{
                absolutePosition: {
                  
                  y: 300
              },
              text: "Zugangscode: " + oneVoucher.voucher,
              bold: true,
              fontSize: 32,
              alignment: 'center'
              }, {
                absolutePosition: {
                  x: 50,
                  y: 400
              },
              text: "Verbotene Nutzung des Internets" ,
              bold: true,
              fontSize: 22,
              alignment: 'left'},
              {
                
                  absolutePosition: {
                    x: 50,
                    y: 450
                },                
                bold: false,
                fontSize: 16,
                ul: [

                  "Unzulässig ist jede Nutzung des Internets, die den Interessen des Klinikums oder dessen Ansehen in der Öffentlichkeit schadet. Gleiches gilt bei Verstößen gegen geltende Gesetze oder Verordnungen.",                
                  "Das Abrufen, Anbieten oder Verbreiten von rechtswidrigen Inhalten, insbesondere solche, die gegen strafrechtliche, datenschutzrechtliche, persönlichkeitsrechtliche, Lizenz- oder urheberrechtliche Bestimmungen verstoßen, ist untersagt.",
                  "Das Abrufen, Anbieten oder Verbreiten von politischen, diskriminierenden, diffamierenden oder verfassungsfeindlichen Informationen – zum Beispiel rassistischer, sexistischer, pornografischer Art - ist verboten.",
                  "Bei Verstößen oder Missbräuchen werden Schadensersatzansprüche geltend gemacht.",                  

                ]},{               
                  absolutePosition: {
                    x: 50,
                    y: 800
                },              
              text: "Bitte beachten : Der Zugang ist nur für ein Endgerät gültig!" ,
              bold: true,
              fontSize: 18,
              alignment: 'center'
              }, 
              

            ]
        }

        var pdfDoc = printer.createPdfKitDocument(dd);
        console.log("pdfService.js ending")
        pdfDoc.pipe(fs.createWriteStream('./basics.pdf'));
        pdfDoc.pipe(res);
        pdfDoc.end();
        //////////////////// return (pdfDoc);
    }

    static genPdf(req, res) {

        const doc = new PDFDocument()
        let filename = encodeURIComponent('file.pdf')

        console.log(`pdfservice generating for user: `, req.query.kunde)
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
            pageMargins: [
                20, 80, 20, 60
            ],

            header: {
                /*
      columns: [{
          // usually you would use a dataUri instead of the name for client-side printing
          // sampleImage.jpg however works inside playground so you can play with it
          image: 'images/logo.png',
          width: 130,
          absolutePosition: {
            x: 250,
            y: 20
          }
        }
      ]
      */
            },

            content: [

                // table(results.rows, ['title', 'name', 'surname', 'tel', 'mtel', 'mail',
                // 'company', 'department']),

                {

                    // usually you would use a dataUri instead of the name for client-side printing
                    // sampleImage.jpg however works inside playground so you can play with it
                    image: 'images/logo.png',
                    width: 50,
                    height: 50,
                    absolutePosition: {
                        x: 250,
                        y: 20
                    },
                    noWrap: false
                }, {
                    relativePosition: {
                        x: 0,
                        y: 0
                    },

                    text: 'WLAN-Voucher-Code - ' + getDate(),
                    fontSize: 28,
                    bold: true,
                    alignment: 'center'
                }, {
                    relativePosition: {
                        x: 0,
                        y: 100
                    },
                    text: 'Ihr persönlicher WLAN-Code'
                }, {
                    relativePosition: {
                        x: 0,
                        y: 200
                    },
                    text: "Name: " + req.query.kunde,
                    bold: true,
                    fontSize: 22
                }, {
                    relativePosition: {
                        x: 0,
                        y: 300
                    },
                    text: "Wlan Code: " + req.query.voucher,
                    bold: true,
                    fontSize: 22
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
        pdfDoc.pipe(fs.createWriteStream('./basics.pdf'));
        pdfDoc.pipe(res);
        pdfDoc.end();
        //////////////////// return (pdfDoc);
    }

}

module.exports = PdfService;