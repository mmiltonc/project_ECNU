import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { event_name, user_data, custom_data } = req.body;

  try {
    const response = await fetch(`https://graph.facebook.com/v12.0/TU_PIXEL_ID/events`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: [
          {
            event_name,
            event_time: Math.floor(new Date().getTime() / 1000),
            user_data,
            custom_data,
            event_source_url: req.headers.referer,
          },
        ],
        access_token: 'TU_ACCESS_TOKEN',
      }),
    });

    const result = await response.json();
    res.status(200).json(result);
  } catch (error) {
    console.error('Error en el API de Conversiones:', error);
    res.status(500).json({ error: 'Error en el API de Conversiones' });
  }
}
