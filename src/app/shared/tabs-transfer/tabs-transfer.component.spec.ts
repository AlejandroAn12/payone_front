import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabsTransferComponent } from './tabs-transfer.component';

describe('TabsTransferComponent', () => {
  let component: TabsTransferComponent;
  let fixture: ComponentFixture<TabsTransferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabsTransferComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabsTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
