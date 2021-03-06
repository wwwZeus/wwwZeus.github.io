function init (gg,wp,point,pointB,pointNum) {
    var map = new ymaps.Map('map', {
            center: [57.626273, 39.894102],
            zoom: gg*wp
	    //controls: ['zoomControl']
        });
	//map.setZoom(5);
	//alert ('Яндекс');
 ymaps.geocode(point, {
       results: 1
    }).then(function (res) {
            // Выбираем первый результат геокодирования.
            var firstGeoObject = res.geoObjects.get(0),
                // Координаты геообъекта.
                coords = firstGeoObject.geometry.getCoordinates(),
                // Область видимости геообъекта.
                bounds = firstGeoObject.properties.get('boundedBy');

            firstGeoObject.options.set('preset', 'islands#darkBlueDotIconWithCaption');
            // Получаем строку с адресом и выводим в иконке геообъекта.
            firstGeoObject.properties.set('iconCaption', firstGeoObject.getAddressLine());

            // Добавляем первый найденный геообъект на карту.
            //map.geoObjects.add(firstGeoObject);
            // Масштабируем карту на область видимости геообъекта.
            map.setBounds(bounds, {
                // Проверяем наличие тайлов на данном масштабе.
                checkZoomRange: true
            });

            /**
             * Все данные в виде javascript-объекта.
             */
          /*console.log('Все данные геообъекта: ', firstGeoObject.properties.getAll());
            /**
             * Метаданные запроса и ответа геокодера.
             * @see https://api.yandex.ru/maps/doc/geocoder/desc/reference/GeocoderResponseMetaData.xml
             */
           //console.log('Метаданные ответа геокодера: ', res.metaData);
            /**
             * Метаданные геокодера, возвращаемые для найденного объекта.
             * @see https://api.yandex.ru/maps/doc/geocoder/desc/reference/GeocoderMetaData.xml
             */
           //console.log('Метаданные геокодера: ', firstGeoObject.properties.get('metaDataProperty.GeocoderMetaData'));
            /**
             * Точность ответа (precision) возвращается только для домов.
             * @see https://api.yandex.ru/maps/doc/geocoder/desc/reference/precision.xml
             */
          //console.log('precision', firstGeoObject.properties.get('metaDataProperty.GeocoderMetaData.precision'));
            /**
             * Тип найденного объекта (kind).
             * @see https://api.yandex.ru/maps/doc/geocoder/desc/reference/kind.xml
             */
	 /*  
            console.log('Тип геообъекта: %s', firstGeoObject.properties.get('metaDataProperty.GeocoderMetaData.kind'));
            console.log('Название объекта: %s', firstGeoObject.properties.get('name'));
            console.log('Описание объекта: %s', firstGeoObject.properties.get('description'));
            console.log('Полное описание объекта: %s', firstGeoObject.properties.get('text'));
	  */
            /**
            * Прямые методы для работы с результатами геокодирования.
            * @see https://tech.yandex.ru/maps/doc/jsapi/2.1/ref/reference/GeocodeResult-docpage/#getAddressLine
            */
	  /*  
            console.log('\nГосударство: %s', firstGeoObject.getCountry());
            console.log('Населенный пункт: %s', firstGeoObject.getLocalities().join(', '));
            console.log('Адрес объекта: %s', firstGeoObject.getAddressLine());
	    console.log('Координаты: %s', firstGeoObject.geometry.getCoordinates()); 
	 
            console.log('Наименование здания: %s', firstGeoObject.getPremise() || '-');
            console.log('Номер здания: %s', firstGeoObject.getPremiseNumber() || '-');
	 */
	    var Zdanie = firstGeoObject.getPremise() || '-';
	    var NZdanie = firstGeoObject.getPremiseNumber() || '-';
	 
            //alert ("Государство: " + firstGeoObject.getCountry()+", Населенный пункт: "+firstGeoObject.getLocalities().join(', ')+", Адрес объекта: "+firstGeoObject.getAddressLine()+", Наименование здания: "+Zdanie+ ", Номер здания: " + NZdanie);
        var Adress = "<b>Координаты:</b> " + firstGeoObject.geometry.getCoordinates() + ";<br /> <b>Государство:</b> " + firstGeoObject.getCountry()+";<br /> <b>Населенный пункт: </b>"+firstGeoObject.getLocalities().join(', ')+";<br /> <b>Адрес объекта:</b> "+firstGeoObject.getAddressLine()+"; Наименование здания: "+Zdanie+ "; Номер здания: " + NZdanie;
	var Adress2 = "Координаты: " + firstGeoObject.geometry.getCoordinates() + "; Государство:" + firstGeoObject.getCountry()+"; Населенный пункт: "+firstGeoObject.getLocalities().join(', ')+"; Адрес объекта: "+firstGeoObject.getAddressLine()+"; Наименование здания: "+Zdanie+ "; Номер здания: " + NZdanie;
	var ret = Adress;
	var ret2 = Adress2;
	
 //----------------------------------------------------
	 
//---Создание маршрута--------------------------
/*	var DistKO = new ymaps.Placemark([57.768087, 40.926583], {
            iconCaption: '456 км'
        }, {
            preset: 'islands#grayCircleDotIcon',
            iconCaptionMaxWidth: '70'
        });
	 
	var multiRouteKO = new ymaps.multiRouter.MultiRoute({   
   	 // Точки маршрута. Точки могут быть заданы как координатами, так и адресом. 
    	  referencePoints: [
          pointB, //[57.635685, 39.882938] Сбербанк
          firstGeoObject.geometry.getCoordinates()  //Искомый объект
    	]},{
	  boundsAutoApply: true
});
	 
	multiRouteKO.model.events.add("requestsuccess", function (event) {
	A=multiRouteKO.getRoutes().get(0).properties.get("distance").value;
	//console.log("Время прохождения: " + activeRoute.properties.get("duration").text); //Время в пути
	//alert ((A*0.001).toFixed());
	map.geoObjects.add(DistKO);	
	var theEl=document.getElementById("output");
	//theEl.innerHTML = theEl.innerHTML+'<tr><td bgcolor="#f0f0f0">34,5</td><td bgcolor="#f0f0f0">3,5</td><td>36</td><td>23</td></tr>'
	theEl.innerHTML = theEl.innerHTML+'<table border="1"><tr><td class="lc">'+point+';</td><td class="even2">'+pointB+';</td><td class="even">'+ret+';</td><td class="way">'+(A*0.001).toFixed() + ' км.' +'</td></tr>'; //+'; Расстояние: '+(A*0.001).toFixed() + 'км.';	
		
	});	 
	 map.geoObjects.add(multiRouteKO);	 
 });*/

    // Создание маршрута.
    var multiRouteKO = new ymaps.multiRouter.MultiRoute({
        referencePoints: [
	  pointB, //[57.635685, 39.882938] Сбербанк
          firstGeoObject.geometry.getCoordinates()  //Искомый объект
        ]},{
        boundsAutoApply: true
    });
	
    // Добавление маршрута на карту.
    //console.log('v1.20');
    //console.log(multiRouteKO.referencePoints);
    //map.geoObjects.add(multiRouteKO);
//console.log(multiRouteKO.getRoutes());
	
	
    // Подписка на событие обновления данных маршрута.
    multiRouteKO.model.events.add('requestsuccess', function() {
        // Получение ссылки на активный маршрут.
        // В примере используется автомобильный маршрут,
        // поэтому метод getActiveRoute() вернет объект multiRouter.driving.Route.
	//var theEl=document.getElementById("output");
	var theEl2=document.getElementById("output2");
        var activeRoute = multiRouteKO.getActiveRoute();
        //alert (activeRoute);
        if (activeRoute == null){
            
            console.log("Нетю, Пусто");
	    ymaps.geocode(pointB).then(function (res) {
   		 var moscowCoords = res.geoObjects.get(0).geometry.getCoordinates();
   		 // Coordinates of New York.
   		 ymaps.geocode( firstGeoObject.geometry.getCoordinates()).then(function (res) {
    	   		var newYorkCoords = res.geoObjects.get(0).geometry.getCoordinates();
        		// Distance.
			var WayCoord = ymaps.formatter.distance(
          	           ymaps.coordSystem.geo.getDistance(moscowCoords, newYorkCoords)) +'|| от ['+ moscowCoords[0]+','+moscowCoords[1]+'] до '+'['+ newYorkCoords[0]+','+newYorkCoords[1]+']';
		 	//console.log(WayCoord);
			//theEl.innerHTML = theEl.innerHTML+'<table border="1"><tr><td class="lc">'+point+';</td><td class="even2">'+pointB+';</td><td class="even">'+ret+';</td><td class="way">'+ WayCoord +'</td><td class="way">'+pointNum+'</td></tr>'; //+'; Расстояние: '+(A*0.001).toFixed() + 'км.';
			theEl2.innerHTML = theEl2.innerHTML+' '+point+';||'+pointB+';||'+ret2+';||'+ WayCoord +'||'+pointNum+'<br />'; //+'; Расстояние: '+(A*0.001).toFixed() + 'км.';
			map.geoObjects.add(multiRouteKO);
   	     });
	});		
		
	    //ymaps.coordSystem.geo.getDistance(moscowCoords, newYorkCoords)
        } else {
	//console.log("Нашли:");
	//console.log("Длина: " + activeRoute.properties.get("distance").text);
        //console.log("Время прохождения: " + activeRoute.properties.get("duration").text);
        map.geoObjects.add(multiRouteKO);
	//theEl.innerHTML = theEl.innerHTML+'<table border="1"><tr><td class="lc">'+point+';</td><td class="even2">'+pointB+';</td><td class="even">'+ret+';</td><td class="way">'+activeRoute.properties.get("distance").text + '.<br /> Время в пути '+ activeRoute.properties.get("duration").text +'</td><td class="way">'+pointNum+'</td></tr>'; //+'; Расстояние: '+(A*0.001).toFixed() + 'км.';
	theEl2.innerHTML = theEl2.innerHTML+' '+point+';||'+pointB+';||'+ret2+'||'+activeRoute.properties.get("distance").text + '||'+ activeRoute.properties.get("duration").text +'||'+pointNum+'<br />'; //+'; Расстояние: '+(A*0.001).toFixed() + 'км.';
	if (activeRoute.properties.get("blocked")) {
         	   console.log("На маршруте имеются участки с перекрытыми дорогами.");
         }
	}
        // Вывод информации о маршруте.
        //console.log("Длина: " + activeRoute.properties.get("distance").text);
        //console.log("Время прохождения: " + activeRoute.properties.get("duration").text);
        // Для автомобильных маршрутов можно вывести 
        // информацию о перекрытых участках.

    }); 
	 
});	 
//-----Конец создания маршурта	 
}        

function handleFiles(files) {
	//alert ('Еще какой-то файл');
	// Check for the various File API support.
	if (window.FileReader) {
		// FileReader are supported.
		getAsText(files[0]);
	} else {
		alert('FileReader are not supported in this browser.');
	}
}

function getAsText(fileToRead) {
	//alert ('Чтение файла');
	var reader = new FileReader();
	// Read file into memory as UTF-8      
	reader.readAsText(fileToRead);
	// Handle errors load
	reader.onload = loadHandler;
	reader.onerror = errorHandler;
}

function loadHandler(event) {
	//alert ('CSV2');
	var csv = event.target.result;
	processData(csv);             
}

function processData(csv) {
    //alert ('CSV');
    var allTextLines = csv.split(/\r\n|\n/);
    var lines = [];
    for (var i=0; i<allTextLines.length; i++) {
        var data = allTextLines[i].split('||');
            var tarr = [];
            for (var j=0; j<data.length; j++) {
                tarr.push(data[j]);
            }
            lines.push(tarr);
    }
	console.log(lines);
	drawOutput(lines);
}

function errorHandler(evt) {
	//alert ('Ошибки');
	if(evt.target.error.name == "NotReadableError") {
		alert("Canno't read file !");
	}
}

function drawOutput(lines){
	//Clear previous data
	//alert ('Вызов процедур');
	alert ('asf v1.75');
	document.getElementById("output").innerHTML = "";
	var table = document.createElement("table");
	for (var i = 0; i < lines.length; i++) {
		var row = table.insertRow(-1);
		//for (var j = 0; j < lines[i].length; j++) {
			//var firstNameCell = row.insertCell(-1);
			//firstNameCell.appendChild(document.createTextNode(lines[i][j]));
			ymaps.ready(init(4,1,lines[i][1],lines[i][0],lines[i][2]));
			//alert (lines[i][0]);
			//alert (lines[i][1]);
		//}
	}
	//document.getElementById("output").appendChild(table);
	
	//var theEl=document.getElementById("output");
	var theEl2=document.getElementById("output2");
	theEl.innerHTML = theEl.innerHTML+'<table border="0">'
		
	//alert ('DRAW');
	//var ret='';
	//ymaps.ready(init(6,1,'г.Ярославль Батова 26'));
	/*ymaps.ready(init(6,1,'г.Ярославль Тутаевское 71'));
	ymaps.ready(init(6,1,'г.Ярославль Серго Орджонекидже 22к2'));
	ymaps.ready(init(6,1,'г.Ярославль Амлазная, дом 5'));
	ymaps.ready(init(6,1,'г.Ярославль Блюхера, дом 17'));
	ymaps.ready(init(5,1,'г.Рязань у. Щорса, 30/34'));
	ymaps.ready(init(6,1,'г.Ярославль Калевала 2'));
	ymaps.ready(init(6,1,'г.Ярославль Чехова 17к.2'));
	ymaps.ready(init(6,1,'г.Ярославль Школьный п-д 107'));
	ymaps.ready(init(6,1,'г.Ярославль Школьный п-д 5'));
	ymaps.ready(init(6,1,'г.Ярославль Советска 34а'));*/
	//alert ('Полный конец скипта');
} 
