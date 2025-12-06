const express = require('express')
const app = express()
const port = 3000
const cors = require("cors");
app.use(cors())


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://HomeNest:QHs4iimcxJlmuKHd@cluster.utdm4vq.mongodb.net/?appName=Cluster";


const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    
    await client.connect();
    const db=client.db('HomeNest')
    const propertiesCollection=db.collection('Properties')

    app.get('/properties',async(req,res)=>{
      const result=await propertiesCollection.find().toArray()
      res.send(result)
    })





    
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    
    // await client.close();
  }
}
run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})












/**
 *   #2563EB
 *    #1E40AF
 *    #F1F5F9
 * #FACC15
 * #0F172A
 * #0d1a45
 * 
 * 
 * 
 */