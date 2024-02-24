package arg

import "errors"

type Format string

const (
	CSV  Format = "csv"
	JSON Format = "json"
)

func (format *Format) String() string {
	return string(*format)
}

func (format *Format) Set(f string) error {
	switch f {
	case "csv", "json":
		*format = Format(f)
		return nil
	default:
		return errors.New(`must be one of 'csv' or 'json'`)
	}
}

func (format *Format) Type() string {
	return "Format"
}
