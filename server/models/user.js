import thinky from '../util/thinky'
const type = thinky.type

const User = thinky.createModel("User", {
    email     : type.string().email(),
    name      : type.string().min(1).max(30).alphanum(),
    password  : type.string().min(5).max(20),
    age       : type.number().min(1).max(99),
    ethnicity : type.string().enum('white', 'black', 'latino', 'asian')
}, {pk : "email"});

export default User;
