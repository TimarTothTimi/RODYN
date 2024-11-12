import { Injectable } from "@angular/core";
import {
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  docData,
  DocumentData,
  Firestore,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "@angular/fire/firestore";
import {
  BehaviorSubject,
  distinct,
  from,
  map,
  mergeMap,
  Observable,
  tap,
  timer,
  toArray,
} from "rxjs";
import { CustomerModel } from "../models/customer.model";

@Injectable({
  providedIn: "root",
})
export class CustomerService {
  private readonly customerCollestionRef = collection(this.firestore, "users");

  private timeSub = new BehaviorSubject<string>("");

  timeObs$ = this.timeSub.asObservable();

  constructor(private firestore: Firestore) {
    timer(0, 1000).subscribe(() => {
      this.timeSub.next(new Date().toLocaleTimeString());
    });
  }

  //CREAT

  addCustomer(costumer: CustomerModel): Observable<DocumentData> {
    return from(addDoc(this.customerCollestionRef, costumer));
  }

  //READ
  //folyamatos kapcsolat, sok olvasás

  getCustomers(): Observable<CustomerModel[]> {
    return collectionData(this.customerCollestionRef, {
      idField: "id",
    }) as Observable<CustomerModel[]>;
  }

  //nem teremt folyamatos olvasást, egyszeri olvasás

  getCustomersWithGetDocs(): Observable<CustomerModel[]> {
    return from(getDocs(this.customerCollestionRef)).pipe(
      map((snapshot) => {
        const resultList = snapshot.docs.map((doc) => {
          const customerData: CustomerModel = doc.data() as CustomerModel;
          customerData.id = doc.id;
          return customerData;
        });
        return resultList;
      })
    );
  }

  //*READ ONE
  // folyamatos kapcsolatot terem - sok olvasás
  getCustomer(id: string): Observable<CustomerModel> {
    const customerDoc = doc(this.firestore, `users/${id}`);
    return docData(customerDoc, { idField: "id" }) as Observable<CustomerModel>;
  }

  // nem teremt folyamatos kapcsolatot - egyszeri olvasás
  getCustomerWithGetDoc(id: string) {
    const customerDoc = doc(this.firestore, `users/${id}`);
    return from(getDoc(customerDoc)).pipe(
      map((doc) => {
        const customerData: CustomerModel = doc.data() as CustomerModel;
        customerData.id = doc.id;
        return customerData;
      })
    );
  }

  //törlés, DELETE

  deleteCustomer(customerId: string): Observable<void> {
    const customerDoc = doc(this.firestore, `users/${customerId}`);
    return from(deleteDoc(customerDoc));
  }

  //UPDATE
  updateCustomer(customer: CustomerModel): Observable<void> {
    const customerDoc = doc(this.firestore, `users/${customer.id}`);
    return from(setDoc(customerDoc, customer));
  }

  //Get values with rxjs operators

  getPropertyValues(prop: string) {
    return from(getDocs(this.customerCollestionRef)).pipe(
      map((snapshot) => snapshot.docs.map((doc) => doc.data()[prop])),
      mergeMap((dataList) => dataList),
      distinct(),
      toArray(),
      tap((data) => console.log(data))
    );
  }

  getFilteredCustomers(
    prop: string,
    value: string
  ): Observable<CustomerModel[]> {
    const q = query(this.customerCollestionRef, where(prop, "==", value));
    return collectionData(q, { idField: "id" }) as Observable<CustomerModel[]>;
  }
}
