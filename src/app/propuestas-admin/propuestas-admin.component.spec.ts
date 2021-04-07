import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropuestasAdminComponent } from './propuestas-admin.component';

describe('PropuestasAdminComponent', () => {
  let component: PropuestasAdminComponent;
  let fixture: ComponentFixture<PropuestasAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PropuestasAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropuestasAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
