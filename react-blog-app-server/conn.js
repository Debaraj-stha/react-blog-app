const mongoose=require("mongoose")

const conn=mongoose.connect(process.env.MONGO_URL).then((_)=>{
    console.log("successfully connected to database")
}).catch((e)=>{
    console.log("error connetcing to database",e)
})
module.exports =conn