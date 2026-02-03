## UML Diagram Request
```markdown
step 1: Produce a UML diagram for an invoicing system with classes for Invoice, Client, and InvoiceItem. 
- Include attributes and methods for each class. 
- Output in Markdown format.
step 2: In the same folder generate an SVG file representing the UML diagram.
```

---

## UML Diagram (Mermaid)

```mermaid
classDiagram
direction TB

class Client {
	+ id: string
	+ name: string
	+ email: string
	+ phone: string
	+ billingAddress: string
	+ getBalance(): Decimal
	+ addInvoice(invoice: Invoice): void
	+ updateContactInfo(email: string, phone: string, address: string): void
}

class Invoice {
	+ id: string
	+ number: string
	+ clientId: string
	+ issueDate: Date
	+ dueDate: Date
	+ status: InvoiceStatus
	+ currency: string
	+ items: List<InvoiceItem>
	+ subtotal: Decimal
	+ taxRate: Decimal
	+ total: Decimal
	+ addItem(item: InvoiceItem): void
	+ removeItem(itemId: string): void
	+ calculateSubtotal(): Decimal
	+ calculateTax(): Decimal
	+ calculateTotal(): Decimal
	+ markPaid(paymentDate: Date): void
	+ markVoid(): void
}

class InvoiceItem {
	+ id: string
	+ description: string
	+ quantity: int
	+ unitPrice: Decimal
	+ discountPct: Decimal
	+ lineTotal: Decimal
	+ calculateLineTotal(): Decimal
	+ applyDiscount(pct: Decimal): void
	+ setQuantity(qty: int): void
}

class InvoiceStatus {
	<<enumeration>>
	PENDING
	SENT
	PAID
	VOID
	OVERDUE
}

Client "1" o-- "0..*" Invoice : owns
Invoice "1" o-- "1..*" InvoiceItem : contains
Invoice --> InvoiceStatus : uses
```
