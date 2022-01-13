import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ShellComponent } from "./core/containers/shell.component";

const routes: Routes = [
  {
    path: "",
    component: ShellComponent,
    children: [
      {
        path: "invoices",
        loadChildren: () =>
          import("@frontend/invoices/invoices-preview").then(
            (m) => m.InvoicesPreviewModule
          ),
        data: { animation: "Invoices", reuseRoute: true },
      },
      {
        path: "invoice",
        loadChildren: () =>
          import("@frontend/invoices/view-invoice").then(
            (m) => m.ViewInvoiceModule
          ),
        data: { animation: "Invoice" },
      },
      {
        path: "",
        redirectTo: "/invoices",
        pathMatch: "full",
      },
    ],
  },

  {
    path: "login",
    loadChildren: () => import("@frontend/auth").then((m) => m.LoginModule),
    data: { title: "Login", animation: "Login" },
  },
  {
    path: "sign-up",
    loadChildren: () => import("@frontend/auth").then((m) => m.SignUpModule),
    data: { title: "Sign Up", animation: "SignUp" },
  },
  {
    path: "**",
    redirectTo: "/invoices",
    pathMatch: "full",
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      // useHash: true,
      relativeLinkResolution: "legacy",
      scrollPositionRestoration: "top",
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
