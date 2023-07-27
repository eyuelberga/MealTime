import * as yup from "yup";
const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png'];
const SIZE_LIMIT = 2 * (1024 ** 2);
function formatBytes(bytes: number, decimals = 2) {
    if (!+bytes) return '0 Bytes'

    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

    const i = Math.floor(Math.log(bytes) / Math.log(k))

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}
export default yup.object({
    name: yup.string().required(),
    collection: yup.string().nullable(),
    source: yup.string().url().nullable(),
    image: yup.mixed()
        .nullable()
        .test('format-check',
            `Only image formats are supported (${SUPPORTED_FORMATS.map((format) => format.replace("image/", "")).reduce((prev, current) => !prev ? current : prev + ", " + current)})`, (value: any) => value && value.length ? value[0] && SUPPORTED_FORMATS.includes(value[0].type) : true)
        .test('size-check',
            `Image size should not exceed ${formatBytes(SIZE_LIMIT)}`, (value: any) => value && value.length ? value[0].size <= SIZE_LIMIT : true),
    description: yup.string().required(),
    servings: yup.number().min(1).integer().required().typeError("Please enter a valid number"),
    prepTime: yup.number().min(0).integer().required().typeError("Please enter a valid number"),
    cookTime: yup.number().min(0).integer().required().typeError("Please enter a valid number"),
    ingredients: yup.array(yup.string().required("Please fill out or remove this field")).min(1).required(),
    directions: yup.array(yup.string().required("Please fill out or remove this field")).min(1).required(),
    nutrition: yup.object({
        calories: yup.number().min(0).typeError("Please enter a valid number"),
        totalFat: yup.number().min(0).typeError("Please enter a valid number"),
        saturatedFat: yup.number().min(0).typeError("Please enter a valid number"),
        cholesterol: yup.number().min(0).typeError("Please enter a valid number"),
        sodium: yup.number().min(0).typeError("Please enter a valid number"),
        carbohydrates: yup.number().min(0).typeError("Please enter a valid number"),
        fiber: yup.number().min(0).typeError("Please enter a valid number"),
        sugar: yup.number().min(0).typeError("Please enter a valid number"),
        protein: yup.number().min(0).typeError("Please enter a valid number"),
    }).nullable()
}).required();