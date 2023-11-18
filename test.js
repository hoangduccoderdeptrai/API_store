// const operatorMap = {
//     '>': '$gt',
//     '>=': '$gte',
//     '=': '$eq',
//     '<': '$lt',
//     '<=': '$lte',
// };
// const array_obj={}
// let numericFilters ='price>=30,price<70'
// const regEx = /\b(<|>|>=|=|<|<=)\b/g;
// let filters = numericFilters.replace(
//     regEx,
//     (match) => `-${operatorMap[match]}-`
//   );

// filters.split(',').forEach(value=>{
//     const [field,option,val] =value.split('-')
//     if(array_obj[field]){
//         let a =array_obj[field]
       
//         console.log(a)
        
//     }else
//         array_obj[field]={[option] : val}
//     // console.log(field,option,val)
// })

// console.log(array_obj)