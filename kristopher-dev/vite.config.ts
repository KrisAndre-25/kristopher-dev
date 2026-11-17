import { defineConfig, loadEnv, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'

/**
 * En desarrollo (`npm run dev`) sirve /.netlify/functions/chat con la misma
 * función que usa Netlify en producción, así el chat funciona en local sin
 * instalar Netlify CLI. La key se lee de `.env` (GEMINI_API_KEY, sin prefijo
 * VITE_ para que nunca llegue al código del navegador).
 */
function netlifyChatDev(env: Record<string, string>): Plugin {
  return {
    name: 'netlify-chat-dev',
    apply: 'serve',
    configureServer(server) {
      for (const key of ['GEMINI_API_KEY', 'GEMINI_MODEL']) {
        if (env[key] && !process.env[key]) process.env[key] = env[key]
      }
      server.middlewares.use('/.netlify/functions/chat', async (req, res) => {
        try {
          const chunks: Buffer[] = []
          for await (const chunk of req) chunks.push(chunk as Buffer)
          const host = req.headers.host ?? 'localhost'
          const request = new Request(`http://${host}/.netlify/functions/chat`, {
            method: req.method,
            headers: req.headers as Record<string, string>,
            body: req.method === 'GET' || req.method === 'HEAD' ? undefined : Buffer.concat(chunks),
          })
          const mod = await server.ssrLoadModule('/netlify/functions/chat.mts')
          const response: Response = await mod.default(request)
          res.statusCode = response.status
          response.headers.forEach((value, name) => res.setHeader(name, value))
          if (!response.body) return res.end()
          const reader = response.body.getReader()
          for (;;) {
            const { done, value } = await reader.read()
            if (done) break
            res.write(value)
          }
          res.end()
        } catch (error) {
          console.error('[chat-dev]', error instanceof Error ? error.message : error)
          res.statusCode = 500
          res.end(JSON.stringify({ error: 'dev_error' }))
        }
      })
    },
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [react(), netlifyChatDev(env)],
    base: './',
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
  }
})
