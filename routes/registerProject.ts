/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import db from '../db/access'

import { FastifyRequest } from "fastify/types/request";
import { FastifyReply } from "fastify/types/reply";

import { randomBytes } from "crypto";

import { type Proyecto } from "../interfaces";


// Required params:
//    API_KEY: string; // API_KEY
//    id: string; // Project ID

const registerProject = (req: FastifyRequest, res: FastifyReply) => {

  // Get API_KEY from query
  const API_KEY = (req.query as { API_KEY: string }).API_KEY;
  // Check if API_KEY is provided
  if (!API_KEY) return res.status(400).send();
  // Check if API_KEY is correct
  if (API_KEY !== process.env.API_KEY) return res.status(401).send();


  // Get project ID from query
  const id = (req.query as { id: string }).id;
  // Check if id is provided
  if (!id) return res.status(400).send();

  
  // Get project from database
  const project = db.get(id) as Proyecto | undefined;
  // Check if project exists
  if (project) return res.status(400).send();


  // Generate random key and IV as Uint8Array
  const key = JSON.stringify(new Uint8Array(randomBytes(16)));
  const iv = JSON.stringify(new Uint8Array(randomBytes(16)));

  // Save project to database
  db.set(id, {
    key,
    iv,
    hwids: []
  });

  // Return status code 200
  return res.status(200).send();
};

export default registerProject;