const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
app.use(cors());
app.use(express.json());
require("dotenv").config();

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster.utdm4vq.mongodb.net/?appName=Cluster`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // await client.connect();
    const db = client.db("HomeNest");
    const propertiesCollection = db.collection("Properties");
    const reviewsCollection = db.collection("MyReviews");




    app.get("/properties", async (req, res) => {
      const { limit,skip } = req.query;
      
      const result = await propertiesCollection
        .find()
        
        .limit(Number(limit))
        .skip(Number(skip))
        .toArray();


        const count =await propertiesCollection.countDocuments()
      res.send({result,total:count});
    });















    app.post("/properties", async (req, res) => {
      const data = req.body;
      const result = await propertiesCollection.insertOne(data);
      res.send(result);
    });
    app.get("/my-properties", async (req, res) => {
      const email = req.query.email;
      const result = await propertiesCollection
        .find({
          userEmail: email,
        })
        .toArray();
      res.send(result);
    });
    app.get("/my-latest-properties", async (req, res) => {
      const email = req.query.email;
      const result = await propertiesCollection
        .find({
          userEmail: email,
        })
        .sort({ postedAt: "desc" })
        .limit(2)
        .toArray();
      res.send(result);
    });
    app.get("/properties/:id", async (req, res) => {
      const { id } = req.params;
      const result = await propertiesCollection.findOne({
        _id: new ObjectId(id),
      });
      res.send(result);
    });

    app.post("/reviews", async (req, res) => {
      const data = req.body;
      const result = await reviewsCollection.insertOne(data);
      res.send(result);
    });

    app.get("/my-reviews/", async (req, res) => {
      const email = req.query.email;
      const result = await reviewsCollection
        .find({
          rated_by: email,
        })
        .toArray();
      res.send(result);
    });
    app.get("/my-latest-reviews/", async (req, res) => {
      const email = req.query.email;
      const result = await reviewsCollection
        .find({
          rated_by: email,
        })
        .sort({ postedAt: "desc" })
        .limit(2)
        .toArray();
      res.send(result);
    });

    app.put("/properties/:id", async (req, res) => {
      const { id } = req.params;
      const data = req.body;
      const objectId = new ObjectId(id);
      const filter = { _id: objectId };
      const update = {
        $set: data,
      };
      const result = await propertiesCollection.updateOne(filter, update);
      res.send(result);
    });
    app.delete("/properties/:id", async (req, res) => {
      const { id } = req.params;
      const result = await propertiesCollection.deleteOne({
        _id: new ObjectId(id),
      });
      res.send(result);
    });

    app.get("/latest-properties", async (req, res) => {
      const result = await propertiesCollection
        .find()
        .sort({ postedAt: "desc" })
        .limit(6)
        .toArray();
      res.send(result);
    });

    app.get("/search", async (req, res) => {
      const r = req.query.search;
      const result = await propertiesCollection
        .find({ category: { $regex: r, $options: "i" } })
        .toArray();
      res.send(result);
    });

    app.get("/sort", async (req, res) => {
      const result = await propertiesCollection
        .find()
        .sort({ price: "asc" })
        .toArray();
      res.send(result);
    });

    // await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

/**
 *   #3A5A9B
    #4FA3A5

 *
 *
 *
 */
