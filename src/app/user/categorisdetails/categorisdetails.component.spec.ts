import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorisdetailsComponent } from './categorisdetails.component';

describe('CategorisdetailsComponent', () => {
  let component: CategorisdetailsComponent;
  let fixture: ComponentFixture<CategorisdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategorisdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategorisdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
