import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SorterItemComponent } from '../sorter-item/sorter-item.component';

import { SorterComponent } from './sorter.component';

describe('SorterComponent', () => {
  let component: SorterComponent;
  let fixture: ComponentFixture<SorterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SorterComponent, SorterItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SorterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
