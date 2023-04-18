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
  // Get project ID from query
  const id = (req.query as { id: string }).id;
  // Check if id is provided
  if (!id) return res.status(400).send();

  
  // Decode project ID from base64
  let idDecoded = Buffer.from(id, "base64")
  // Add null byte to the end of the id
  idDecoded = Buffer.concat([idDecoded, Buffer.from([0])])


  // Get project from database
  const project = db.get(idDecoded.toString("hex")) as Proyecto | undefined;
  // Check if project exists
  if (!project) return res.status(404).send();


  // Get HWID from query
  const hwid = (req.query as { hwid: string }).hwid;
  // Check if HWID is provided
  if (!hwid) return res.status(400).send();
  // Check if HWID is registered
  if (!project.hwids.includes(hwid)) return res.status(401).send();

  // Parse key and IV from database to Uint8Array
  const key = parseUint8Array(project.key as unknown as string);
  const iv = parseUint8Array(project.iv as unknown as string);

  // Return the key and IV
  return res.status(200).send(Buffer.concat([key, iv]));
};

export default auth;