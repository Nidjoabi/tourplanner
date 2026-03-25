import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTourComponent} from './tour';

describe('CreateTourComponent', () => {
  let component: CreateTourComponent;
  let fixture: ComponentFixture<CreateTourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateTourComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateTourComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
