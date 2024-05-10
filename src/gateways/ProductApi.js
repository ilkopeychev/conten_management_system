import products from '../mocks/products';

class ProductApi {
    getProducts() {
        console.log(products);
        return products;
    }
}

export const productApi = new ProductApi();
