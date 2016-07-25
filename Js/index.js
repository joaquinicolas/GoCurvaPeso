/**
 * Created by joaquin on 24/07/16.
 */
var minValue;
var server = "http://localhost:8080/pesos?Id="
document.addEventListener("DOMContentLoaded", function(event) {
    queryString(getCurvaDatos)
});

function getCurvaDatos(queryString) {
    server += queryString.Id
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if(xhttp.readyState == 4 && xhttp.status == 200){
            var rows = xhttp.response
            google.charts.load('current',{'packages':['line']})
            google.charts.setOnLoadCallback(function () {
                rows = JSON.parse(rows.replace("<nil>",""))
                drawChart(rows)
            })
        }
    }
    xhttp.open("GET",server,true)
    xhttp.send()
}

function drawChart(mData) {
    var data = new google.visualization.DataTable();
    data.addColumn('date','Fecha')
    data.addColumn('number','Peso')
    data.addColumn('number','70kg')
    data.addColumn('number','80kg')
    data.addColumn('number','90kg')
    data.addColumn('number','100kg')
    data.addColumn('number','110kg')
    data.addColumn('number','120kg')

    minValue = mData[0].Weight;
    data_array = [];
    for (var i = mData.length - 1 ; i >= 0; i--){
        if (minValue > mData[i].Weight) minValue = mData[i].Weight;
        var parts = mData[i].Dates.substring(0,10).split('-')
        var dt =
            new Date(parts[1] + " /" + parts[2] + "/" + parts[0])
        data_array.push([dt,mData[i].Weight,(mData[i].Weight - .500),(mData[i].Weight - .600),(mData[i].Weight - .700),(mData[i].Weight - .800),(mData[i].Weight - .900),(mData[i].Weight - 1)])
    }
    data.addRows(data_array)
    var options = {
        chart: {
            title: 'Curva de peso Dr.Cormillot',
            subtitle: 'Referencia de perdida de peso'
        },
        width: 900,
        height: 500
    };


    var chart = new google.charts.Line(document.getElementById('linechart_material'))
    chart.draw(data,options);

  /*  var data = new google.visualization.DataTable();
    data.addColumn('date','Fecha')
    data.addColumn('number','Peso')
    data.addColumn('number','70kg')
    data.addColumn('number','80kg')
    data.addColumn('number','90kg')
    data.addColumn('number','100kg')
    data.addColumn('number','110kg')
    data.addColumn('number','120kg')

    data.addRows([[1,  37.8, 80.8, 41.8]])

    var options = {
        chart: {
            title: 'Box Office Earnings in First Two Weeks of Opening',
            subtitle: 'in millions of dollars (USD)'
        },
        width: 900,
        height: 500
    };

    var chart = new google.charts.Line(document.getElementById('linechart_material'));

    chart.draw(data, options);*/
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