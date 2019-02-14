export const SERVER_URL = 'http://halalbeef.co.id/';
// export const SERVER_URL = 'http://192.168.43.69/';
// export const SERVER_URL = 'http://192.168.100.3/';

export const locale = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jum\'at', 'Sabtu'];

export function idrFormat(angka) {
  var rupiah = '';
  var angkarev = angka.toString().split('').reverse().join('');
  for(var i = 0; i < angkarev.length; i++) if(i%3 == 0) rupiah += angkarev.substr(i,3)+'.';
  return 'Rp '+rupiah.split('',rupiah.length-1).reverse().join('');
}

export function addressParser(street) {
  if (street) {
    const data = {
      jalan: street.split(' ').filter(x => !x.includes('No') && !x.includes('Rt') && !x.includes('Rw') && !x.includes('Jl')).join(' '),
      no: street.split(' ').filter(x => x.includes('No'))[0].replace('No.',''),
      rt: street.split(' ').filter(x => x.includes('Rt'))[0].replace('Rt.0',''),
      rw: street.split(' ').filter(x => x.includes('Rw'))[0].replace('Rw.0','')
    }
    return data
  }
}
