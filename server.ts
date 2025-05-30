import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine } from '@angular/ssr';
import express from 'express';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import bootstrap from './src/main.server';
import axios from 'axios';

// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
  const server = express();
  const serverDistFolder = dirname(fileURLToPath(import.meta.url));
  const browserDistFolder = resolve(serverDistFolder, '../browser');
  const indexHtml = join(serverDistFolder, 'index.server.html');

  const commonEngine = new CommonEngine();
// haga el build
  server.use(express.json({ limit: "50mb" })); // Por ejemplo, 10 MB
  server.set('view engine', 'html');
  server.set('views', browserDistFolder);

  server.get('/api', async (req, res) => {
    res.send("funciona api")
  });

  server.post('/api/generate-pdf', async (req, res) => {
    const { htmlContent } = req.body;
    console.log("entro html")
    if (htmlContent == undefined) res.json(false)
      console.log(typeof htmlContent)
    try {
      const response = await axios.post(
        'http://127.0.0.1:3030/api/generate-pdf/cambiarios',
        { htmlContent },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          responseType: 'arraybuffer', // Para manejar la respuesta como un Blob (PDF)
        }
      );

      res.setHeader('Content-Type', 'application/pdf');
      res.send(Buffer.from(response.data));// Devuelve el Blob
    } catch (error) {
      console.error('Error al generar el PDF:', error);
      res.status(500).json({ error: 'Error al generar el PDF' });
      // Propaga el error para manejarlo en el componente
    }
  });
  // Example Express Rest API endpoints
  // server.get('/api/**', (req, res) => { });
  // Serve static files from /browser
  server.get('*.*', express.static(browserDistFolder, {
    maxAge: '1y'
  }));

  // All regular routes use the Angular engine
  server.get('*', (req, res, next) => {
    const { protocol, originalUrl, baseUrl, headers } = req;

    commonEngine
      .render({
        bootstrap,
        documentFilePath: indexHtml,
        url: `${protocol}://${headers.host}${originalUrl}`,
        publicPath: browserDistFolder,
        providers: [{ provide: APP_BASE_HREF, useValue: baseUrl }],
      })
      .then((html) => res.send(html))
      .catch((err) => next(err));
  });

  return server;
}

function run(): void {
  const port = process.env['PORT'] || 4000;

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

run();
