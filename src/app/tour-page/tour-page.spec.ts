import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TourPage } from './tour-page';

describe('TourPage', () => {
  let component: TourPage;
  let fixture: ComponentFixture<TourPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TourPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TourPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
