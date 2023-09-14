import * as yup from "yup";
const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
export default yup.object({
    name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required()
        .matches(passwordRules, { message: "Password should have min 5 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit." }),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('password'), null as any], 'Passwords must match')
}).required();