import Redis from 'ioredis'

let redis: Redis | null = null

try {
  redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379', {
    maxRetriesPerRequest: 1,
    lazyConnect: true,
    enableReadyCheck: false,
    connectTimeout: 3000,
  })
  redis.on('error', () => { redis = null })
} catch {
  redis = null
}

export { redis }

export const setCache = async (key: string, value: unknown, ttl = 300): Promise<void> => {
  if (!redis) return
  try { await redis.set(`euro:${key}`, JSON.stringify(value), 'EX', ttl) } catch {}
}

export const getCache = async <T>(key: string): Promise<T | null> => {
  if (!redis) return null
  try {
    const raw = await redis.get(`euro:${key}`)
    return raw ? (JSON.parse(raw) as T) : null
  } catch { return null }
}

export const delCache = async (...keys: string[]): Promise<void> => {
  if (!redis) return
  try { await redis.del(...keys.map(k => `euro:${k}`)) } catch {}
}
