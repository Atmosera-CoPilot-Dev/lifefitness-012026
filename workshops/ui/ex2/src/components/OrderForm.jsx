import React, { useMemo, useState } from 'react'

export function OrderForm({ ctx, suppliers, products, onSaved }) {
  const [supplierId, setSupplierId] = useState(suppliers[0]?.id || '')
  const [items, setItems] = useState(() => {
    const first = products[0]?.id || ''
    return first ? [{ productId: first, quantity: '1' }] : []
  })
  const [error, setError] = useState('')

  const supplierProducts = useMemo(() => {
    if (!supplierId) return products
    return products.filter((p) => String(p.supplier_id) === String(supplierId))
  }, [products, supplierId])

  const setItemField = (idx, field, value) => {
    setItems((prev) => prev.map((it, i) => (i === idx ? { ...it, [field]: value } : it)))
  }
  const addItem = () => {
    const first = supplierProducts[0]?.id || products[0]?.id || ''
    setItems((prev) => [...prev, { productId: first, quantity: '1' }])
  }
  const removeItem = (idx) => {
    setItems((prev) => prev.filter((_, i) => i !== idx))
  }

  const total = useMemo(() => {
    return items.reduce((sum, it) => {
      const prod = products.find((p) => String(p.id) === String(it.productId))
      const price = prod ? Number(prod.price) : 0
      const qty = Number(it.quantity || 0)
      return sum + price * qty
    }, 0)
  }, [items, products])

  const submit = (e) => {
    e.preventDefault()
    if (!supplierId || items.length === 0) return
    const validItems = items
      .filter((it) => it.productId && Number(it.quantity) > 0)
      .map((it) => ({ productId: Number(it.productId), quantity: Number(it.quantity) }))
    if (!validItems.length) return
    try {
      setError('')
      ctx.placeOrder({ supplierId: Number(supplierId), items: validItems })
      onSaved?.()
      // reset
      setItems([{ productId: supplierProducts[0]?.id || products[0]?.id || '', quantity: '1' }])
    } catch (err) {
      setError(err.message || 'Failed to place order')
    }
  }

  return (
    <form onSubmit={submit} style={{ marginBottom: 12 }}>
      <strong>Place Order</strong>
      <select value={supplierId} onChange={(e) => setSupplierId(e.target.value)}>
        {suppliers.map((s) => (
          <option key={s.id} value={s.id}>{s.name}</option>
        ))}
      </select>

      {items.map((it, idx) => {
        const prod = products.find((p) => String(p.id) === String(it.productId))
        const max = prod ? Number(prod.stock) : undefined
        const qty = Number(it.quantity || 0)
        const over = max !== undefined && qty > max
        return (
        <div key={idx} style={{ display: 'flex', gap: 8, alignItems: 'center', marginTop: 6 }}>
          <select value={it.productId} onChange={(e) => setItemField(idx, 'productId', e.target.value)}>
            {(supplierProducts.length ? supplierProducts : products).map((p) => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
          <input type="number" min="1" placeholder="Qty" value={it.quantity} onChange={(e) => setItemField(idx, 'quantity', e.target.value)} max={max} />
          {over && <span style={{ color: 'crimson' }}>Exceeds stock ({max})</span>}
          <button type="button" onClick={() => removeItem(idx)} aria-label={`Remove item ${idx+1}`}>Remove</button>
        </div>
      )})}

      <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
        <button type="button" onClick={addItem}>+ Add Item</button>
        <div style={{ marginLeft: 'auto' }}><em>Total: ${total.toFixed(2)}</em></div>
      </div>

      {error && <div style={{ color: 'crimson', marginTop: 6 }}>{error}</div>}
      <button type="submit" style={{ marginTop: 8 }} disabled={items.some((it) => {
        const prod = products.find((p) => String(p.id) === String(it.productId))
        const max = prod ? Number(prod.stock) : 0
        return Number(it.quantity || 0) > max
      })}>Submit Order</button>
    </form>
  )
}
