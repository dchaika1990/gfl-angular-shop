import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Product} from './product';

@Injectable({
    providedIn: 'root'
})
export class RequestService {
    apiUrl = 'http://my-json-server.typicode.com/achubirka/db/products';
    products: Product[] = [];

    constructor(private http: HttpClient) {
    }

    loadProducts() {
        const request = this.http.get(this.apiUrl, {observe: 'response'});
        return new Observable(observer => {
            request.subscribe(response => {
                this.products = (response.body as Product[]);
                observer.next(response.body);
                observer.complete();
            });
        });
    }

    get getCartProducts(){
        return JSON.parse(localStorage.getItem('cartProducts') as string) || [];
    }
    setCartProducts(item: any){
        localStorage.setItem('cartProducts', item);
    }
}
