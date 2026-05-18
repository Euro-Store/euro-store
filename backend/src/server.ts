import 'dotenv/config'
import app from './app'
import { prisma } from './config/database'

const PORT = Number(process.env.PORT) || 5000

async function start() {
  try {
    await prisma.$connect()
    console.log('✅ Database connected')

    app.listen(PORT, () => {
      console.log('')
      console.log('  ════════════════════════════════════')
      console.log('    🚀 Euro Store API')
      console.log(`    http://localhost:${PORT}`)
      console.log(`    /health  |  /api/v1/*`)
      console.log(`    ENV: ${process.env.NODE_ENV}`)
      console.log('  ════════════════════════════════════')
      console.log('')
    })
  } catch (err) {
    console.error('❌ Startup failed:', err)
    process.exit(1)
  }
}

start()

process.on('unhandledRejection', err => console.error('Unhandled:', err))
process.on('SIGTERM', async () => { await prisma.$disconnect(); process.exit(0) })
