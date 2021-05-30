import {Component, OnInit} from '@angular/core';
import {Product} from '../../services/product';
import {RequestService} from '../../services/request.service';

@Component({
    selector: 'app-shop',
    templateUrl: './shop.component.html',
    styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
    products: Product[] = [];
    loading = true;
    cartProducts: Product[] = JSON.parse(localStorage.getItem('cartProducts') as string) || [];

    constructor(private requestService: RequestService) {
    }

    ngOnInit(): void {
        this.requestService.loadProducts().subscribe((products) => {
            this.products = (products as Product[]);
            this.products.forEach((product) => {
                product.count = 0;
                this.cartProducts.forEach((cartProduct) => {
                    if (product.id === cartProduct.id) {
                        product.count = cartProduct.count;
                    }
                });
            });
            this.loading = false;
        });
    }

    addToCart(product: Product) {
        this.setProductToStorage(product);
    }

    setProductToStorage(product: Product) {
        const productId = product.id;
        if (product.count === 0) {
            this.cartProducts.push(product);
        }
        this.cartProducts.forEach((cartProduct) => {
            if (cartProduct.id === productId) {
                if (cartProduct.count < cartProduct.available) {
                    cartProduct.count++;
                    this.products.forEach((prod) => {
                        if (prod.id === productId) {
                            prod.count = cartProduct.count;
                        }
                    });
                }
            }
        });
        localStorage.setItem('cartProducts', JSON.stringify(this.cartProducts));
    }

}
