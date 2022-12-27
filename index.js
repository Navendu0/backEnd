const app = require('./app')
const { connectDatabase } = require('./Database')

connectDatabase()


app.listen(4000,()=>{
    console.log("server run on 4000 ")
})