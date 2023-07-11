/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import db from '../db/access'

import { FastifyRequest } from "fastify/types/request";
import { FastifyReply } from "fastify/types/reply";

import { randomBytes } from "crypto";

import { type Proyecto } from "../interfaces";
import { string2ArrayBuffer } from '../util/util';


// Required params:
//    API_KEY: string; // API_KEY

const registerProject = (req: FastifyRequest, res: FastifyReply) => {
  console.log("===============================================")
  console.log("=== Nueva solicitud de registro de proyecto ===")

  // Get API_KEY from query
  const API_KEY = (req.query as { API_KEY: string }).API_KEY;
  // Check if API_KEY is provided
  if (!API_KEY) {
    console.log("=== No se ha encontrado el parámetro API_KEY ===\n===============================================\n")
    return res.status(400).send();
  }
  // Check if API_KEY is correct
  if (API_KEY !== process.env.API_KEY) {
    console.log("=== API_KEY incorrecta ===\n===============================================\n")
    return res.status(400).send();
  }


  // Generate project id with exactly 20 characters untill there is no project with the same id
  let id: Buffer;
  do {
    id = randomBytes(21);
    // last byte is the length of the id must be \0
    id[20] = 0;
  } while (db.get(id.toString("hex")) as Proyecto | undefined);


  // Generate random key and IV as Uint8Array
  const key = new Uint8Array(randomBytes(16));
  const iv = new Uint8Array(randomBytes(16));

  // Save project to database
  db.set(id.toString("hex"), {
    key: JSON.stringify(key),
    iv: JSON.stringify(iv),
    hwids: []
  });

  const response = Buffer.concat([id, key, iv])

  
  // Return the key and IV
  console.log("=== Nuevo proyecto registrado ===\n===============================================\n")
  return res.status(200).send(response);
};

export default registerProject;