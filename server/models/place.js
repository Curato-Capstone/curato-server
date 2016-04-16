import thinky from '../util/thinky';
const type = thinky.type;

const Place = thinky.createModel('Place', {
    name                   : type.string().min(1).max(60).required(),
    formatted_address      : type.string().required(),
    opening_hours          : type.object().required(),
    website                : type.string().required(),
    tags                   : type.array().required(),
    geometry               : type.object().required(),
    formatted_phone_number : type.string().required(),
    likes                  : type.number().required()
}, { pk : 'id', enforce_extra: 'strict' });

export default Place;
