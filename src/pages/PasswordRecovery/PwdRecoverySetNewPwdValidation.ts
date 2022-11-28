import {ErrorType, errorUtils} from "src/utils/errorUtils";
import {errorValidation} from "src/utils/errorValidation";


type Errors = {
    pwd: ErrorType[]
    pwd2: ErrorType[]
    common: ErrorType[]
}
const getInitialErrors = (): Errors => ({
    pwd: [],
    pwd2: [],
    common: [],
})
type Values = {
    pwd: string
    pwd2: string
}
const checkOnErrors = async (values: Values): Promise<Errors> => {
    const errors = getInitialErrors()
    const validators = {
        pwd: [
            v => errorValidation.required(v,'Пароль обязателен'),
            v => v.length<6 ? errorUtils.of('incorrect', 'Пароль должен быть не короче 6 символов') : undefined,
        ],
        pwd2: [
            v => errorValidation.required(v,'Повторите пароль'),
            (v,vs) => v===vs.pwd ? undefined : errorUtils.of('incorrect', 'Пароли должны совпадать')
        ],
    }
    errorValidation.validate(errors,validators,values)
    return errors
}




export const pwdRecoverySetNewPwdValidation = {
    getInitialErrors,
    checkOnErrors,
}
