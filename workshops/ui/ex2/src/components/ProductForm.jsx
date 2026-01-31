import React, { useState } from 'react'

export function ProductForm({ ctx, suppliers, onSaved }) {
  const [name, setName] = useState('')
  const [supplierId, setSupplierId] = useState(suppliers[0]?.id || '')
  const [price, setPrice] = useState('')
  const [stock, setStock] = useState('')

  const addSupplierQuick = () => {
    const nm = prompt('New supplier name:')
    if (nm) {
      ctx.addSupplier(nm)
      onSaved?.()
      setSupplierId(ctx.listSuppliers()[0]?.id || '')
    }
  }

  const submit = (e) => {
    e.preventDefault()
    if (!name || !supplierId || !price || !stock) return
    ctx.addProduct({ name, supplierId: Number(supplierId), price: Number(price), stock: Number(stock) })
    onSaved?.()
    setName('')
    setPrice('')
    setStock('')
  }

  return (
    <form onSubmit={submit} style={{ marginBottom: 12 }}>
      <strong>Add Product</strong>
      <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <div style={{ display: 'flex', gap: 8 }}>
        <select value={supplierId} onChange={(e) => setSupplierId(e.target.value)}>
          {suppliers.map((s) => (
            <option key={s.id} value={s.id}>{s.name}</option>
          ))}
        </select>
        <button type="button" onClick={addSupplierQuick}>+ Supplier</button>
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        <input type="number" step="0.01" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} />
        <input type="number" placeholder="Stock" value={stock} onChange={(e) => setStock(e.target.value)} />
      </div>
      <button type="submit">Save Product</button>
    </form>
  )
}
