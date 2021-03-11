import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OldproductsComponent } from './oldproducts.component';

describe('OldproductsComponent', () => {
  let component: OldproductsComponent;
  let fixture: ComponentFixture<OldproductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OldproductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OldproductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
