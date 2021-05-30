import {Injectable} from '@angular/core';
import {Product} from './product';
import {RequestService} from './request.service';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    constructor(private requestService: RequestService) {
    }

    addProduct(product: Product, cartProducts: Product[], products: Product[]) {
        const productId = product.id;
        if (product.count === 0) {
            cartProducts.push(product);
        }
        cartProducts.forEach((cartProduct) => {
            if (cartProduct.id === productId) {
                if (cartProduct.count < cartProduct.available) {
                    cartProduct.count++;
                    products.forEach((prod) => {
                        if (prod.id === productId) {
                            prod.count = cartProduct.count;
                        }
                    });
                }
            }
        });
        this.requestService.setCartProducts(JSON.stringify(cartProducts));
    }

    removeProduct(product: Product, cartProducts: Product[], products: Product[]) {
        const productId = product.id;
        cartProducts.forEach((cartProduct) => {
            if (cartProduct.id === productId) {
                if (cartProduct.count <= cartProduct.available) {
                    console.log(cartProduct.count);
                    cartProduct.count--;
                    products.forEach((prod) => {
                        if (prod.id === productId) {
                            prod.count = cartProduct.count;
                        }
                    });
                }
            }
        });
        if (product.count === 0) {
            cartProducts = cartProducts.filter((item) => item.id !== productId);
        }
        this.requestService.setCartProducts(JSON.stringify(cartProducts));
    }
}
