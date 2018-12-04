// export const SERVER_URL = 'http://halalbeef.co.id/';
export const SERVER_URL = 'http://192.168.43.120:80/';

export function idrFormat(angka) {
  var rupiah = '';
  var angkarev = angka.toString().split('').reverse().join('');
  for(var i = 0; i < angkarev.length; i++) if(i%3 == 0) rupiah += angkarev.substr(i,3)+'.';
  return 'Rp. '+rupiah.split('',rupiah.length-1).reverse().join('');
}
