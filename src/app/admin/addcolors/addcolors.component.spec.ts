import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddcolorsComponent } from './addcolors.component';

describe('AddcolorsComponent', () => {
  let component: AddcolorsComponent;
  let fixture: ComponentFixture<AddcolorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddcolorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddcolorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
