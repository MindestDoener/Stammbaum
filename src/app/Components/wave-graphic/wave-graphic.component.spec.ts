import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaveGraphicComponent } from './wave-graphic.component';

describe('WaveGraphicComponent', () => {
  let component: WaveGraphicComponent;
  let fixture: ComponentFixture<WaveGraphicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WaveGraphicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WaveGraphicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
