import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestAlbertComponent } from './test-albert.component';

describe('TestAlbertComponent', () => {
  let component: TestAlbertComponent;
  let fixture: ComponentFixture<TestAlbertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestAlbertComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestAlbertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
