/* eslint-disable @typescript-eslint/no-non-null-assertion */
import db from '../db/access'

import { FastifyRequest } from "fastify/types/request";
import { FastifyReply } from "fastify/types/reply";

import { type Proyecto } from "../interfaces";
import { parseUint8Array } from '../util/util';


// Required params:
//    id: string; // Project ID in base64 format
//    hwid: string; // HWID to check

const auth = (req: FastifyRequest, res: FastifyReply) => {
  console.log("===============================================")
  console.log("=== Nueva solicitud de autenticación ===")

  // Get project ID from query
  const id = (req.query as { id: string }).id;
  // Check if id is provided
  if (!id) {
    console.log("=== No se ha encontrado el parámetro id ===\n===============================================\n")
    return res.status(400).send();
  }

  
  // Decode project ID from base64
  let idDecoded = Buffer.from(id, "base64")
  // Add null byte to the end of the id
  idDecoded = Buffer.concat([idDecoded, Buffer.from([0])])
  console.log("Project ID: " + idDecoded.toString("hex"))

  // Get project from database
  const project = db.get(idDecoded.toString("hex")) as Proyecto | undefined;
  // Check if project exists
  if (!project) {
    console.log("=== No existe un proyecto con ese ID ===\n===============================================\n")
    return res.status(400).send();
  }


  // Get HWID from query
  const hwid = (req.query as { hwid: string }).hwid;
  // Check if HWID is provided
  if (!hwid) {
    console.log("=== No se ha encontrado el parámetro hwid ===\n===============================================\n")
    return res.status(400).send();
  }
  console.log("HWID: " + hwid)

  // Check if HWID is registered
  if (!project.hwids.includes(hwid)) {
    console.log("=== El HWID no está registrado en el proyecto ===\n===============================================\n")
    return res.status(400).send();
  }

  // Parse key and IV from database to Uint8Array
  const key = parseUint8Array(project.key as unknown as string);
  const iv = parseUint8Array(project.iv as unknown as string);

  // Return the key and IV
  console.log("=== Autenticación exitosa ===\n===============================================\n")
  return res.status(200).send(Buffer.concat([key, iv]));
};

export default auth;