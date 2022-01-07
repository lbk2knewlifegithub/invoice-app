import { ChangeDetectionStrategy, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('InvoiceFormComponent', () => {
  let fixture: ComponentFixture<InvoiceFormComponent>;
  let component: InvoiceFormComponent;
  let de: DebugElement;
  let invoiceForm: FormGroup;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [fromInvoiceForm.COMPONENTS],
      imports: [ReactiveFormsModule, SharedModule],
    })
      .overrideComponent(InvoiceIdComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default },
      })
      .overrideComponent(InvoiceFormComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default },
      })
      .compileComponents();
  });

  beforeEach(async () => {
    fixture = TestBed.createComponent(InvoiceFormComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    fixture.detectChanges();
    invoiceForm = component.invoiceForm;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('default value of form should be', () => {
    const createdAt = new Date().toISOString();
    invoiceForm.patchValue({ billTo: { createdAt } });
    fixture.detectChanges();

    expect(invoiceForm.value).toEqual({
      billTo: {
        clientName: '',
        clientEmail: '',
        clientAddress: {
          street: '',
          city: '',
          postCode: '',
          country: '',
        },
        createdAt,
        paymentTerms: 30,
        description: '',
      },
      senderAddress: {
        street: '',
        city: '',
        postCode: '',
        country: '',
      },
      items: [],
    });
  });

  it('should create senderAddress FormGroup', () => {
    const senderAddress = de.query(
      By.css("input[formControlName='senderAddress']")
    );
    expect(senderAddress).toBeDefined();
  });

  it('should create billTo FormGroup', () => {
    const billTo = de.query(By.css("input[formControlName='billTo']"));
    expect(billTo).toBeDefined();
  });

  it('should create items FormArray', () => {
    const items = de.query(By.css("input[formControlName='items']"));
    expect(items).toBeDefined();
  });

  describe('sendAddress', () => {
    describe('street', () => {
      it('street FormControl defined', () => {
        const streetSenderAddressElement = de.query(
          By.css(
            "input[formControlName='senderAddress'] input[formControlName='street']"
          )
        );
        expect(streetSenderAddressElement).toBeDefined();
      });

      it('Should valid street', () => {
        const streetFormControl = invoiceForm
          .get('senderAddress')
          ?.get('street');
        streetFormControl?.setValue('123 Banana');
        expect(streetFormControl?.hasError('required')).toBeFalsy();
      });

      it('should invalid street', () => {
        const streetFormControl = invoiceForm
          .get('senderAddress')
          ?.get('street');
        streetFormControl?.setValue('');
        expect(streetFormControl?.hasError('required')).toBeTruthy();
      });
    });

    describe('city', () => {
      it('should create input for city Form Control', () => {
        const citySenderAddressElement = de.query(
          By.css(
            "input[formControlName='senderAddress'] input[formControlName='city']"
          )
        );
        expect(citySenderAddressElement).toBeDefined();
      });

      it('Should valid city', () => {
        const cityFormControl = invoiceForm.get('senderAddress')?.get('city');
        cityFormControl?.setValue('London');
        expect(cityFormControl?.hasError('required')).toBeFalsy();
      });

      it('should invalid city', () => {
        const cityFormControl = invoiceForm.get('senderAddress')?.get('city');
        cityFormControl?.setValue('');
        expect(cityFormControl?.hasError('required')).toBeTruthy();
      });
    });

    describe('postCode', () => {
      it('should create input for postCode Form Control', () => {
        const postCodeSenderAddressElement = de.query(
          By.css(
            "input[formControlName='senderAddress'] input[formControlName='postCode']"
          )
        );
        expect(postCodeSenderAddressElement).toBeDefined();
      });

      it('Should valid postCode', () => {
        const postCodeFormControl = invoiceForm
          .get('senderAddress')
          ?.get('postCode');
        postCodeFormControl?.setValue('23232');
        expect(postCodeFormControl?.hasError('required')).toBeFalsy();
      });

      it('should invalid postCode', () => {
        const postCodeFormControl = invoiceForm
          .get('senderAddress')
          ?.get('postCode');
        postCodeFormControl?.setValue('');
        expect(postCodeFormControl?.hasError('required')).toBeTruthy();
      });
    });

    describe('country', () => {
      it('should create input for country Form Control', () => {
        const countrySenderAddressElement = de.query(
          By.css(
            "input[formControlName='senderAddress'] input[formControlName='country']"
          )
        );
        expect(countrySenderAddressElement).toBeDefined();
      });

      it('Should valid country', () => {
        const countryFormControl = invoiceForm
          .get('senderAddress')
          ?.get('country');
        countryFormControl?.setValue('23232');
        expect(countryFormControl?.hasError('required')).toBeFalsy();
      });

      it('should invalid country', () => {
        const countryFormControl = invoiceForm
          .get('senderAddress')
          ?.get('postCode');
        countryFormControl?.setValue('');
        expect(countryFormControl?.hasError('required')).toBeTruthy();
      });
    });
  });

  describe('billTo', () => {
    describe('clientName', () => {
      it('Should crate input for clientName defined', () => {
        const clientNameElement = de.query(
          By.css(
            "input[formControlName='billTo'] input[formControlName='clientName']"
          )
        );
        expect(clientNameElement).toBeDefined();
      });

      it('Should valid clientName', () => {
        const streetFormControl = invoiceForm.get('billTo')?.get('clientName');
        streetFormControl?.setValue('Banana');
        expect(streetFormControl?.hasError('required')).toBeFalsy();
      });

      it('should invalid clientName', () => {
        const streetFormControl = invoiceForm.get('billTo')?.get('clientName');
        streetFormControl?.setValue('');
        expect(streetFormControl?.hasError('required')).toBeTruthy();
      });
    });

    describe('clientEmail', () => {
      it('should create input for clientEmail Form Control', () => {
        const citySenderAddressElement = de.query(
          By.css(
            "input[formControlName='billTo'] input[formControlName='clientEmail']"
          )
        );
        expect(citySenderAddressElement).toBeDefined();
      });

      it('Should valid clientEmail', () => {
        const cityFormControl = invoiceForm.get('billTo')?.get('clientEmail');
        cityFormControl?.setValue('lbk@gmail.com');
        expect(cityFormControl?.hasError('required')).toBeFalsy();
        expect(cityFormControl?.hasError('email')).toBeFalsy();
      });

      it('should invalid clientEmail', () => {
        const cityFormControl = invoiceForm.get('billTo')?.get('clientEmail');
        cityFormControl?.setValue('safs');
        expect(cityFormControl?.hasError('required')).toBeFalsy();
        expect(cityFormControl?.hasError('email')).toBeTruthy();
      });
    });
  });
});
