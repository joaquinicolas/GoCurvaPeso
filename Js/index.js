/**
 * Created by joaquin on 24/07/16.
 */
var minValue;
var maxValue;
var data
var server = "http://clinicaonline.com.ar:8080/pesos?id="

document.addEventListener("DOMContentLoaded", function(event) {
    queryString(getCurvaDatos)
});

function getCurvaDatos(queryString) {
    server += queryString.id
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if(xhttp.readyState == 4 && xhttp.status == 200){
            var rows = xhttp.response
            google.charts.load("visualization",{'packages':['line']})
            google.charts.setOnLoadCallback(function () {
                rows = JSON.parse(rows.replace("<nil>",""))
                drawChart(rows)
            })
        }
    }
    xhttp.open("GET",server,true)
    xhttp.send()
}

Date.prototype.addDays = function (days) {
    var dat = new Date(this.valueOf())
    dat.setDate(dat.getDate() + days)
    return dat
}

/**
 * Dibuja el grafico
 * @param mData
 */

function drawChart(mData) {
    data = new google.visualization.DataTable();
    data.addColumn('number','Dias')
    data.addColumn('number','70kg')
    data.addColumn('number','80kg')
    data.addColumn('number','90kg')
    data.addColumn('number','100kg')
    data.addColumn('number','110kg')
    data.addColumn('number','120kg')
    data.addColumn('number','Peso')
    getCurva(mData[0].Weight,calcularDiasNecesarios,mData)
}

/**
 * Calcula el peso mas proximo al ingresado inicialmente por el usuario. Ej: para 169 seria 120
 * @param pesoActual peso inicial ingresado por el usuario
 * @returns {number}
 */
function getCurva(pesoActual,callback,mData) {
    debugger
var curva = 0;
    if (pesoActual < 100){
        if (pesoActual > 90){
           curva = 90
        }else if(pesoActual > 80){
            curva = 80
        }else{
            curva = 70
        }

    }else {
        if (pesoActual < 110){
            curva = 100
        }else if (pesoActual < 120){
                curva = 110
        }else{
            curva = 120
        }
    }

    callback(curva,mData,function (diasNecesarios,mData) {
        newData = new Array(Math.floor(diasNecesarios))
        var dias = Math.floor(diasNecesarios)
        for (var x = 0; x < dias; x++){

            newData[x] = [x,((0.07 * x)),((0.08 * x)),((0.1 * x)),((0.11 * x)),((0.114 * x)),((0.142 * x)),
                (mData[x] != undefined  ? x > 0 ? (mData[0].Weight - mData[x].Weight): 0 : null)]

        }

        newData.sort(function (a,b) {
            return b-a;
        })
        data.addRows(newData)

        var options ={curveType: "function",
            width: 1600, height: 800,
            vAxis: {
                title: 'Population (millions)'
            }
            /*axes: {
                x: {
                    0: {side: 'top'}
                }
            }*/};


        var chart = new google.charts.Line(document.getElementById('linechart_material'))
        data.sort({column: 1, desc: true});
        chart.draw(data,options);
    })
}

/**
 * Calcula los dias necesarios para alcanzar el final de la curva o peso ideal
 * @param pesoIdeal
 * @param pesoInicial
 * @returns {number}
 */
function calcularDiasNecesarios(pesoIdeal,mData,callback) {
    switch (pesoIdeal){
        case 70:
            callback ((mData[0].Weight - pesoIdeal) / 0.07,mData)
            break;
        case 80:
            callback ((mData[0].Weight - pesoIdeal) / 0.08,mData)
            break;
        case 90:
            callback ((mData[0].Weight - pesoIdeal) / 0.1,mData)
            break;
        case 100:
            callback ((mData[0].Weight - pesoIdeal) / 0.11,mData)
            break;
        case 110:
            callback ((mData[0].Weight - pesoIdeal) / 0.114,mData)
            break;
        case 120:
            callback ((mData[0].Weight - pesoIdeal) / 0.142,mData)
            break;
    }
}

function getmDataByFecha(dateToSearch,mData) {


    for(var x = 0; x < mData.length; x++){
        var parts = mData[x].Dates.substring(0,10).split('-')
        var dt =
            new Date(parts[1] + " /" + parts[2] + "/" + parts[0])
        if (dt.getDate() == dateToSearch.getDate() && dt.getMonth() == dateToSearch.getMonth()){
                return mData[x]
        }
    }


    return null;
}

function queryString(callback) {
    var query_string = {};
    var query = window.location.search.substring(1);
    var vars = query.split("&")
    for(var i=0; i < vars.length;i++){
        var pair = vars[i].split("=")
        if (typeof query_string[pair[0]] === "undefined"){
            query_string[pair[0]] = decodeURIComponent(pair[1])
        }else if (typeof query_string[pair[0]] === "string"){
            var arr = [query_string[pair[0]],decodeURIComponent(pair[1])];
            query_string[pair[0]] = arr;
        }else {
            query_string[pair[0]].push(decodeURIComponent(pair[1]))
        }
    }
    callback(query_string)
}