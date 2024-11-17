import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegitrarVentasComponent } from './regitrar-ventas.component';

describe('RegitrarVentasComponent', () => {
  let component: RegitrarVentasComponent;
  let fixture: ComponentFixture<RegitrarVentasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegitrarVentasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegitrarVentasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
