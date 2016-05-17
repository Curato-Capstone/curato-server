import thinky from '../util/thinky';
const type = thinky.type;

const User = thinky.createModel('users', {
    id          : type.string(),
    email       : type.string().email().required(),
    name        : type.string().min(1).max(30).required(),
    password    : type.string().min(5).max(20).required(),
    age         : type.number().min(1).max(99).required(),
    gender      : type.string().optional(),
    ethnicity   : type.string().enum('white', 'black', 'latino', 'asian').optional(),
    favorites   : type.array().schema(type.string()).required(),
    dislikes    : type.array().schema(type.string()).required(),
    preferences : type.object().schema({
        art           : type.number().min(1).max(5).required(),
        entertainment : type.number().min(1).max(5).required(),
        food          : type.number().min(1).max(5).required(),
        outdoors      : type.number().min(1).max(5).required(),
        history       : type.number().min(1).max(5).required(),
        relaxation    : type.number().min(1).max(5).required(),
        shopping      : type.number().min(1).max(5).required(),
        sports        : type.number().min(1).max(5).required()
    }).required()
}, { pk : 'id', enforce_extra: 'strict' });

export default User;
