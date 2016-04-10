import thinky from '../util/thinky';
const type = thinky.type;

const User = thinky.createModel('User', {
    email       : type.string().email().required(),
    name        : type.string().min(1).max(30).alphanum().required(),
    password    : type.string().min(5).max(20).required(),
    age         : type.number().min(1).max(99).required(),
    ethnicity   : type.string().enum('white', 'black', 'latino', 'asian').optional(),
    favorites   : [type.number().optional()],
    preferences : type.object().required()
}, { pk : 'email', enforce_extra: 'strict' });

export default User;
