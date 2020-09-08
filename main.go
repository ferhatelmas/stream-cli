package main

import (
	"fmt"
	"log"
	"os"

	"github.com/urfave/cli/v2"
)

func main() {
	app := &cli.App{
		Name: "Cli for getstream.io",
	  Commands: []*cli.Command{
		  feedCommands...,
		  chatCommands...,
	  },
	}

	err := app.Run(os.Args)
	if err != nil {
	  log.Fatal(err)
	}
}
