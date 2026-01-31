## Requirements for Inventory Database
- referential integrity is enforced
- all tables have an 'id' column as the primary key (auto-incrementing)
- all tables have a 'created_at' column to hold the timestamp of when the record was created
- all tables have a 'updated_at' column to hold the timestamp of when the record was last updated
- all stored procs are prefixed with 'sp_'
- all functions are prefixed with 'fn_'