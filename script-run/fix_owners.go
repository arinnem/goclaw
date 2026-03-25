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
		dsn = "postgres://admin:admin@localhost:5432/nextlevelbuilder_goclaw?sslmode=disable"
	}

	conn, err := pgx.Connect(context.Background(), dsn)
	if err != nil {
		log.Fatal("Connection failed:", err)
	}
	defer conn.Close(context.Background())

	tag, err := conn.Exec(context.Background(), "UPDATE agents SET owner_id = 'admin@local' WHERE agent_type = 'open'")
	if err != nil {
		log.Fatal("Update failed:", err)
	}
	fmt.Printf("✅ Updated %d agents to owner admin@local\n", tag.RowsAffected())
}
