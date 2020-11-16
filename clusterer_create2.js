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
					[55.705645, 37.670789],
					[55.707436, 37.673582],
					[55.876056, 37.524336],
					[55.882293, 37.519925],
					[55.815403, 37.569261],
					[55.802533, 37.564428],
					[55.775454, 37.555095],
					[55.801759, 37.70567],
					[55.897518, 37.542222],
					[55.730112, 37.590156],
					[55.694855, 37.558508],
					[55.897236, 37.605804],
					[55.871748, 37.710898],
					[55.797149, 37.40257],
					[55.633816, 37.47934],
					[55.667884, 37.54409],
					[55.657499, 37.708293],
					[55.53936, 37.573797],
					[55.659647, 37.749661]
        ],
		pointss = [
					["ул Кожуховская 5-я, д 13"],
					["ул Кожуховская 6-я, д 15"],
					["ш Коровинское, д 21, корп 1"],
					["ш Коровинское, д 24, корп 1"],
					["ул.Костякова, д.15"],
					["проезд Петровско-Разумовский, д 24, корп 3"],
					["ул Беговая, д 4"],
					["ул Богородский Вал, д 6, корп 2"],
					["ш Дмитровское, д 155, корп 1"],
					["пр-кт Комсомольский, д 11"],
					["пр-кт Ленинский, д 61/1"],
					["ул Лескова, д 16"],
					["ш Ярославское, д 115"],
					["ул Таллинская, д 18"],
					["ул Академика Варги, д 36"],
					["ул Архитектора Власова, д 43"],
					["ул Батюнинская, д 1"],
					["ул 2-я Мелитопольская, д 3а"],
					["ул Перерва, д 43, корп 1"]
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