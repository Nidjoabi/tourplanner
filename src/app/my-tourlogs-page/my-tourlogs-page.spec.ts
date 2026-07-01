import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyTourlogsPage } from './my-tourlogs-page';

describe('MyTourlogsPage', () => {
  let component: MyTourlogsPage;
  let fixture: ComponentFixture<MyTourlogsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyTourlogsPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyTourlogsPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
