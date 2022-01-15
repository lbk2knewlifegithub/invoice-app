import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy } from '@angular/compiler';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { InvoiceIdComponent } from '../..';

describe('InvoiceIdComponent', () => {
  let fixture: ComponentFixture<InvoiceIdComponent>;
  let component: InvoiceIdComponent;
  let de: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InvoiceIdComponent],
    })
      .overrideComponent(InvoiceIdComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default },
      })
      .compileComponents();
  });

  beforeEach(async () => {
    fixture = TestBed.createComponent(InvoiceIdComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render invoice id uppercase and have # value in front', () => {
    component.value = 'banana';
    fixture.detectChanges();
    const text = de.query(By.css('p')).nativeElement.textContent;
    expect(text).toContain('# BANANA');
  });
});
