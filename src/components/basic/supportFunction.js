// export const SERVER_URL = 'http://halalbeef.co.id/';
// export const SERVER_URL = 'http://192.168.43.24/';
export const SERVER_URL = 'http://halalbeef.co.id:1728/api/v1/';
export const STATIC_RES_URL = 'http://halalbeef.co.id/images/';

export const LOCALE_DAY = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jum\'at', 'Sabtu'];
export const PRODUCT_PATH = 'images/products/';
export const PROFILE_PATH = 'images/dummy/';

export const ORIGIN_POINT = {
    latitude: -6.887244,
    longitude: 107.600628,
};

export const IDR_FORMAT = (angka) => {
    if (isNaN(angka)) {
        return 'loading..'
    }else{
        var rupiah = '';
        var angkarev = angka.toString().split('').reverse().join('');
        for(var i = 0; i < angkarev.length; i++) if(i%3 == 0) rupiah += angkarev.substr(i,3)+'.';
        return 'Rp '+rupiah.split('',rupiah.length-1).reverse().join('');
    }
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

export const TRACKING_MESSAGE_STATUS = ['', 'Menunggu Pembayaran', 'Pembayaran Sudah Dikonfirmasi', 'Pesanan Sedang Diproses', 'Pesanan Sedang Dikirim', 'Pesanan Sudah Sampai'];
export const TRACKING_COLOR_STATUS = ['', '#ffbf00', '#4d2e9b', '#01adbc', '#0038bc', '#00b71e'];

export const UNIT_CONVERTER = (input) => {
    if (input === 1) {
        return '500gr'
    }else if (input === 2) {
        return '1000gr'
    }else{
        return 'Invalid Input'
    };
};

export const CAPITALIZE = (x) => {
    var cs = x.split(' ');
    var as = cs.map(r => r.toLowerCase());
    var result = [];
    for (var i = 0; i < as.length; i++) {
        result.push(as[i].charAt(0).toUpperCase() + as[i].slice(1));
    };
    return result.join(' ');
};
