let initialState = {
  cities: [],
  districts: [],
  villages: []
};

export default function territorial(state = initialState, action) {
  switch (action.type) {

    case 'LOAD_CITIES_SUCCESS':
    return Object.assign({}, state, {
      cities: [{kode_provinsi: '-', kode_kota: '-', nama_kota: 'Pilih Kota'}, ...action.data]
    });

    case 'LOAD_DISTRICTS_SUCCESS':
    return Object.assign({}, state, {
      districts: [{kode_kota: '-', kode_kecamatan: '-' , nama_kecamatan: 'Pilih Kecamatan'}, ...action.data]
    });

    case 'LOAD_VILLAGES_SUCCESS':
    return Object.assign({}, state, {
      villages: [{kode_kecamatan: '-', kode_kelurahan: '-', nama_kelurahan: 'Pilih Kelurahan'}, ...action.data]
    });

    case 'RESET_DISTRICTS':
    return Object.assign({}, state, {
      districts: []
    });

    case 'RESET_VILLAGES':
    return Object.assign({}, state, {
      villages: []
    });

    case 'RESET_PARTIAL_TERRITORIAL':
    return Object.assign({}, state, {
      city: [], districts: [], villages: []
    });

    default:
    return state;
  }
}
