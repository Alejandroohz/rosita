import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvedorComponent } from './provedor.component';

describe('ProvedorComponent', () => {
  let component: ProvedorComponent;
  let fixture: ComponentFixture<ProvedorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProvedorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProvedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
