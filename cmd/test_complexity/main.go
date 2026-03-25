package main

import (
	"context"
	"encoding/json"
	"fmt"
	"os"

	"github.com/nextlevelbuilder/goclaw/internal/agent"
	"github.com/nextlevelbuilder/goclaw/internal/providers"
)

func main() {
	// Parse config.json to get the API key
	configBytes, err := os.ReadFile("data/config.json")
	if err != nil {
		fmt.Printf("Error reading config: %v\n", err)
		return
	}
	
	// Temporary struct to extract just the Anthropic API key
	var cfg struct {
		Providers struct {
			Anthropic struct {
				APIKey string `json:"api_key"`
			} `json:"anthropic"`
		} `json:"providers"`
	}
	
	if err := json.Unmarshal(configBytes, &cfg); err != nil {
		fmt.Printf("Error parsing config: %v\n", err)
		return
	}
	
	apiKey := cfg.Providers.Anthropic.APIKey
	if apiKey == "" {
		fmt.Println("Error: ANTHROPIC API key is empty in config.json")
		return
	}

	provider := providers.NewAnthropicProvider(apiKey)
	model := "claude-3-5-haiku-20241022" // Use cheap model for testing
	ctx := context.Background()

	tests := []string{
		"What is the current time?",
		"Research the current weather in Tokyo, write it to a file called tokyo.txt, then read the file.",
		"kiểm tra mail và tổng hợp thông tin theo các loại",
		"Kiểm tra mail mới nhất cho anh",
	}

	for _, t := range tests {
		isComplex := agent.AssessTaskComplexity(ctx, provider, model, t)
		fmt.Printf("Message: %q\nIs Complex: %v\n\n", t, isComplex)
	}
}
