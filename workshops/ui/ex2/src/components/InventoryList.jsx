import React, { useMemo, useState } from 'react'

export function InventoryList({ products, suppliers }) {
  const [query, setQuery] = useState('')
  const [supplierFilter, setSupplierFilter] = useState('')
  const [sortBy, setSortBy] = useState('name')
  const [sortDir, setSortDir] = useState('asc')

  const supMap = new Map(suppliers.map((s) => [s.id, s.name]))

  const filtered = useMemo(() => {
    let rows = products
    if (query) {
      const q = query.toLowerCase()
      rows = rows.filter((p) => p.name.toLowerCase().includes(q))
    }
    if (supplierFilter) {
      rows = rows.filter((p) => String(p.supplier_id) === String(supplierFilter))
    }
    rows = [...rows].sort((a, b) => {
      const dir = sortDir === 'asc' ? 1 : -1
      if (sortBy === 'name') return a.name.localeCompare(b.name) * dir
      if (sortBy === 'price') return (a.price - b.price) * dir
      if (sortBy === 'stock') return (a.stock - b.stock) * dir
      return 0
    })
    return rows
  }, [products, query, supplierFilter, sortBy, sortDir])

  return (
    <div>
      <strong>Inventory</strong>
      <div style={{ display: 'flex', gap: 8, margin: '8px 0' }}>
        <input placeholder="Search products" value={query} onChange={(e) => setQuery(e.target.value)} />
        <select value={supplierFilter} onChange={(e) => setSupplierFilter(e.target.value)}>
          <option value="">All suppliers</option>
          {suppliers.map((s) => (
            <option key={s.id} value={s.id}>{s.name}</option>
          ))}
        </select>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="name">Name</option>
          <option value="price">Price</option>
          <option value="stock">Stock</option>
        </select>
        <select value={sortDir} onChange={(e) => setSortDir(e.target.value)}>
          <option value="asc">Asc</option>
          <option value="desc">Desc</option>
        </select>
      </div>
      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Supplier</th>
            <th>Price</th>
            <th>Stock</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((p) => (
            <tr key={p.id}>
              <td>{p.name}</td>
              <td>{p.supplier_name || supMap.get(p.supplier_id) || '—'}</td>
              <td>${p.price.toFixed(2)}</td>
              <td>{p.stock}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
