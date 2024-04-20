import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminComponetsComponent } from './admin-componets.component';

describe('AdminComponetsComponent', () => {
  let component: AdminComponetsComponent;
  let fixture: ComponentFixture<AdminComponetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminComponetsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminComponetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
