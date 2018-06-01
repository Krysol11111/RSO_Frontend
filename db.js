export default {
  "categories": [
    {
      "id": 7,
      "name": "Kategoria1",
      "categoryOrder": "2.0",
    },
    {
      "id": 6,
      "name": "Kategoria2",
      "categoryOrder": "1.0",
    }
  ],
  products: function (categoryId){
    var products = '[{"id": 41, "name": "Piwo", "price": 9.99,"quantity": 100,"status": "new","description": "Najlepsze piwerko","imagePath": "sciezka/do/pliku.jpg"},{"id": 42,"name": "Inne piwo","price": 9.99,"quantity": 100,"status": "onsale","description": "Najgorsze piwerko","imagePath": "sciezka/do/pliku.jpg"}]';
    if (categoryId == 7)
      return JSON.parse(products);
    else
      return [];
  },
}
