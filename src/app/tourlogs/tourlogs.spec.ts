import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Tourlogs } from './tourlogs';

describe('Tourlogs', () => {
  let component: Tourlogs;
  let fixture: ComponentFixture<Tourlogs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Tourlogs]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Tourlogs);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
