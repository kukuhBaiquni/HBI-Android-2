export const SERVER_URL = 'http://halalbeef.co.id/';
// export const SERVER_URL = 'http://192.168.43.69/';
// export const SERVER_URL = 'http://192.168.100.4/';

export function idrFormat(angka) {
  var rupiah = '';
  var angkarev = angka.toString().split('').reverse().join('');
  for(var i = 0; i < angkarev.length; i++) if(i%3 == 0) rupiah += angkarev.substr(i,3)+'.';
  return 'Rp. '+rupiah.split('',rupiah.length-1).reverse().join('');
}

export function processParser(word) {
  var process = '';
  var size = '';
  if (word.includes('Cut')) {
    process = 'Cut';
    size = word.replace('Cut', '').trim()
    return {process, size, index: 1}
  }
  if (word.includes('Slice')) {
    process = 'Slice';
    size = word.replace('Slice', '').trim()
    return {process, size, index: 2}
  }
  if (word.includes('Grind')) {
    process = 'Grind';
    return {process, size: null, index: 3}
  }
  if (word.includes('None')) {
    process = 'None'
    return {process, size: null, index: 0}
  }
}
