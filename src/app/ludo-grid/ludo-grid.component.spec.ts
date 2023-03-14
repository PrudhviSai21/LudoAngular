import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LudoGridComponent } from './ludo-grid.component';

describe('LudoGridComponent', () => {
  let component: LudoGridComponent;
  let fixture: ComponentFixture<LudoGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LudoGridComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LudoGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
