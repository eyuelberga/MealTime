import * as yup from "yup";
import { MEAL_TYPES } from "@/constants";
export default yup.object({
    date: yup.string().trim().matches(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format").required().typeError("Please enter a valid date"),
    type: yup.string().oneOf(Object.values(MEAL_TYPES)).required(),
    recipe: yup.string().required(),
}).required();