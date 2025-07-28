const mongoose=require("mongoose")

const conn=mongoose.connect("mongodb+srv://jeevanstha989:eCcGUVQIe4PgYKZU@cluster0.elgbq5e.mongodb.net/").then((_)=>{
    console.log("successfully connected to database")
}).catch((e)=>{
    console.log("error connetcing to database",e)
})
module.exports =conn