ymaps.ready(function () {
    var myMap = new ymaps.Map('map', {
            center: [55.751574, 37.573856],
            zoom: 9,
            behaviors: ['default', 'scrollZoom']
        }, {
            searchControlProvider: 'yandex#search'
        }),

            clusterer = new ymaps.Clusterer({

            preset: 'islands#invertedDarkGreenClusterIcons',

            groupByCoordinates: false,
            clusterDisableClickZoom: true,
            clusterHideIconOnBalloonOpen: false,
            geoObjectHideIconOnBalloonOpen: false
        }),

            getPointData = function (index) {
            return {
                balloonContentFooter: '<font size=1>Кластерр </font>' + pointss[i] + '</strong>',
                clusterCaption: 'адрес <strong>' + index + '</strong>',
				iconCaption: pointss[i]
            };
        },

            getPointOptions = function () {
            return {
                preset: 'islands#redDotIcon',
				draggable: true
            };
        },
        points = [
			[55.633816, 37.47934],
			[55.667884, 37.54409],
			[55.816252, 37.789007],
			[55.657499, 37.708293],
			[55.77636, 37.642384],
			[55.775889, 37.613629],
			[55.76958, 37.49126],
			[55.879122, 37.580966],
			[55.705645, 37.670789],
			[55.707436, 37.673582],
			[55.730112, 37.590156],
			[55.694855, 37.558508],
			[55.53936, 37.573797],
			[55.791486, 37.62281],
			[55.659647, 37.749661],
			[55.770603, 37.568345],
			[55.847821, 37.454645],
			[55.86064, 37.445024],
			[55.765979, 37.74313],
			[55.753904, 37.838756],
			[55.850206, 37.417994]
        ],
		pointss = [
			["ул Академика Варги, д 36"],
			["ул Архитектора Власова, д 43"],
			["ул Байкальская, д 12"],
			["ул Батюнинская, д 1"],
			[" ул Спасская Б., д 27"],
			["ул Делегатская, д 9, строен 1"],
			["ул Демьяна Бедного, д 2, корп 4"],
			["ул Инженерная, д 3"],
			["ул Кожуховская 5-я, д 13"],
			["ул Кожуховская 6-я, д 15"],
			["пр-кт Комсомольский, д 11"],
			["пр-кт Ленинский, д 61/1"],
			["ул 2-я Мелитопольская, д 3а"],
			["пр-кт Олимпийский, д 30, стр 1"],
			["Марьино, ул Перерва, д 43, корп 1"],
			["ул.Пресненский Вал, д.30"],
			["ул Свободы, д 44"],
			["ул Свободы, д 75, корп 1"],
			["ул Соколиной Горы 5-я, д 25, корп 2"],
			["ул Сталеваров, д 22, корп 1"],
			["Яна Райниса, д 18, корп 1"]
        ],
        geoObjects = [];


    for(var i = 0, len = points.length; i < len; i++) {
        geoObjects[i] = new ymaps.Placemark(points[i], getPointData(i), getPointOptions());
    }


    clusterer.options.set({
        gridSize: 10,
        clusterDisableClickZoom: true
    });

    clusterer.add(geoObjects);
    myMap.geoObjects.add(clusterer);


    myMap.setBounds(clusterer.getBounds(), {
        checkZoomRange: true
    });
});