/*
# Inventory Database Creation Instructions

## Purpose
The T-SQL`Inventory` database is designed to manage suppliers, categories, and products while enforcing referential integrity. It includes features such as auto-incrementing primary keys, timestamps for record creation and updates, and relationships between tables.

Tip: Include in the context `specs.md` (in the same directory) to help Copilot better understand the requirements.

## Steps to Create the Database
1. **Database Setup**:
   - Check if the `Inventory` database exists. If it does, drop it and create a new one.
   - Set the default database to `Inventory`.

2. **Table Creation**:
   - Create a `suppliers` table with columns for supplier details.
   - Create a `categories` table with a one-to-many relationship to `suppliers`.
   - Create a `products` table with a one-to-many relationship to `categories`.

3. **Data Population**:
   - Populate the `suppliers`, `categories`, and `products` tables with sample data.

4. **Additional Features**:
   - Create a view named `product_list` to display product, category, and supplier details.
   - Implement a stored procedure to retrieve the `product_list` view.
   - Add a trigger to update the `products` table when a `categories` record is deleted.
   - Define functions to calculate the total number of products in a category and those supplied by a supplier.
*/

