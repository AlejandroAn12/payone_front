import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SplashcreenComponent } from './splashcreen.component';

describe('SplashcreenComponent', () => {
  let component: SplashcreenComponent;
  let fixture: ComponentFixture<SplashcreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SplashcreenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SplashcreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
