import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { mergeMap, map, catchError } from "rxjs/operators";

import { ProductService } from "../product.service";
import * as productActions from "./product.actions";
import { Product } from "../product";
import { of, Observable } from "rxjs";
import { Action } from "@ngrx/store";

@Injectable()
export class ProductEffects {
  constructor(
    private actions$: Actions,
    private productService: ProductService
  ) {}

  @Effect()
  loadProducts$: Observable<Action> = this.actions$.pipe(
    ofType(productActions.ProductActionTypes.Load),
    mergeMap((action: productActions.Load) =>
      this.productService.getProducts().pipe(
        map((products: Product[]) => new productActions.LoadSucess(products)),
        catchError(err => of(new productActions.LoadFail(err)))
      )
    )
  );

  @Effect()
  updateProducts$: Observable<Action> = this.actions$.pipe(
    ofType(productActions.ProductActionTypes.UpdateProduct),
    map((action: productActions.UpdateProduct) => action.payload),
    mergeMap((product: Product) =>
      this.productService.updateProduct(product).pipe(
        map(
          updatedProduct =>
            new productActions.UpdateProductSuccess(updatedProduct)
        ),
        catchError(err => of(new productActions.UpdateProductFail(err)))
      )
    )
  );

  @Effect()
  addProduct$: Observable<Action> = this.actions$.pipe(
    ofType(productActions.ProductActionTypes.AddProduct),
    map((action: productActions.AddProduct) => action.payload),
    mergeMap((product: Product) =>
      this.productService.createProduct(product).pipe(
        map(newProduct => new productActions.AddProductSuccess(newProduct)),
        catchError(err => of(new productActions.AddProductFail(err)))
      )
    )
  );

  @Effect()
  deleteProduct$: Observable<Action> = this.actions$.pipe(
    ofType(productActions.ProductActionTypes.DeleteProduct),
    map((action: productActions.DeleteProduct) => action.payload),
    mergeMap((productId: number) =>
      this.productService.deleteProduct(productId).pipe(
        map(() => new productActions.DeleteProductSuccess(productId)),
        catchError(err => of(new productActions.DeleteProductFail(err)))
      )
    )
  );
}
