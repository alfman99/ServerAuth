/* eslint-disable @typescript-eslint/no-non-null-assertion */
import db from '../db/access'

import { FastifyRequest } from "fastify/types/request";
import { FastifyReply } from "fastify/types/reply";


import { type Proyecto } from "../interfaces";


// Required params:
//    API_KEY: string; // API_KEY
//    id: string; // Project ID
//    hwid: string; // HWID to add

const addHWID = (req: FastifyRequest, res: FastifyReply) => {
  console.log("===============================================")
  console.log("=== Nueva solicitud de añadir HWID ===")

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


  // Get project ID from query
  const id = (req.query as { id: string }).id;
  // Check if id is provided
  if (!id) {
    console.log("=== No se ha encontrado el parámetro id ===\n===============================================\n")
    return res.status(400).send();
  }

  
  // Get project from database
  const project = db.get(id) as Proyecto | undefined;
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
  // Add HWID to database
  if (!project.hwids.includes(hwid)) {
    project.hwids.push(hwid);
    db.set(id, project);
  }
  else {
    console.log("=== El HWID ya está registrado en el proyecto ===\n===============================================\n")
    return res.status(400).send();
  }

  // Return status code 200
  console.log("=== HWID añadido correctamente ===\n===============================================\n")
  return res.status(200).send();
};

export default addHWID;