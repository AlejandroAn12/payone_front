import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadpageComponent } from './downloadpage.component';

describe('DownloadpageComponent', () => {
  let component: DownloadpageComponent;
  let fixture: ComponentFixture<DownloadpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DownloadpageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DownloadpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
