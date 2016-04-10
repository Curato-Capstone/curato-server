import thinky from '../util/thinky';
const type = thinky.type;

const Place = thinky.createModel('Place', {
    formatted_address      : type.string().required(),
    opening_hours          : type.object(),
    website                : type.string(),
    tags                   : type.array().required(),
    name                   : type.string().min(1).max(60).required(),
    geometry               : type.object().required(),
    formatted_phone_number : type.string()
}, { pk : 'id' });

export default Place;
