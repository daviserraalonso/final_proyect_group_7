import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteTeachersComponent } from './favorite-teachers.component';

describe('FavoriteTeachersComponent', () => {
  let component: FavoriteTeachersComponent;
  let fixture: ComponentFixture<FavoriteTeachersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavoriteTeachersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavoriteTeachersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
