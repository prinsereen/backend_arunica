// import { PDFDocument } from 'pdf-lib';
// import pdfjs from 'pdf-parse';
// import fetch from 'node-fetch';

// // Fungsi untuk menghasilkan rentang angka
// function range(start, end) {
//     let length = end - start + 1;
//     return Array.from({ length }, (_, i) => start + i);
// }

// // Fungsi untuk mengekstrak halaman PDF dalam rentang tertentu
// async function extractPdfPages(arrayBuff, start, end) {
//     const pdfSrcDoc = await PDFDocument.load(arrayBuff);
//     const pdfNewDoc = await PDFDocument.create();
//     const pages = await pdfNewDoc.copyPages(pdfSrcDoc, range(start - 1, end - 1));
//     pages.forEach((page) => pdfNewDoc.addPage(page));
//     const newpdf = await pdfNewDoc.save();
//     return newpdf;
// }

// // Fungsi untuk mengonversi PDF menjadi JSON
// async function pdfToJson(pdfBuffer) {
//     const data = await pdfjs(pdfBuffer).then(function(data) {data.text}) ;
//     return data;
// }

// // URL PDF
// const pdfUrl = 'https://firebasestorage.googleapis.com/v0/b/visionary-9f018.appspot.com/o/c301ce60-ede2-45c7-8ab8-37a23e039b7a-1.%20Bumi-TereLiye.pdf?alt=media';

// // Fungsi utama untuk mengekstrak halaman dan mengonversinya menjadi JSON
// (async () => {
//     // Ambil PDF dari URL
//     console.log("here")
//     const response = await fetch(pdfUrl);
//     const arrayBuffer = await response.arrayBuffer();
//     console.log("here")
//     // Tentukan rentang halaman yang ingin diekstrak (misal halaman 2 sampai 3)
//     const startPage = 2;
//     const endPage = 3;

//     // Ekstrak halaman dari PDF
//     const extractedPdfBuffer = await extractPdfPages(arrayBuffer, startPage, endPage);

//     // Konversi PDF hasil ekstraksi menjadi JSON
//     //const pdfJson = await pdfToJson(extractedPdfBuffer);


//     console.log(extractedPdfBuffer);
// })();




// async function flattenForm() {


//   const pdfDoc = await PDFDocument.load(formPdfBytes)

//   const form = pdfDoc.getForm()

//   form.getTextField('Text1').setText('Some Text');
//   form.getRadioGroup('Group2').select('Choice1');
//   form.getRadioGroup('Group3').select('Choice3');
//   form.getRadioGroup('Group4').select('Choice1');
//   form.getCheckBox('Check Box3').check();
//   form.getCheckBox('Check Box4').uncheck();
//   form.getDropdown('Dropdown7').select('Infinity');
//   form.getOptionList('List Box6').select('Honda');

//   form.flatten();

//   const pdfBytes = await pdfDoc.save()
// }

//import PdfParse from 'pdf-parse';


// import { PDFDocument } from 'pdf-lib'

// function range(start, end) {
//     let length = end - start + 1;
//     return Array.from({ length }, (_, i) => start + i - 1);
//   }

// async function extractPdfPage(arrayBuff) {
//     const pdfSrcDoc = await PDFDocument.load(arrayBuff);
//     const pdfNewDoc = await PDFDocument.create();
//     const pages = await pdfNewDoc.copyPages(pdfSrcDoc, range(2, 3));
//     pages.forEach((page) => pdfNewDoc.addPage(page));
//     const newpdf = await pdfNewDoc.save();
//     return newpdf;
// }

// const formUrl = 'https://firebasestorage.googleapis.com/v0/b/visionary-9f018.appspot.com/o/c301ce60-ede2-45c7-8ab8-37a23e039b7a-1.%20Bumi-TereLiye.pdf?alt=media'
// const formPdfBytes = await fetch(formUrl).then(res => res.arrayBuffer())

// const formRangeBuffer = await (extractPdfPage(formPdfBytes))

// import { PdfReader } from "pdfreader";

// new PdfReader().parseFileItems(formRangeBuffer, (err, item) => {
//   if (err) console.error("error:", err);
//   else if (!item) console.warn("end of file");
//   else if (item.text) console.log(item.text);
// });