/* const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb')
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express()
const port = process.env.PORT || 5000

// middlewares
app.use(cors())
app.use(express.json())

// Database Connection
const uri = process.env.DB_URI
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
})

async function run() {
  try {
    const homesCollection = client.db('aircnc-db').collection('homes')

    console.log('Database Connected...')
  } finally {
  }
}

run().catch(err => console.error(err))

app.get('/', (req, res) => {
  res.send('Server is running...')
})

app.listen(port, () => {
  console.log(`Server is running...on ${port}`)
})
 */
const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;
require('dotenv').config();
const jwt = require('jsonwebtoken');

//* middleware
app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.drjbcpx.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
  const homesCollection = client.db('aircnc-db').collection('homes');
  const usersCollection = client.db('aircnc-db').collection('users');

  try {

    app.put('/user/:email', async (req, res) => {
      const email = req.params.email;
      const user = req.body;
      const filter = { email: email };
      const options = { upsert: true };
      const updateDoc = {
        $set: {
          user: user
        }
      };
      const result = await usersCollection.updateOne(filter, updateDoc, options);

      const token = jwt.sign(user, process.env.ACCESS_TOKEN, { expiresIn: '1d' })
      res.send({ result, token })
      console.log(result, token)
    });
  }
  finally {

  }
}
run().catch(err => console.error(err))

app.get('/', (req, res) => {
  res.send('Arcnc server is running')
})

app.listen(port, () => {
  console.log(`Arcnc server is running on ${port} port`)
})

