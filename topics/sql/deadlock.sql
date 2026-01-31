-- Demonstration of a potential deadlock in SQL Server
-- This script creates two tables and runs two concurrent transactions
-- that acquire locks in opposite order, increasing chances of a deadlock.

/*
Instructions:
- Open two separate SSMS query windows (Session 1 and Session 2).
- Copy the relevant session block (Session 1 / Session 2) into each window.
- Run the setup section once to create objects.
- Then, in each session, run the BEGIN TRAN block. The opposite lock order
	makes a deadlock likely when both sessions reach the second UPDATE.

Tip: Use WAITFOR DELAY to align timing so both sessions hold their first lock
before attempting the second.
*/

/* Setup: run once */
IF OBJECT_ID('dbo.Accounts', 'U') IS NOT NULL DROP TABLE dbo.Accounts;
IF OBJECT_ID('dbo.Profiles', 'U') IS NOT NULL DROP TABLE dbo.Profiles;
GO

CREATE TABLE dbo.Accounts (
		AccountId int NOT NULL PRIMARY KEY,
		Balance   money NOT NULL
);

CREATE TABLE dbo.Profiles (
		ProfileId int NOT NULL PRIMARY KEY,
		DisplayName nvarchar(100) NOT NULL
);
GO

INSERT INTO dbo.Accounts (AccountId, Balance)
VALUES (1, 100.00), (2, 200.00);

INSERT INTO dbo.Profiles (ProfileId, DisplayName)
VALUES (1, N'Alice'), (2, N'Bob');
GO

/*
Session 1 (Window 1):
Locks Accounts(1) first, then Profiles(1)
*/
-- SESSION 1 START
BEGIN TRAN;

UPDATE dbo.Accounts
SET Balance = Balance + 10
WHERE AccountId = 1;  -- Acquire lock on Accounts(1)

-- Hold the first lock to increase contention window
WAITFOR DELAY '00:00:05';

-- Attempt to lock Profiles(1) second
UPDATE dbo.Profiles
SET DisplayName = N'Alice Updated by S1'
WHERE ProfileId = 1;  -- Competes with Session 2

COMMIT;
-- SESSION 1 END

/*
Session 2 (Window 2):
Locks Profiles(1) first, then Accounts(1)
*/
-- SESSION 2 START
BEGIN TRAN;

UPDATE dbo.Profiles
SET DisplayName = N'Alice Updated by S2'
WHERE ProfileId = 1;  -- Acquire lock on Profiles(1)

-- Hold the first lock to increase contention window
WAITFOR DELAY '00:00:05';

-- Attempt to lock Accounts(1) second
UPDATE dbo.Accounts
SET Balance = Balance + 20
WHERE AccountId = 1;  -- Competes with Session 1

COMMIT;
-- SESSION 2 END

