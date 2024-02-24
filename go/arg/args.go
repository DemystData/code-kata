package arg

type Args struct {
	Even   bool
	Limit  int
	Format Format
}

var Arg = Args{
	Even:   true,
	Limit:  20,
	Format: CSV,
}
