import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubsubcategoryComponent } from './subsubcategory.component';

describe('SubsubcategoryComponent', () => {
  let component: SubsubcategoryComponent;
  let fixture: ComponentFixture<SubsubcategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubsubcategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubsubcategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
