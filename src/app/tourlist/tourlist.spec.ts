import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Tourlist } from './tourlist';

describe('Tourlist', () => {
  let component: Tourlist;
  let fixture: ComponentFixture<Tourlist>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Tourlist]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Tourlist);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
