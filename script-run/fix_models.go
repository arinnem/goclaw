package main

import (
	"context"
	"fmt"
	"log"
	"os"

	"github.com/jackc/pgx/v5"
	"github.com/joho/godotenv"
)

func main() {
	if err := godotenv.Load("e:\\OneDrive\\OneDrive - sungroup.com.vn\\Works\\Coding\\goclaw\\.env"); err != nil {
		log.Println("No .env file found", err)
	}

	dsn := os.Getenv("GOCLAW_POSTGRES_DSN")
	if dsn == "" {
		dsn = "postgres://goclaw:goclaw@localhost:5432/goclaw?sslmode=disable"
	}

	conn, err := pgx.Connect(context.Background(), dsn)
	if err != nil {
		log.Fatal("Connection failed:", err)
	}
	defer conn.Close(context.Background())

	updateQuery := `
		UPDATE agents 
		SET provider = 'openai-codex' 
		WHERE agent_type = 'open' AND owner_id = 'admin@local'`

	tag, err := conn.Exec(context.Background(), updateQuery)
	if err != nil {
		log.Fatal("Update failed:", err)
	}
	fmt.Printf("✅ Fixed %d agents to use provider 'openai-codex' (ChatGPT OAuth)\n", tag.RowsAffected())
}
