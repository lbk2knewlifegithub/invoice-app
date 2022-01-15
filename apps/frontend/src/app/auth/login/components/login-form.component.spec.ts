import { DebugElement } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { By } from "@angular/platform-browser";
import { LogoComponent } from "@frontend/shared/invoice-form/components";
import { credentialsStub } from "@lbk/stubs";
import { LoginFormComponent } from "./login-form.component";

describe("Login Page", () => {
  let fixture: ComponentFixture<LoginFormComponent>;
  let instance: LoginFormComponent;
  let debug: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [LoginFormComponent, LogoComponent],
    });

    fixture = TestBed.createComponent(LoginFormComponent);
    instance = fixture.componentInstance;

    debug = fixture.debugElement;
    fixture.detectChanges();
  });

  it("should compile", () => {
    expect(instance).toBeDefined();
  });

  it("should disable the form if pending", () => {
    instance.pending = true;
    fixture.detectChanges();

    const submitButton = debug.query(By.css("[type='submit']"))
      .nativeElement as HTMLButtonElement;
    expect(submitButton.disabled).toBeTruthy();
  });

  it("check initial form values for login form group", () => {
    const loginForm = instance.form;
    const loginFormValue = {
      username: "",
      password: "",
    };

    expect(loginForm.value).toEqual(loginFormValue);
  });

  it("should have username Form Control", () => {
    expect(instance.form.get("username")).toBeDefined();
  });

  it("should have password Form Control", () => {
    expect(instance.form.get("password")).toBeDefined();
  });
  it("should have submit button", () => {
    expect(debug.query(By.css("[type='submit']"))).toBeDefined();
  });

  describe("username", () => {
    function username() {
      return instance.form.get("username") as FormControl;
    }

    it("should be required", () => {
      const loginForm = instance.form;

      loginForm.setValue({ ...credentialsStub(), username: "" });

      expect(username().hasError("required")).toBeTruthy();
    });

    it("should be shorter than 30 characters", () => {
      const loginForm = instance.form;

      loginForm.setValue({
        ...credentialsStub(),
        username: Array.from({ length: 30 }).join("ssdfs"),
      });

      expect(username().hasError("maxlength")).toBeTruthy();
    });

    it("should be larger than 5 characters", () => {
      const loginForm = instance.form;

      loginForm.setValue({
        ...credentialsStub(),
        username: "asd",
      });
      expect(username().hasError("minlength")).toBeTruthy();
    });
  });

  describe("password", () => {
    function password() {
      return instance.form.get("password") as FormControl;
    }

    it("should be required", () => {
      const loginForm = instance.form;

      loginForm.setValue({ ...credentialsStub(), password: "" });

      expect(password().hasError("required")).toBeTruthy();
    });

    it("should be shorter than 30 characters", () => {
      const loginForm = instance.form;

      loginForm.setValue({
        ...credentialsStub(),
        password: Array.from({ length: 30 }).join("sdss"),
      });


      expect(password().hasError("maxlength")).toBeTruthy();
    });

    it("should be larger than 8 characters", () => {
      const loginForm = instance.form;

      loginForm.setValue({
        ...credentialsStub(),
        password: "asd",
      });

      expect(password().hasError("minlength")).toBeTruthy();
    });
  });
});
