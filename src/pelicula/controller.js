import { ObjectId } from 'mongodb';
import client from '../common/db.js';
import { pelicula } from './pelicula.js';

const peliculaCollection = client.db('cine-db').collection('peliculas');


async function handleInsertPeliculaRequest(req, res) {
    const data = req.body;
    const nuevaPelicula = {
        _id: new ObjectId(), 
        nombre: data.nombre,
        generos: data.generos,
        anioEstreno: data.anioEstreno
    };

    try {
        const result = await peliculaCollection.insertOne(nuevaPelicula);
        if (result.insertedCount === 0) return res.status(400).send('Error al guardar la película');
        return res.status(201).send(result);
    } catch (e) {
        return res.status(500).send({ error: e.message });
    }
}


async function handleGetPeliculasRequest(req, res) {
    try {
        const data = await peliculaCollection.find({}).toArray();
        return res.status(200).send(data);
    } catch (e) {
        return res.status(500).send({ error: e.message });
    }
}


async function handleGetPeliculaByIdRequest(req, res) {
    const id = req.params.id;

    try {
        const oid = new ObjectId(id);
        const data = await peliculaCollection.findOne({ _id: oid });
        if (!data) return res.status(404).send('Película no encontrada');
        return res.status(200).send(data);
    } catch (e) {
        return res.status(400).send('ID mal formado');
    }
}


async function handleUpdatePeliculaByIdRequest(req, res) {
    const id = req.params.id;
    const data = req.body;

    try {
        const oid = new ObjectId(id); 
        const query = { $set: data };
        const result = await peliculaCollection.updateOne({ _id: oid }, query);
        if (result.modifiedCount === 0) return res.status(400).send('Error al actualizar la película');
        return res.status(200).send(result);
    } catch (e) {
        return res.status(400).send('ID mal formado');
    }
}


async function handleDeletePeliculaByIdRequest(req, res) {
    const id = req.params.id;

    try {
        const oid = new ObjectId(id); 
        const result = await peliculaCollection.deleteOne({ _id: oid });
        if (result.deletedCount === 0) return res.status(400).send('Error al eliminar la película');
        return res.status(200).send(result);
    } catch (e) {
        return res.status(400).send('ID mal formado');
    }
}


async function handleSearchPeliculaRequest(req, res) {
    const query = req.body;

    try {
        const data = await peliculaCollection.find(query).toArray();
        return res.status(200).send(data);
    } catch (e) {
        return res.status(500).send({ error: e.message });
    }
}

export default {
    handleInsertPeliculaRequest,
    handleGetPeliculasRequest,
    handleGetPeliculaByIdRequest,
    handleUpdatePeliculaByIdRequest,
    handleDeletePeliculaByIdRequest,
    handleSearchPeliculaRequest
};
