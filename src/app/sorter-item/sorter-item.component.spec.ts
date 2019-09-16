import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SorterConfig } from '../_models/sorter-config';

import { SorterItemComponent } from './sorter-item.component';

describe('SorterItemComponent', () => {
  let component: SorterItemComponent;
  let fixture: ComponentFixture<SorterItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SorterItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SorterItemComponent);
    component = fixture.componentInstance;
    component.config = new SorterConfig('test', 'foo', []);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
