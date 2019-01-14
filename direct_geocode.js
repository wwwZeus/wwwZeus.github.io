ymaps.ready(init);

function init() {
    var myMap = new ymaps.Map('map', {
        center: [55.753994, 37.622093],
        zoom: 6
    });

    //Точка на карте.
    var myGeocoder = ymaps.geocode("Ярославль, ул. Чехова 17-2 ");
myGeocoder.then(
    
    function (res) {
        alert('ю-РА');
        myMap.geoObjects.add(res.geoObjects);
        // Âûâåäåì â êîíñîëü äàííûå, ïîëó÷åííûå â ðåçóëüòàòå ãåîêîäèðîâàíèÿ îáúåêòà.
        console.log(res.geoObjects.get(0).properties.get('metaDataProperty').getAll());
    },
    function (err) {
        alert('NOT');
        // Îáðàáîòêà îøèáêè.
    }
);

}
