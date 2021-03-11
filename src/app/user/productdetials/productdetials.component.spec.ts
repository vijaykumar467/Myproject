import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductdetialsComponent } from './productdetials.component';

describe('ProductdetialsComponent', () => {
  let component: ProductdetialsComponent;
  let fixture: ComponentFixture<ProductdetialsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductdetialsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductdetialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
