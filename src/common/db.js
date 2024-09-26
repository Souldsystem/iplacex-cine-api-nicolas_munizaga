import { MongoClient, ServerApiVersion } from 'mongodb'; 

const uri = 'mongodb+srv://revoltionet:3hpxvgf5wdyDCqWp@eva-u3-express.eaj6t.mongodb.net/?retryWrites=true&w=majority&appName=eva-u3-express';

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1, 
        strict: true,
        deprecationErrors: true
    }
});

export default client;
