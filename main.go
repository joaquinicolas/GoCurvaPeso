package main

import(
"fmt"
"./hello"
"github.com/denisenkom/go-mssqldb"
) 

func main() {
	fmt.Println(hello.BuildHello())
}
