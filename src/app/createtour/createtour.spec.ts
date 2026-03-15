import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Createtour } from './createtour';

describe('Createtour', () => {
  let component: Createtour;
  let fixture: ComponentFixture<Createtour>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Createtour]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Createtour);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
