/*
Copyright © 2024 NAME HERE <EMAIL ADDRESS>
*/
package cmd

import (
	"demyst-code-kata/arg"
	"demyst-code-kata/output"
	"demyst-code-kata/todo"
	"fmt"
	"io"
	"os"

	"github.com/spf13/cobra"
)

// rootCmd represents the base command when called without any subcommands
var rootCmd = &cobra.Command{
	Use:   "demyst-code-kata",
	Short: `A command line tool for TODOs`,
	Long:  `A command line tool that consumes the first 'limit', 'even' numbered TODO's in most performant way and output the 'title' and whether it's 'completed' or not`,
	Run: func(cmd *cobra.Command, args []string) {
		input, _ := io.ReadAll(os.Stdin)
		todos, err := todo.Parse(string(input), Arg.Format)
		if err != nil {
			fmt.Fprintln(os.Stderr, err)
		}
		outputs, _ := output.String(todos, Arg)
		fmt.Printf("%v\n", outputs)
	},
}

// Execute adds all child commands to the root command and sets flags appropriately.
// This is called by main.main(). It only needs to happen once to the rootCmd.
func Execute() {
	err := rootCmd.Execute()
	if err != nil {
		os.Exit(1)
	}
}

var Arg = arg.Args{
	Even:   true,
	Limit:  20,
	Format: arg.CSV,
}

func init() {
	rootCmd.PersistentFlags().VarP(&Arg.Format, "format", "f", "The data format. Supported formats: 'csv', 'json'")
	rootCmd.PersistentFlags().IntVarP(&Arg.Limit, "limit", "l", 20, "The number of TODO's to limit to")
	rootCmd.PersistentFlags().BoolVarP(&Arg.Even, "even", "e", true, "Whether to filter only even numbered TODO's or not")
}
