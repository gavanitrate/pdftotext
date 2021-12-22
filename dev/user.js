import pdfToText from '../dist';

console.time('p');
const out = pdfToText('D:\\netfresh\\BASS_ABCD_Application.pdf', {
  layout: true,
});
console.timeEnd('p');
console.log(out.length);
