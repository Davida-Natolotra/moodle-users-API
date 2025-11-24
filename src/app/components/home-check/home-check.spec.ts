import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeCheck } from './home-check';

describe('HomeCheck', () => {
  let component: HomeCheck;
  let fixture: ComponentFixture<HomeCheck>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeCheck]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeCheck);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
