import React from 'react'

export function OrdersList({ orders }) {
  return (
    <div>
      <strong>Recent Orders</strong>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Supplier</th>
            <th>Date</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o.id}>
              <td>{o.id}</td>
              <td>{o.supplier_name}</td>
              <td>{new Date(o.order_date).toLocaleString()}</td>
              <td>${o.total.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {orders.map((o) => (
        <div key={'items-' + o.id} style={{ marginTop: 8 }}>
          <em>Items for order #{o.id}</em>
          <ul>
            {o.items.map((it) => (
              <li key={it.id}>{it.product_name} × {it.quantity} @ ${it.unit_price.toFixed(2)}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}
