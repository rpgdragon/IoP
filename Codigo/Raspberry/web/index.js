var axios= require('axios');
var mysql = require('mysql');

const formUrlEncoded = x =>
   Object.keys(x).reduce((p, c) => p + `&${c}=${encodeURIComponent(x[c])}`, '')

function crearConexion(){
    var connection = mysql.createConnection({
     host     : 'localhost',
     user     : 'root',
     password : '51q7d00DRAGARIES',
    database : 'IOPSHIRT'
 });
 return connection;  
}

function read() {
    //hay que leer los datos de la base de datos	

 var connection = crearConexion();
 connection.connect();

    connection.query("SELECT * FROM sensores WHERE horacreacion<= (now() - INTERVAL 90 SECOND) ORDER BY FIELD(tipo,'REG','CAIDA','BAT','ECG','EDA','TEMP'), fecha asc LIMIT 0,10", function (error, results, fields) {
     		connection.end();
		if (error){
			console.log('Se ha producido un error al  buscar los datos. ' + error);
    		}
		if(results!=null && results!=undefined){
    			console.log(results.length);
		//recorremos todos los datos
		results.forEach(function(element) {
			//se supone que si esta en la DB es que son correctas ya
			uploadData(element, connection);
			//una vez procesado el dato lo borramos
                        //dormimos un segundo para que de tiempo a propagarse los cambios
			dormir(1);
		});
	}
    });

    setTimeout(read, 10000); // 20 seconds gap between reads 
}

// inti read
read();

function uploadData(data) {
    //vamos a llamar
    var options = undefined;
    var connection = crearConexion();
    if(data.tipo!="CAIDA"){
	if(data.tipo=="REG"){
		options = {
        	method: 'post',
	        url: 'http://www.iopshirt.es/api/v3/informacion/',
		headers: {'Content-Type': 'application/x-www-form-urlencoded' },
		data: formUrlEncoded({
			ns: data.numeroserie,
			tipo: data.tipo,
			valor: data.valor,
				valor2: data.sensores,
				check: data.viejo
		})
    		};	
	}
	else{
		options = {
        	method: 'post',
	        url: 'http://www.iopshirt.es/api/v3/informacion/',
		headers: {'Content-Type': 'application/x-www-form-urlencoded' },
		data: formUrlEncoded({
			ns: data.numeroserie,
			tipo: data.tipo,
			valor: data.valor,
				valor2: data.fecha,
				check: data.viejo
		})
    		};
	}

    }
    else{
	//si llega aqui es una caida
	if(data.viejo==undefined || data.viejo==null || data.viejo==1 || data.viejo=="1"){
	    //se tiene que ignorar
	    connection.query('DELETE FROM sensores WHERE id=' +  data.id);
	    connection.end();
	    return;
	}
		body.set("ns",data.numeroserie);
		options = {
        	method: 'post',
	        url: 'http://www.iopshirt.es/api/v3/caida/',
		headers: {'Content-Type': 'application/x-www-form-urlencoded' },
		data: formUrlEncoded({
			ns: data.numeroserie,
		})
    		};
		

    }
    axios(options)
    .then(function (response) {
        //handle success
        console.log("Completado con exito");
	connection.query('DELETE FROM sensores WHERE id=' +  data.id);
	connection.end();
    })
    .catch(function (response) {
        //handle error
	console.log("Ha dado un error"); 
        console.log(response);
    });
}

function dormir(segundos)
{
    var date = new Date();
    var curDate = null;
    do { curDate = new Date(); }
    while(curDate-date < segundos*1000);
}
