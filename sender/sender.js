
const axios = require("axios")
const fs = require("fs")
const csv = require("csv-parser")

const TOKEN = process.env.TOKEN
const PHONE_ID = process.env.PHONE_ID

const TEMPLATE = "offer_waterpark"

let numbers=[]

fs.createReadStream("numbers.csv")
.pipe(csv())
.on("data",(row)=>{

numbers.push(row.number)

})
.on("end",()=>{

send()

})

async function send(){

for(const phone of numbers){

try{

await axios.post(
`https://graph.facebook.com/v18.0/${PHONE_ID}/messages`,
{
messaging_product:"whatsapp",
to:phone,
type:"template",
template:{
name:TEMPLATE,
language:{code:"en_US"}
}
},
{
headers:{
Authorization:`Bearer ${TOKEN}`
}
}
)

fs.appendFileSync("sent.csv",phone+"\n")

console.log("Sent",phone)

}catch(e){

fs.appendFileSync("failed.csv",phone+"\n")

console.log("Failed",phone)

}

await new Promise(r=>setTimeout(r,7000))

}

}
