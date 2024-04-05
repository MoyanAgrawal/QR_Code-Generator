// //axios----> js
// //get----> get.data
// //post----> add
// //delete----> delete

// // import axios from 'axios'
// const axios = require('axios');

// async function fetchData(data){
//     try{
//         const response =await axios.get('https://jsonplaceholder.typicode.com/posts');
//         console.log(response.data);
//         // return response      
    
//     }
//     catch(err){
//         throw new Error(err);
//         // console.log(err.message);
//     }
// }

// async function main(){
//     try{
//         const data = await fetchData();
//         console.log(data,"S");
//     }
//     catch(err){
//         console.error(err.message)
//     }
// }

// main()



const express = require("express")
const bodyParser = require("body-parser")
const qr_code = require("qrcode")

const app = express();
app.set('view engine','ejs')
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
PORT = 5555;

app.get('/',(req,res)=>{
    res.render('index',{QR_code:''})
})

app.post("/your_QR", (req, res) => {
  const url = req.body.url;

  qr_code.toDataURL(url, (err, qrCodeUrl) => {
    if (err) {
      console.error("Error generating QR code:", err);
      res.status(500).send("Error generating QR code");
    } else {
      res.render("index", { QR_code: qrCodeUrl, img_src: url });
    }
  });
});

// GET request to download QR code
app.get("/download", (req, res) => {
  const filePath = req.query.file_path; // Assuming you're passing file_path as a query parameter
  res.type('png').download(filePath);
});

app.listen(PORT,()=>{
    console.log(`${PORT}`)
})



