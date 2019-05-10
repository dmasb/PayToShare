import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Product} from '../../models/products/product';
import {flatMap, map, mergeMap, switchMap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {MessageService} from '../message.service';
import {alerts} from '../../models/alerts';
import * as firebase from 'firebase';
import {SaleType} from '../../models/saleType';
import {Sale} from '../../models/products/sale';

@Injectable({
  providedIn: 'root'
})

export class ProductsService {

  private products: Observable<Product[]>;

  constructor(private afs: AngularFirestore,
              private messageService: MessageService) {
  }

  /*
  to be fixed {Suitable for the search by tag functionality]
   */
  getProductsByTag(tags: string[]): Observable<Product[]> {
    return this.afs.collection('products', ref =>
      ref.where('quantity', '>', 0)).snapshotChanges().pipe(
      map(products => {
        return products.map(product => {
          return {
            id: product.payload.doc.id,
            ...product.payload.doc.data()
          } as Product;
        }).filter(
          product => (tags.length > 0) ? tags.includes(product.id) : true
        );
      })
    );
  }

  getProductDetail() {

    const lol = this.afs.collection('sales', ref =>
      ref.where('type', '==', SaleType.TAG)).snapshotChanges().pipe(
      map(sales => {
        return sales.map(sale => {
          return {
            id: sale.payload.doc.id,
            ...sale.payload.doc.data()
          } as Sale;
        }).map(products => {
            this.products =  this.afs.collection('products', ref =>
              ref.where('tagIDs', 'array-contains', products.salesObjectsID)).snapshotChanges().pipe(
              map(product => {
                return product.map(final => {
                  console.log(final.payload.doc.data());
                  return {
                    id: final.payload.doc.id,
                    ...final.payload.doc.data()
                  } as Product;
                });
              })
            );
            console.log('xDDDDDDDDDDDDDDDDDDDDDDDD');
            this.products.subscribe(r => console.log(r));
            console.log('xDDDDDDDDDDDDDDDDDDDDDDDD');
          }
        );
      })
    );


    /*
        const saleIDs = this.afs.collection('sales').snapshotChanges().pipe(
          map(sales => {
            return sales.map(sale => {
              return sale.payload.doc.data() as Sale;
            });
          }));

        const productCollection = this.afs.collection('products').snapshotChanges().pipe(
          map(products => {
            return products.map(product => {
              return {
                id: product.payload.doc.id,
                ...product.payload.doc.data()
              } as Product;
            });
          })
        );

        const db = firebase.database();
        const prodArray = this.afs.collection('products').ref;
        const some = saleIDs.pipe(
          switchMap(r => r.map(f => {
            const query = prodArray.where('tagIDs', 'array-contains', f.salesObjectsID);
            return  query.get().then(re => {
              return re.docs.map(m => {
                return m.data() as Product;
              });
            });
          }))
        );
      }*/

    // Temporary

    // join 3 tables to get 1 product details


    return this.afs.collection('sales').ref.where('type', '==', SaleType.TAG).get().then(
      res => res.docs.map(r => {
        return {
          ...r.data()
        } as Sale;
      }).map(async sale => {
        return await this.afs.collection('products').ref.where('tagIDs', 'array-contains', sale.salesObjectsID).get().then(
          re => re.docs.map(final => {
            console.log('HERE!!!! :( ');
            console.log(final.data());
            return {
              id: final.id,
              ...final.data()
            } as Product;
          })
        );
      })
    );
    /*return await this.afs.collection('sales').ref.where('type', '==', SaleType.TAG).get().then(
      res => res.docs.map(async r => {
        const sale = r.data() as Sale;
        return await this.afs.collection('products').ref.where('tagIDs', 'array-contains', sale.salesObjectsID).get().then(
          s => s.docs.map(final => {
            return {
              id: final.id,
              ...final.data()
            } as Product;
          })
        );
      }));*/
  }


  async addProduct(product: Product) {
    await this.afs.collection('products').add(Object.assign({}, product));
    this.messageService.add(product.title + ' was successfully added!', alerts.success);
  }


  async confirmDelete(product: Product) {
    await this.afs.collection('products').doc(product.id).delete();
    this.messageService.add(product.title + ' was successfully deleted!', alerts.success);
  }

  async update(product: Product) {
    await this.afs.collection('products').doc(product.id).update(Object.assign({}, product));
    this.messageService.add(product.title + ' was successfully edited!', alerts.success);
  }

}
