// let state = {
//   id: '',
//   name: '',
//   status: '',
//   photo: '',
//   gender: '',
//   phone: 0,
//   address: {
//     city: '',
//     district: '',
//     village: '',
//     street: ''
//   },
//   ongkir: 0,
//   ttl: 0,
//   join: '',
//   email: '',
//   nama_rekening: '',
//   no_rekening: 0,
//   banner: ''
// };
//
// let a = Object.assign({}, state, {
//   name: 'action.data.name',
//   gender: 'action.data.gender',
//   phone: 'action.data.phone',
//   address: {
//     ...state.address,
//     city: 'action.data.address.city',
//     district: 'action.data.address.district',
//     village: 'action.data.address.village',
//     street: 'action.data.address.street'
//   },
//   ttl: 'action.data.ttl',
//   ongkir: 'action.data.ongkir'
// })
//
// console.log(a);

// var arr = ['nama', 'email', 'password'];
// var obj = arr.reduce((o, key) => ({ ...o, [key]: ''}), {})
// console.log(obj);

// let state = [];
// let newData1 = {type: 'a', list: ['1', '2', '3']}
// let newData2 = {type: 'b', list: ['1', '2', '3']}
// let newData3 = {type: 'c', list: ['1', '2', '3']}
// let newState1 = [...state, newData1]
// let newState2 = [...newState1, newData2]
// let newState3 = [...newState2, newData3]
// let modification = [...newState3, ...newState3[0].list = []]
// console.log(modification);

// function addressParser(street) {
//   const data = {
//     jalan: street.split(' ').filter(x => !x.includes('No') && !x.includes('Rt') && !x.includes('Rw') && !x.includes('Jl')).join(' '),
//     no: street.split(' ').filter(x => x.includes('No'))[0].replace('No.',''),
//     rt: street.split(' ').filter(x => x.includes('Rt'))[0].replace('Rt.0',''),
//     rw: street.split(' ').filter(x => x.includes('Rw'))[0].replace('Rw.0','')
//   }
//   return data
// }
//
// console.log(addressParser('Jl. Kaki Seribu Warna No.121 Rt.01 Rw.03'));

var a = ['1', '2', '3'];
var b = ['4', '5', '6'];

console.log([...a, ...b]);
