export default {
    deepCopy: function (obj:any){
        return JSON.parse(JSON.stringify(obj))
    }
}