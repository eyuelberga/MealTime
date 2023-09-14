import * as yup from "yup";

export default yup.object({
    name: yup.string().required(),
    description: yup.string().required(),
}).required();