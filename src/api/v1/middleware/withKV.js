import { KVStore } from 'cloudflare-kv-store'

export const withKV = (request, env) => {
  request.KV = new KVStore({ path: 'counter', kv: env.KV })
}
