import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTourPage } from './create-tour-page';

describe('CreateTourPage', () => {
  let component: CreateTourPage;
  let fixture: ComponentFixture<CreateTourPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateTourPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateTourPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
