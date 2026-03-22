
const express = require("express")
const fs = require("fs")

const app = express()
app.use(express.static("public"))

app.get("/api/report",(req,res)=>{

let sent=0
let failed=0

if(fs.existsSync("sent.csv"))
sent = fs.readFileSync("sent.csv","utf8").split("\n").filter(Boolean).length

if(fs.existsSync("failed.csv"))
failed = fs.readFileSync("failed.csv","utf8").split("\n").filter(Boolean).length

res.json({sent,failed})

})

app.listen(3000,()=>{
console.log("Dashboard running")
})
