import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderproductsComponent } from './orderproducts.component';

describe('OrderproductsComponent', () => {
  let component: OrderproductsComponent;
  let fixture: ComponentFixture<OrderproductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderproductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderproductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
