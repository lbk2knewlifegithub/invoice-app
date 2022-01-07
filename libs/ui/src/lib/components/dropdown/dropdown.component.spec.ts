import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { DropdownComponent } from '.';

describe('DropDownComponent', () => {
  let fixture: ComponentFixture<DropdownComponent>;
  let component: DropdownComponent;
  let de: DebugElement;

  let serviceStub: any;

  beforeEach(async () => {
    serviceStub = {
      counter: () => of(100),
    };

    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [DropdownComponent],
    }).compileComponents();
  });

  beforeEach(async () => {
    fixture = TestBed.createComponent(DropdownComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close dropdown by default', () => {
    expect(component.active).toBeFalsy();
  });

  it('should emit activeChange with value true when click to dropdown button', () => {
    spyOn(component.activeChange, 'emit');
    const dropDownButton = de.query(By.css('button'));
    expect(dropDownButton)
      .withContext('dropdown button not found')
      .not.toBeNull();

    dropDownButton.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(component.activeChange.emit).toHaveBeenCalledWith(true);
  });

  it('should remove class active to dropdown-items when active is false', () => {
    const dropdownItems = de.query(By.css('.dropdown-items')).nativeElement  as HTMLElement ;
    expect(dropdownItems.className).not.toContain('active');
  });

  it('should add class active to dropdown-items when active is true', () => {
    component.active = true;
    fixture.detectChanges();
    const dropdownItems = de.query(By.css('.active'))  ;
    expect(dropdownItems).toBeDefined();
  });
});
