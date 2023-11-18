import { StatusCodes } from "http-status-codes"
import { product } from "../models/schemal.js"
import myjson from '../router/products.json' assert {type:'json'}

const getAllProductsStatic =async (req,res)=>{
    try{
        const search='a'
        //skip first then limit is executed
        const pro = await product.find({name:{$regex:search,$options:'i'}}).
        where('price').gt(31).
        sort('name').limit(2).skip(2)
        res.status(StatusCodes.OK).json({pro})
       
    }catch(err){
        res.send(err.message)
    }
}
//can use normal query or chaining query 
const getAllProducts =async (req,res)=>{
    try{
        // console.log(req.query)
        // console.log(req.params)
        const {featured,company,name,sort,field,numericFilters} =req.query
        const queryObject={}
        
        if(featured){
            
            queryObject.featured = (featured=="true")?true:false  
        }
        if(company){
            queryObject.company =company
        }
        if(name){
            queryObject.name ={$regex:name,$options:'i'}
        }
        
        if(numericFilters){
            const operatorMap={
                '>':'$gt',
                '>=':'$gte',
                '=':'$eq',
                '<':'$lt',
                '<=':'$lte'
            }
            const regex =/>|>=|=|<|<=/g
            let filters =numericFilters.replace(regex,(match)=>{
                return `-${operatorMap[match]}-`
            })
            const option_arr =['price','rating']
            filters.split(',').forEach(element => {
                const [field,option,value]=element.split('-')
                if(option_arr.includes(field)){
                    queryObject[field]={[option]:value}
                    console.log(queryObject[field])
                }
            });
        }
        // results is a query of the data (not array so using sort in mongoose) 
        // if using await +product.find() then results become array 
        let results = product.find(queryObject) //find()tìm document thông qu json({})
        // console.log(results)
        // console.log(sort)
        if(sort){
            // if sort more than 1 field then using sort('field1 field2')
            const sortList =sort.split(',').join(' ')
            results.sort(sortList)   
        }else{
           
            results =results.sort('createAt')
        }

        if(field){
            const fieldList =field.split(',').join(' ')
            //select('name_field1 name_field2')
            results =results.select(fieldList)
        }

        const page =req.query.page||1
        const limit =req.query.limit||10
        const skip =(page-1)*limit
        results.skip(skip).limit(limit)


        const products = await results //results is a query not array
        res.status(StatusCodes.OK).json({products,length_product:products.length})
    }catch(err){
        res.status(StatusCodes.BAD_REQUEST).json({msg:err.message})
    }
}

export const task_controller ={
    getAllProductsStatic,
    getAllProducts
}

