package Repository

import (
	"database/sql"
	"fmt"
	"log"
	"github.com/denisenkom/go-mssqldb"

)

var (
	conn *sql.DB
	err error

)

func openCon()  {
	msSqlCon := mssql.MssqlConn{}
	fmt.Println(msSqlCon)
	//fmt.Println(msSqlCon)
	conn,err = sql.Open("mssql","server=localhost;user id=clinica;password=Ffs6sn664jkldsfc84f;port=1433;database=clinicaonline")
	//conn,err = sql.Open("mssql","server=192.168.99.2;user id=joaquin;password=123456789;port=1433;database=ClinicaOnline")
	if err != nil {
		fmt.Println("Error de conexion!!")
		fmt.Println(err)
		conn.Close()
	}

}

func Select(selectArgs,selectClause,tableName string) (*sql.Rows,error) {
	openCon()
	if conn == nil {
		fmt.Println("No se pudo conectar")
		return nil,err
	}
	stmt,err := conn.Prepare(
		fmt.Sprintf("select %s from %s %s",selectArgs,tableName,selectClause))
	if err != nil {
		log.Fatal("Prepare failed:",err.Error())
	}
	defer stmt.Close()
	return stmt.Query()
}
