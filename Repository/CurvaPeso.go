package Repository

import (
	"time"
	"fmt"

)

const table  = "CurvaPeso"

type CurvaPeso struct {
	Id int
	Weight float64
	Dates time.Time
}

func GetCurvaPeso(id int) []*CurvaPeso {
	selectClause := fmt.Sprintf("where IdPaciente = %d order by Fecha",id)
	rows,err := Select("Id,Peso,Fecha",selectClause,table)
	curvasPeso := []*CurvaPeso{}

	if err != nil {
		panic(err)
	}

	for rows.Next() {
		var mCurvaPeso CurvaPeso
		err = rows.Scan(&mCurvaPeso.Id,&mCurvaPeso.Weight,&mCurvaPeso.Dates)
		if err != nil {
			panic(err)
		}
		curvasPeso = append(curvasPeso,&mCurvaPeso)
	}

	return curvasPeso
}