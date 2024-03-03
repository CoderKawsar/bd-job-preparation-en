
export const getErrorMessageByPropertyName = (obj, propertyPath) => {
const properties = propertyPath.split(".")
let value = obj;
for (let property of properties) {
    if(value[property]){
        value = value[property]
    }
    else{
        return undefined
    }

}
return value.message
}