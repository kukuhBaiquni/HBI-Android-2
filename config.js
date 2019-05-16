export const SERVER_URL = 'http://halalbeef.co.id/';
// export const SERVER_URL = 'http://192.168.43.24/';
// export const SERVER_URL = 'http://192.168.0.102/';``

export const locale = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jum\'at', 'Sabtu'];

export function idrFormat(angka) {
    if (isNan(angka)) {
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
}

function distance(lat1, lng1, lat2, lng2, unit) {
    var radlat1 = Math.PI * lat1/180
    var radlat2 = Math.PI * lat2/180
    var theta = lng1-lng2
    var radtheta = Math.PI * theta/180
    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    dist = Math.acos(dist)
    dist = dist * 180/Math.PI
    dist = dist * 60 * 1.1515
    if (unit=="K") { dist = dist * 1.609344 }
    if (unit=="M") { dist = dist * 0.8684 }
    return dist
}

function sortDistance(a, b) {
    if (a.last_nom < b.last_nom)
        return -1;
    if (a.last_nom > b.last_nom)
        return 1;
    return 0;
}
