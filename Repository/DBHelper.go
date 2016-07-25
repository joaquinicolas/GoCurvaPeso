package Repository

import (
	"database/sql"
	"fmt"
	"log"
	_"github.com/denisenkom/go-mssqldb"

)

var (
	conn *sql.DB
	err error

)

func openCon()  {
	//msSqlCon := mssql.MssqlConn{}
	//fmt.Println(msSqlCon)
	//conn,err := sql.Open("mssql","server=localhost;user id=clinica;password=Ffs6n664jkldsfc84f;port=1433;database=ClinicaOnline")
	conn,err = sql.Open("mssql","server=192.168.99.2;user id=joaquin;password=123456789;port=1433;database=ClinicaOnline")
	if err != nil {
		panic(err)
		defer conn.Close()
	}

}

func Select(selectArgs,selectClause,tableName string) (*sql.Rows,error) {
	openCon()
	stmt,err := conn.Prepare(
		fmt.Sprintf("select %s from %s %s",selectArgs,tableName,selectClause))
	if err != nil {
		log.Fatal("Prepare failed:",err.Error())
	}
	defer stmt.Close()
	return stmt.Query()
}