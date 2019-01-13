ymaps.ready(init);

function init() {
    var myMap = new ymaps.Map('map', {
        center: [55.753994, 37.622093],
        zoom: 3
    });

    // ����� ��������� ������ ������� ���������.
    var myGeocoder = ymaps.geocode("Vologda");
myGeocoder.then(
    
    function (res) {
        alert('YES');
        myMap.geoObjects.add(res.geoObjects);
        // ������� � ������� ������, ���������� � ���������� �������������� �������.
        console.log(res.geoObjects.get(0).properties.get('metaDataProperty').getAll());
    },
    function (err) {
        alert('NOT');
        // ��������� ������.
    }
);

}