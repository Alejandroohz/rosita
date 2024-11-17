import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarProvedoresComponent } from './registrar-provedores.component';

describe('RegistrarProvedoresComponent', () => {
  let component: RegistrarProvedoresComponent;
  let fixture: ComponentFixture<RegistrarProvedoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrarProvedoresComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegistrarProvedoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
