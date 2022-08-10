// WebPack bundles this thing up to give us our core plugins.
import "core-js"
// Bitcoin related currencies
import 'edge-currency-accountbased'
// Ethereum related currencies
import { setMemletConfig } from 'edge-currency-plugins'

setMemletConfig({
  maxMemoryUsage: 50 * 1024 * 1024 // 50MB
})
