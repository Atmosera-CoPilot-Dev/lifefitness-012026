// Copies sql-wasm.wasm from node_modules to public for reliable loading
import { promises as fs } from 'fs'
import path from 'path'

async function main() {
  const src = path.join(process.cwd(), 'node_modules', 'sql.js', 'dist', 'sql-wasm.wasm')
  const destDir = path.join(process.cwd(), 'public')
  const dest = path.join(destDir, 'sql-wasm.wasm')
  try {
    await fs.mkdir(destDir, { recursive: true })
    await fs.copyFile(src, dest)
    console.log('Copied sql-wasm.wasm to public/')
  } catch (err) {
    console.warn('Warning: Could not copy sql-wasm.wasm:', err?.message)
  }
}

main()
