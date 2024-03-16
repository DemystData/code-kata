package arg

type Args struct {
	Even     bool
	Limit    int
	Format   Format
	Endpoint string
}

var Arg = Args{
	Even:     true,
	Limit:    20,
	Format:   CSV,
	Endpoint: "https://jsonplaceholder.typicode.com/todos",
}
