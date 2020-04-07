import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatabaseCardComponent } from './database-card.component';

describe('DatabaseCardComponent', () => {
  let component: DatabaseCardComponent;
  let fixture: ComponentFixture<DatabaseCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatabaseCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatabaseCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
