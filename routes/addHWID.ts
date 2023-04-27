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

  // Get API_KEY from query
  const API_KEY = (req.query as { API_KEY: string }).API_KEY;
  // Check if API_KEY is provided
  if (!API_KEY) return res.status(400).send();
  // Check if API_KEY is correct
  if (API_KEY !== process.env.API_KEY) return res.status(400).send();


  // Get project ID from query
  const id = (req.query as { id: string }).id;
  // Check if id is provided
  if (!id) return res.status(400).send();

  
  // Get project from database
  const project = db.get(id) as Proyecto | undefined;
  // Check if project exists
  if (!project) return res.status(400).send();


  // Get HWID from query
  const hwid = (req.query as { hwid: string }).hwid;
  // Check if HWID is provided
  if (!hwid) return res.status(400).send();
  // Add HWID to database
  if (!project.hwids.includes(hwid)) {
    project.hwids.push(hwid);
    db.set(id, project);
  }

  // Return status code 200
  return res.status(200).send();
};

export default addHWID;