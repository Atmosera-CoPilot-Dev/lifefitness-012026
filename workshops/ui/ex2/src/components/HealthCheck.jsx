import React, { useEffect, useState } from 'react'

export function HealthCheck() {
  const [status, setStatus] = useState('checking')
  const [ctype, setCtype] = useState('')

  useEffect(() => {
    let cancelled = false
    async function check() {
      try {
        const res = await fetch('/sql-wasm.wasm', { method: 'GET', cache: 'no-store' })
        if (cancelled) return
        setCtype(res.headers.get('content-type') || '')
        setStatus(res.ok ? 'ok' : 'missing')
      } catch (err) {
        if (cancelled) return
        setStatus('error')
      }
    }
    check()
    return () => { cancelled = true }
  }, [])

  const color = status === 'ok' ? '#227700' : status === 'missing' ? '#aa7700' : status === 'checking' ? '#666' : '#cc0000'
  const label = status === 'ok' ? 'WASM OK' : status === 'missing' ? 'WASM Missing' : status === 'checking' ? 'WASM Checking…' : 'WASM Error'

  return (
    <div style={{ padding: '8px 12px', border: '1px solid #eee', borderRadius: 8, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
      <span style={{ display: 'inline-block', width: 10, height: 10, borderRadius: '50%', background: color }} />
      <strong>{label}</strong>
      {ctype && <span style={{ color: '#666' }}>({ctype})</span>}
    </div>
  )
}
