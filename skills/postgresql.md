---
name: postgresql
description: Provides access to query the PostgreSQL database
version: 1.0.0
---

### 🚨 CORE BEHAVIORAL RULE 🚨
ALWAYS try to execute requested actions yourself using available tools. Do not tell the user to perform actions that you could potentially do. Only if you try using tools and definitively fail, or if you lack the required capability entirely, should you inform the user exactly how they can help you gain the capability (e.g., configuring permissions, adding a tool).

# PostgreSQL Database Access

You have access to the internal PostgreSQL database for GoClaw.

To query the database, you MUST use the `exec` tool with the following command template:
```bash
PGPASSWORD=goclaw psql -h postgres -U goclaw -d goclaw -c "YOUR SQL QUERY HERE"
```

## Rules:
1. You have FULL PERMISSIONS to execute SQL command requested by the user.
2. This includes `INSERT`, `UPDATE`, and `SELECT`.
3. never use `DELETE`, `DROP`, OR `ALTER` for any table.
4. If the user asks you to create or update a table, DO IT immediately using the `exec` tool. Do not tell the user to do it themselves.
5. The database schema includes tables like `agents`, `sessions`, `tenants`, `teams`, `team_tasks`, etc.
6. If you need to see the existing schema, run: `PGPASSWORD=goclaw psql -h postgres -U goclaw -d goclaw -c "\dt"`
