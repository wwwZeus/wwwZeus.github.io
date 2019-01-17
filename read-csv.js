function init (gg,wp,point) {
    var map = new ymaps.Map('map', {
            center: [57.626273, 39.894102],
            zoom: gg*wp
			//controls: ['zoomControl']
        });
	//map.setZoom(5);
alert ('asf v2');

 ymaps.geocode(point, {
        /**
         * Опции запроса
         * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/geocode.xml
         */
        // Сортировка результатов от центра окна карты.
        // boundedBy: map.getBounds(),
        // strictBounds: true,
        // Вместе с опцией boundedBy будет искать строго внутри области, указанной в boundedBy.
        // Если нужен только один результат, экономим трафик пользователей.
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
            map.geoObjects.add(firstGeoObject);
            // Масштабируем карту на область видимости геообъекта.
            map.setBounds(bounds, {
                // Проверяем наличие тайлов на данном масштабе.
                checkZoomRange: true
            });

            /**
             * Все данные в виде javascript-объекта.
             */
            console.log('Все данные геообъекта: ', firstGeoObject.properties.getAll());
            /**
             * Метаданные запроса и ответа геокодера.
             * @see https://api.yandex.ru/maps/doc/geocoder/desc/reference/GeocoderResponseMetaData.xml
             */
            console.log('Метаданные ответа геокодера: ', res.metaData);
            /**
             * Метаданные геокодера, возвращаемые для найденного объекта.
             * @see https://api.yandex.ru/maps/doc/geocoder/desc/reference/GeocoderMetaData.xml
             */
            console.log('Метаданные геокодера: ', firstGeoObject.properties.get('metaDataProperty.GeocoderMetaData'));
            /**
             * Точность ответа (precision) возвращается только для домов.
             * @see https://api.yandex.ru/maps/doc/geocoder/desc/reference/precision.xml
             */
            console.log('precision', firstGeoObject.properties.get('metaDataProperty.GeocoderMetaData.precision'));
            /**
             * Тип найденного объекта (kind).
             * @see https://api.yandex.ru/maps/doc/geocoder/desc/reference/kind.xml
             */
            console.log('Тип геообъекта: %s', firstGeoObject.properties.get('metaDataProperty.GeocoderMetaData.kind'));
            console.log('Название объекта: %s', firstGeoObject.properties.get('name'));
            console.log('Описание объекта: %s', firstGeoObject.properties.get('description'));
            console.log('Полное описание объекта: %s', firstGeoObject.properties.get('text'));
            /**
            * Прямые методы для работы с результатами геокодирования.
            * @see https://tech.yandex.ru/maps/doc/jsapi/2.1/ref/reference/GeocodeResult-docpage/#getAddressLine
            */
            console.log('\nГосударство: %s', firstGeoObject.getCountry());
            console.log('Населенный пункт: %s', firstGeoObject.getLocalities().join(', '));
            console.log('Адрес объекта: %s', firstGeoObject.getAddressLine());
	    
            console.log('Наименование здания: %s', firstGeoObject.getPremise() || '-');
            console.log('Номер здания: %s', firstGeoObject.getPremiseNumber() || '-');
	    var Zdanie = firstGeoObject.getPremise() || '-';
	    var NZdanie = firstGeoObject.getPremiseNumber() || '-';
	 
            //alert ("Государство: " + firstGeoObject.getCountry()+", Населенный пункт: "+firstGeoObject.getLocalities().join(', ')+", Адрес объекта: "+firstGeoObject.getAddressLine()+", Наименование здания: "+Zdanie+ ", Номер здания: " + NZdanie);
var Adress = "Государство: " + firstGeoObject.getCountry()+", Населенный пункт: "+firstGeoObject.getLocalities().join(', ')+", Адрес объекта: "+firstGeoObject.getAddressLine()+", Наименование здания: "+Zdanie+ ", Номер здания: " + NZdanie;
	 var ret = Adress;
	alert ('Функция внутри: ' + ret);
	 
	 	var theEl=document.getElementById("output");
	 	alert (document.write(theEl.innerHTML));
	theEl.innerHTML = theEl.innerHTML+'<b>!!!</b>'+ret;	
            /**
             * Если нужно добавить по найденным геокодером координатам метку со своими стилями и контентом балуна, создаем новую метку по координатам найденной и добавляем ее на карту вместо найденной.
             */
            /**
             var myPlacemark = new ymaps.Placemark(coords, {
             iconContent: 'моя метка',
             balloonContent: 'Содержимое балуна <strong>моей метки</strong>'
             }, {
             preset: 'islands#violetStretchyIcon'
             });
             map.geoObjects.add(myPlacemark);
            */ 
        });


	
/* var multiRouteKO = new ymaps.multiRouter.MultiRoute({   
    // Точки маршрута. Точки могут быть заданы как координатами, так и адресом. 
    referencePoints: [
        [57.626273, 39.894102], //Ярославль
        [57.768087, 40.926583] //Кострома
    ]
	}
);
multiRouteKO.model.events.add("requestsuccess", function (event) {
	A=multiRouteKO.getRoutes().get(0).properties.get("distance").value;
	alert ((A*0.001).toFixed());
}); */

//map.geoObjects.add(multiRouteKO);
alert ('--Конец функции:--');
}        

function handleFiles(files) {
	// Check for the various File API support.
	if (window.FileReader) {
		// FileReader are supported.
		getAsText(files[0]);
	} else {
		alert('FileReader are not supported in this browser.');
	}
}

function getAsText(fileToRead) {
	var reader = new FileReader();
	// Read file into memory as UTF-8      
	reader.readAsText(fileToRead);
	// Handle errors load
	reader.onload = loadHandler;
	reader.onerror = errorHandler;
}

function loadHandler(event) {
	var csv = event.target.result;
	processData(csv);             
}

function processData(csv) {
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
	if(evt.target.error.name == "NotReadableError") {
		alert("Canno't read file !");
	}
}

function drawOutput(lines){
	//Clear previous data
	//alert ('юРА');
	document.getElementById("output").innerHTML = "";
	var table = document.createElement("table");
	for (var i = 0; i < lines.length; i++) {
		var row = table.insertRow(-1);
		for (var j = 0; j < lines[i].length; j++) {
			var firstNameCell = row.insertCell(-1);
			firstNameCell.appendChild(document.createTextNode(lines[i][j]));
			//alert (document.createTextNode(lines[i][j]));
		}
	}
	document.getElementById("output").appendChild(table);
	alert ('DRAW');
	//var ret='';
	ymaps.ready(init(4,2,'г.Рязань у. Щорса, 30/34'));
	ymaps.ready(init(4,2,'г.Ярославль пл. Труда, 2'));
	alert ('Полный конец скипта');
} 
