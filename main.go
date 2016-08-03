package main

import(

	"net/http"
	"strconv"
	"github.com/joaquinicolas/GoCurvaPeso/Repository"
	"encoding/json"
)

func main() {
	//http.HandleFunc("/",handler)
	http.HandleFunc("/pesos",pesosHandler)
	http.ListenAndServe(":8080",nil)
}

func pesosHandler(w http.ResponseWriter,r *http.Request)  {
	w.Header().Add("Access-Control-Allow-Origin","*")
	w.Header().Set("Content-Type","application/json")
	url_id := r.URL.Query().Get("id")
	if  url_id!= ""{
		id,err := strconv.Atoi(url_id)
		if err != nil {
			panic(err)
		}
		result := Repository.GetCurvaPeso(id)
		w.WriteHeader(http.StatusOK)
		jData,err := json.Marshal(result)
		w.Write(jData)
	}

}
