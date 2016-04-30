import thinky from '../util/thinky';
const type = thinky.type;

const Email = thinky.createModel(
    'emails',
    { email: type.string().email().required() },
    { pk: 'email', enforce_extra: 'strict' }
);

export default Email;
