import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteTestingComponent } from './route-testing.component';

describe('RouteTestingComponent', () => {
  let component: RouteTestingComponent;
  let fixture: ComponentFixture<RouteTestingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RouteTestingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RouteTestingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
