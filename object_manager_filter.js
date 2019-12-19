ymaps.ready(init);

function init() {
    var myMap = new ymaps.Map('map', {
            center: [55.76, 37.64],
            zoom: 7,
            controls: []
        }, {
            searchControlProvider: 'yandex#search'
        }),
        objectManager = new ymaps.ObjectManager({
            // Чтобы метки начали кластеризоваться, выставляем опцию.
            clusterize: true,
            clusterDisableClickZoom: true,
            // ObjectManager принимает те же опции, что и кластеризатор.
            gridSize: 120,
            // Макет метки кластера pieChart.
            clusterIconLayout: "default#pieChart"
        });
    myMap.geoObjects.add(objectManager);

    // Создадим 5 пунктов выпадающего списка.
    var listBoxItems = ['Балашиха, ул. Объединения, 7/27', 'Волоколамск, Ново-Солдатская, д. 14а', 'г. Видное, ул. Советская, 34А', 'г. Орехово-Зуево, ул. К.Либкнехта, д.4.', 'Дубна, проспект Боголюбова д.15', 'Коломна, УРМ Коломна, ул. Фрунзе д. 46','Королев, Проспект Космонавтов, д. 6а','Раменское, Михалевича, д.39','Химки, МО, г. Химки, Юбилейный проспект, д. 73']
            .map(function (title) {
                return new ymaps.control.ListBoxItem({
                    data: {
                        content: title
                    },
                    state: {
                        selected: true
                    }
                })
            }),
        reducer = function (filters, filter) {
            filters[filter.data.get('content')] = filter.isSelected();
            //alert(get('content'));
            return filters;
        },
        // Теперь создадим список, содержащий 5 пунктов.
        listBoxControl = new ymaps.control.ListBox({
            data: {
                content: 'Фильтр',
                title: 'Фильтр'
            },
            items: listBoxItems,
            state: {
                // Признак, развернут ли список.
                expanded: true,
                filters: listBoxItems.reduce(reducer, {})
            }
        });
    myMap.controls.add(listBoxControl);

    // Добавим отслеживание изменения признака, выбран ли пункт списка.
    listBoxControl.events.add(['select', 'deselect'], function (e) {
    //alert('Количество объектов в слое: ' + objectManager.objects.getLength());
        //alert(JSON.stringify(objectManager.objects));
        console.log('ura');
        var listBoxItem = e.get('target');
        var filters = ymaps.util.extend({}, listBoxControl.state.get('filters'));
        filters[listBoxItem.data.get('content')] = listBoxItem.isSelected();
        listBoxControl.state.set('filters', filters);
    });

    var filterMonitor = new ymaps.Monitor(listBoxControl.state);
    filterMonitor.add('filters', function (filters) {
        // Применим фильтр.
        objectManager.setFilter(getFilterFunction(filters));
    });

    function getFilterFunction(categories) {
        return function (obj) {
            var content = obj.properties.iconCaption;
            return categories[content]
        }
    }

    $.ajax({
        url: "https://wwwzeus.github.io/data2.json"
    }).done(function (data) {
        objectManager.add(data);
    });
    
    var data2 = '{"name": "John","age": 30}';
    var json = JSON.parse(data2);
    
    var obj = {
  foo: 'foo',
  toJSON: function() {
    return 'bar';
  }
};
    
//alert(JSON.stringify(obj));        // '"bar"'
//JSON.stringify({ x: obj }); // '{"x":"bar"}'
    

//alert(json["name"]);
//alert(data2);
    
    
}