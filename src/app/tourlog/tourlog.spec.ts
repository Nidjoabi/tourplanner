import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TourlogComponent} from './tourlog';

describe('Tourlog', () => {
  let component: TourlogComponent;
  let fixture: ComponentFixture<TourlogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TourlogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TourlogComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
