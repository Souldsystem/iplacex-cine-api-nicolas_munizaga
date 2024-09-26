import { ObjectId, BSONType } from 'mongodb';

export const actor = {
    _id: ObjectId,
    idPelicula: BSONType.string,
    nombre: BSONType.string,
    edad: BSONType.int,
    estaRetirado: BSONType.bool,
    premios: BSONType.array
};
