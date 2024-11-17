import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GesrionProvedoresProductosComponent } from './gesrion-provedores-productos.component';

describe('GesrionProvedoresProductosComponent', () => {
  let component: GesrionProvedoresProductosComponent;
  let fixture: ComponentFixture<GesrionProvedoresProductosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GesrionProvedoresProductosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GesrionProvedoresProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
