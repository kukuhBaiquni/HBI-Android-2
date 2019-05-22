export const SERVER_URL = 'http://halalbeef.co.id/';
// export const SERVER_URL = 'http://192.168.43.24/';
// export const SERVER_URL = 'http://192.168.0.113:1728/';``

export const locale = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jum\'at', 'Sabtu'];

export function idrFormat(angka) {
    if (isNaN(angka)) {
        return 'loading..'
    }else{
        var rupiah = '';
        var angkarev = angka.toString().split('').reverse().join('');
        for(var i = 0; i < angkarev.length; i++) if(i%3 == 0) rupiah += angkarev.substr(i,3)+'.';
        return 'Rp '+rupiah.split('',rupiah.length-1).reverse().join('');
    }
};

export const _FONTS = {
    AbelRegular: 'Abel-Regular',
    AsapCondensedRegular: 'AsapCondensed-Regular',
    AsapCondensedBold: 'AsapCondensed-Bold',
    AsapCondensedItalic: 'AsapCondensed-Italic',
};

export const ERROR_TYPE = (statusCode) => {
    if (statusCode === 404) {
        return 'tidak ditemukan.'
    }else if(statusCode === 502) {
        return 'Server tidak merespon, coba beberapa saat lagi.'
    }else if (statusCode === 401) {
        return 'Anda tidak mempunyai izin akses.'
    }else{
        return 'Kami tidak dapat memproses permintaan Anda'
    }
};
