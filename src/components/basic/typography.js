import { FONT_TYPE } from './Fonts';
import { COLORS } from './colors';


export const TYPOGRAPHY = {
    f10: {fontSize: 10},
    f11: {fontSize: 11},
    f12: {fontSize: 12},
    f13: {fontSize: 13},
    f14: {fontSize: 14},
    f15: {fontSize: 15},
    f16: {fontSize: 16},
    f17: {fontSize: 17},
    f18: {fontSize: 18},
    f19: {fontSize: 19},
    f20: {fontSize: 20},
    f21: {fontSize: 21},
    f22: {fontSize: 22},
    f23: {fontSize: 23},
    f24: {fontSize: 24},
    f25: {fontSize: 25},
    f26: {fontSize: 26},
    f27: {fontSize: 27},
    f28: {fontSize: 28},
    f29: {fontSize: 29},
    f30: {fontSize: 30},

    f10b: {fontSize: 10, fontWeight: 'bold'},
    f11b: {fontSize: 11, fontWeight: 'bold'},
    f12b: {fontSize: 12, fontWeight: 'bold'},
    f13b: {fontSize: 13, fontWeight: 'bold'},
    f14b: {fontSize: 14, fontWeight: 'bold'},
    f15b: {fontSize: 15, fontWeight: 'bold'},
    f16b: {fontSize: 16, fontWeight: 'bold'},
    f17b: {fontSize: 17, fontWeight: 'bold'},
    f18b: {fontSize: 18, fontWeight: 'bold'},
    f19b: {fontSize: 19, fontWeight: 'bold'},
    f20b: {fontSize: 20, fontWeight: 'bold'},
    f21b: {fontSize: 21, fontWeight: 'bold'},
    f22b: {fontSize: 22, fontWeight: 'bold'},
    f23b: {fontSize: 23, fontWeight: 'bold'},
    f24b: {fontSize: 24, fontWeight: 'bold'},
    f25b: {fontSize: 25, fontWeight: 'bold'},
    f26b: {fontSize: 26, fontWeight: 'bold'},
    f27b: {fontSize: 27, fontWeight: 'bold'},
    f28b: {fontSize: 28, fontWeight: 'bold'},
    f29b: {fontSize: 29, fontWeight: 'bold'},
    f30b: {fontSize: 30, fontWeight: 'bold'},

    header              : {fontSize: 18, ...FONT_TYPE.regular, color: COLORS.PURE_WHITE, fontWeight: 'normal'},
    subHeader           : {fontSize: 16, ...FONT_TYPE.bold, color: COLORS.BLACK_NORMAL},
    h1                  : {fontSize: 14, ...FONT_TYPE.regular, color: COLORS.BLACK_NORMAL},
    h2                  : {fontSize: 12, ...FONT_TYPE.regular, color: COLORS.BLACK_NORMAL},
    h3                  : {fontSize: 10, ...FONT_TYPE.regular, color: COLORS.BLACK_NORMAL},
    p                   : {fontSize: 8, ...FONT_TYPE.light, color: COLORS.GRAY_FADE},

    inlineProp          : {fontSize: 14, ...FONT_TYPE.light, color: COLORS.GRAY_FADE},
    subtotalValue       : {fontSize: 14, ...FONT_TYPE.bold, color: COLORS.GRAY_FADE},
    specialActionText   : {fontSize: 15, ...FONT_TYPE.bold, color: COLORS.PRIMARY},
    priceTextModal      : {fontSize: 16, ...FONT_TYPE.bold, color: COLORS.PRIMARY}
};
