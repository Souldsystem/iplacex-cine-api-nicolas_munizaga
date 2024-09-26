import { ObjectId } from 'mongodb';
import client from '../common/db.js';
import { pelicula } from '../pelicula/pelicula.js';  
import { actor } from './actor.js';        

const db = client.db('cine-db'); 
const actorCollection = db.collection('actores');
const peliculaCollection = db.collection('peliculas');

async function handleInsertActorRequest(req, res) {
    const { idPelicula, nombre, edad, estaRetirado, premios } = req.body;

    try {
     
        const pelicula = await peliculaCollection.findOne({ nombre: idPelicula });
        if (!pelicula) return res.status(404).send('Película no encontrada');

        const nuevoActor = {
            _id: new ObjectId(),
            idPelicula: pelicula._id,
            nombre,
            edad,
            estaRetirado,
            premios
        };

        const result = await actorCollection.insertOne(nuevoActor);
        if (result.insertedCount === 0) return res.status(400).send('Error al guardar el actor');
        return res.status(201).send(result);
    } catch (e) {
        return res.status(500).send({ error: e.message });
    }
}

async function handleGetActoresRequest(req, res) {
    try {
        const actores = await actorCollection.find({}).toArray();
        return res.status(200).send(actores);
    } catch (e) {
        return res.status(500).send({ error: e.message });
    }
}

async function handleGetActorByIdRequest(req, res) {
    const id = req.params.id;

    try {
        const oid = new ObjectId(id);
        const actor = await actorCollection.findOne({ _id: oid });

        if (!actor) return res.status(404).send('Actor no encontrado');
        return res.status(200).send(actor);
    } catch (e) {
        return res.status(400).send('Id mal formado');
    }
}

async function handleGetActoresByPeliculaIdRequest(req, res) {
    const idPelicula = req.params.pelicula;

    try {
        const oid = new ObjectId(idPelicula); 
        const actores = await actorCollection.find({ idPelicula: oid }).toArray();
        return res.status(200).send(actores);
    } catch (e) {
        return res.status(500).send({ error: e.message });
    }
}

export default {
    handleInsertActorRequest,
    handleGetActoresRequest,
    handleGetActorByIdRequest,
    handleGetActoresByPeliculaIdRequest
};
