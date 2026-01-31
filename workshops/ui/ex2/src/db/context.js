import initSqlJs from 'sql.js'

export class DbContext {
  constructor(SQL) {
    this.SQL = SQL
    this.db = new SQL.Database()
  }

  static async create() {
    const SQL = await initSqlJs({ locateFile: () => '/sql-wasm.wasm' })
    // Basic console signal for health/debug
    console.info('[DbContext] sql.js initialized, using /sql-wasm.wasm')
    const ctx = new DbContext(SQL)
    ctx.migrate()
    ctx.seed()
    return ctx
  }

  migrate() {
    const ddl = `
      PRAGMA foreign_keys = ON;
      CREATE TABLE IF NOT EXISTS suppliers (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL
      );
      CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        supplier_id INTEGER NOT NULL,
        price REAL NOT NULL,
        stock INTEGER NOT NULL DEFAULT 0,
        FOREIGN KEY (supplier_id) REFERENCES suppliers(id) ON DELETE CASCADE
      );
      CREATE TABLE IF NOT EXISTS orders (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        supplier_id INTEGER NOT NULL,
        order_date TEXT NOT NULL,
        FOREIGN KEY (supplier_id) REFERENCES suppliers(id)
      );
      CREATE TABLE IF NOT EXISTS order_items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        order_id INTEGER NOT NULL,
        product_id INTEGER NOT NULL,
        quantity INTEGER NOT NULL,
        unit_price REAL NOT NULL,
        FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
        FOREIGN KEY (product_id) REFERENCES products(id)
      );
    `
    this.db.exec(ddl)
  }

  seed() {
    const existing = this.listSuppliers()
    if (existing.length) return
    this.run('BEGIN TRANSACTION;')
    this.run("INSERT INTO suppliers(name) VALUES ('Acme Supplies'), ('Northwind Traders'), ('Globex')")
    this.run("INSERT INTO products(name,supplier_id,price,stock) VALUES 
      ('Widget A', 1, 9.99, 100),
      ('Widget B', 1, 14.5, 50),
      ('Gadget X', 2, 29.0, 25),
      ('Gizmo Z', 3, 5.75, 200)")
    this.run('COMMIT;')
  }

  run(sql, params = []) {
    const stmt = this.db.prepare(sql)
    stmt.bind(params)
    stmt.step()
    stmt.free()
  }

  all(sql, params = []) {
    const stmt = this.db.prepare(sql)
    stmt.bind(params)
    const rows = []
    while (stmt.step()) {
      rows.push(stmt.getAsObject())
    }
    stmt.free()
    return rows
  }

  addSupplier(name) {
    this.run('INSERT INTO suppliers(name) VALUES(?)', [name])
    return this.all('SELECT * FROM suppliers ORDER BY name')
  }

  listSuppliers() {
    return this.all('SELECT * FROM suppliers ORDER BY name')
  }

  addProduct({ name, supplierId, price, stock }) {
    this.run('INSERT INTO products(name, supplier_id, price, stock) VALUES(?,?,?,?)', [name, supplierId, price, stock])
    return this.listProducts()
  }

  listProducts() {
    return this.all(
      `SELECT p.id, p.name, p.price, p.stock, s.id AS supplier_id, s.name AS supplier_name
       FROM products p JOIN suppliers s ON s.id = p.supplier_id
       ORDER BY p.name`
    )
  }

  placeOrder({ supplierId, items }) {
    this.run('BEGIN TRANSACTION;')
    try {
      this.run('INSERT INTO orders(supplier_id, order_date) VALUES(?, ?)', [supplierId, new Date().toISOString()])
      const order = this.all('SELECT last_insert_rowid() AS id')[0]
      for (const it of items) {
        const prod = this.all('SELECT price, stock FROM products WHERE id = ?', [it.productId])[0]
        if (!prod) throw new Error('Product not found')
        const unitPrice = Number(prod.price)
        const qty = Number(it.quantity)
        if (qty <= 0) throw new Error('Quantity must be greater than zero')
        if (qty > Number(prod.stock)) {
          throw new Error(`Insufficient stock for product ${it.productId}`)
        }
        this.run('INSERT INTO order_items(order_id, product_id, quantity, unit_price) VALUES(?,?,?,?)', [order.id, it.productId, qty, unitPrice])
        this.run('UPDATE products SET stock = stock - ? WHERE id = ?', [qty, it.productId])
      }
      this.run('COMMIT;')
      return this.listOrders()
    } catch (err) {
      this.run('ROLLBACK;')
      throw err
    }
  }

  listOrders() {
    const orders = this.all(
      `SELECT o.id, o.order_date, s.name AS supplier_name
       FROM orders o JOIN suppliers s ON s.id = o.supplier_id
       ORDER BY o.id DESC`
    )
    return orders.map((o) => {
      const items = this.all(
        `SELECT oi.id, oi.quantity, oi.unit_price, p.name AS product_name
         FROM order_items oi JOIN products p ON p.id = oi.product_id
         WHERE oi.order_id = ?`,
        [o.id]
      )
      const total = items.reduce((sum, it) => sum + it.quantity * it.unit_price, 0)
      return { ...o, items, total }
    })
  }
}
