/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { FastifyRequest } from "fastify/types/request";
import { FastifyReply } from "fastify/types/reply";

import db from "../db/init";
import { type Proyecto } from "../interfaces";


// Required params:
//    id: string; // Project ID
//    hwid: string; // HWID to check
const addHWID = async (req: FastifyRequest, res: FastifyReply) => {
  // Get project ID from query
  const id = (req.query as { id: string }).id;
  // Check if id is provided
  if (!id) return res.status(400).send();

  
  // Get project from database
  const project = db.get(id) as Proyecto | undefined;
  // Check if project exists
  if (!project) return res.status(404).send();


  // Get HWID from query
  const hwid = (req.query as { hwid: string }).hwid;
  // Check if HWID is provided
  if (!hwid) return res.status(400).send();
  // Check if HWID is registered
  if (!project.hwids.includes(hwid)) return res.status(401).send();

  // Parse key and IV from database to Uint8Array
  const a = JSON.parse(project.iv as unknown as string) as { [key: string]: number };
  const b = JSON.parse(project.key as unknown as string) as { [key: string]: number };

  // Generate the return value in the correct format
  const retVal = new Uint8Array(32);
  for(let i = 0; i < Object.keys(a).length; i++) {
    retVal[i] = a[i]!;
  }
  for(let i = 0; i < Object.keys(b).length; i++) {
    retVal[16+i] = b[i]!;
  }


  // Return the key and IV
  return res.status(200).send(Buffer.from(retVal));
};

export default addHWID;