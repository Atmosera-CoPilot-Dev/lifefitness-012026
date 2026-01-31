import React, { useEffect, useMemo, useState } from 'react'
import { DbContext } from './db/context.js'
import { ProductForm } from './components/ProductForm.jsx'
import { InventoryList } from './components/InventoryList.jsx'
import { OrderForm } from './components/OrderForm.jsx'
import { OrdersList } from './components/OrdersList.jsx'
import { HealthCheck } from './components/HealthCheck.jsx'

export default function App() {
  const [ctx, setCtx] = useState(null)
  const [suppliers, setSuppliers] = useState([])
  const [products, setProducts] = useState([])
  const [orders, setOrders] = useState([])

  useEffect(() => {
    DbContext.create().then((c) => {
      setCtx(c)
    })
  }, [])

  const refresh = async () => {
    if (!ctx) return
    const s = ctx.listSuppliers()
    const p = ctx.listProducts()
    const o = ctx.listOrders()
    setSuppliers(s)
    setProducts(p)
    setOrders(o)
  }

  useEffect(() => {
    if (ctx) refresh()
  }, [ctx])

  if (!ctx) {
    return <div style={{ padding: 16 }}>Loading database…</div>
  }

  return (
    <div>
      <HealthCheck />
      <div className="grid">
      <div className="card">
        <h2>Suppliers & Products</h2>
        <ProductForm ctx={ctx} suppliers={suppliers} onSaved={refresh} />
        <InventoryList products={products} suppliers={suppliers} />
      </div>
      <div className="card">
        <h2>Orders</h2>
        <OrderForm ctx={ctx} suppliers={suppliers} products={products} onSaved={refresh} />
        <OrdersList orders={orders} />
      </div>
      </div>
    </div>
  )
}
