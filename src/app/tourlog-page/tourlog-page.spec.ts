import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TourlogPage } from './tourlog-page';

describe('TourlogPage', () => {
  let component: TourlogPage;
  let fixture: ComponentFixture<TourlogPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TourlogPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TourlogPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
