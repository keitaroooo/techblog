// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from 'next';

// _req = HTTP incoming message, res = HTTP server response, _reqは_でも良さそう
const handler = (_req: NextApiRequest, res: NextApiResponse): void => {
  res.status(200).json({ text: 'Hello' });
};

export default handler;
