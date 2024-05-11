import productsReducer, { createProduct, deleteProduct, updateProduct, isFeatured } from '../productsSlice';

describe('products reducer', () => {
    it('delete product', () => {
        const initialState = {
            products: [{ id: '1' }, { id: '2' }],
            status: 'idle',
            error: null
        };

        const result = productsReducer(initialState, deleteProduct('1'));
        const ids = result.products.map(product => product.id);
        expect(ids).not.toContain('1');
    });

    it('update product', () => {
        const initialState = {
            products: [{ id: '2', rating: 1, featured: false }],
            status: 'idle',
            error: null
        };
        const data = { rating: 3 };
        const result = productsReducer(initialState, updateProduct({ id: '2', data }));

        const updatedProduct = result.products.find(product => product.id === '2');
        expect(updatedProduct.rating).toBe(3);
        expect(updatedProduct.featured).toBe(false);  // Correctly handle the featured status
    });

    it('create product', () => {
        const initialState = {
            products: [],
            status: 'idle',
            error: null
        };
        const data = { rating: 3 };
        const result = productsReducer(initialState, createProduct(data));

        expect(result.products.length).toBe(1);
        expect(result.products[0].rating).toBe(3);
        expect(result.products[0].featured).toBe(false);
    });

    describe('isFeatured', () => {
        it('is false if it is not featured', () => {
            expect(isFeatured({ rating: 1, featured: false })).toBe(false);
        });

        it('is true if rating is more than 8', () => {
            expect(isFeatured({ rating: 9 })).toBe(true);
        });

        it('is true if it is featured', () => {
            expect(isFeatured({ rating: 1, featured: true })).toBe(true);
        });
    });
});
