
import { ObjectId, BSONType } from 'mongodb';

export const pelicula = {
    _id: ObjectId,
    nombre: BSONType.string,
    generos: BSONType.array,
    anioEstreno: BSONType.int
};