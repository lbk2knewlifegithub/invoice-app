import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy } from '@angular/compiler';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { OverlayComponent } from '.';

describe('OverlayComponent', () => {
  let fixture: ComponentFixture<OverlayComponent>;
  let component: OverlayComponent;
  let de: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OverlayComponent],
    })
      .overrideComponent(OverlayComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default },
      })
      .compileComponents();
  });

  beforeEach(async () => {
    fixture = TestBed.createComponent(OverlayComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
