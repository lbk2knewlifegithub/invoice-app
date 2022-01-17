"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[8],{5008:(Ie,Z,s)=>{s.r(Z),s.d(Z,{ViewInvoiceModule:()=>_e});var d=s(9808),u=s(2265),_=s(6674),F=s(3708),q=s(7729),T=s(8798),c=s(5620),p=s(6906),J=s(6917),k=s(4250),C=s(8595),g=s(5698),l=s(5083),e=s(5e3),O=s(8428),Q=s(1305),L=s(6254),x=s(2633);let I=(()=>{class n{constructor(t){this._dialogService=t,this.goBack=new e.vpe,this.cancel=new e.vpe,this.edit=new e.vpe}onSaveChanges(){if(this.invoiceForm.invalid&&this.invoiceForm.touched)return this.invoiceForm.markAllAsTouched(),void this._dialogService.formInvalid().pipe((0,g.q)(1)).subscribe();const t=this.invoiceFormComponent.createInvoiceDto(this.invoice.status);this.edit.emit({id:this.invoice.id,invoiceDto:t}),this.invoiceForm.markAsUntouched()}onCancel(){if(!this.pendingSaveAndChange){if(this.invoiceForm.dirty)return void this._dialogService.confirmDeactivate().pipe((0,g.q)(1)).subscribe(t=>{t&&(this.cancel.emit(),this.invoiceFormComponent.initForm(!0))});this.cancel.emit(),this.invoiceFormComponent.initForm(!0)}}get invoiceForm(){return this.invoiceFormComponent.invoiceForm}}return n.\u0275fac=function(t){return new(t||n)(e.Y36(O.x))},n.\u0275cmp=e.Xpm({type:n,selectors:[["lbk-edit-overlay"]],viewQuery:function(t,i){if(1&t&&e.Gf(_.e,7),2&t){let a;e.iGM(a=e.CRH())&&(i.invoiceFormComponent=a.first)}},inputs:{open:"open",pendingSaveAndChange:"pendingSaveAndChange",invoice:"invoice"},outputs:{goBack:"goBack",cancel:"cancel",edit:"edit"},decls:7,vars:5,consts:[[3,"open","closed"],[1,"panel",3,"invoice"],[1,"flex","items-center","justify-end","gap-2","actions"],[1,"btn","btn-basic",3,"disabled","click"],[1,"btn","btn-primary",3,"disabled","click"],["text","Save Changes",3,"pending"]],template:function(t,i){1&t&&(e.TgZ(0,"lbk-overlay",0),e.NdJ("closed",function(){return i.onCancel()}),e._UZ(1,"lbk-invoice-form",1),e.TgZ(2,"div",2),e.TgZ(3,"button",3),e.NdJ("click",function(){return i.onCancel()}),e._uU(4," Cancel "),e.qZA(),e.TgZ(5,"button",4),e.NdJ("click",function(){return i.onSaveChanges()}),e._UZ(6,"lbk-button-spinner",5),e.qZA(),e.qZA(),e.qZA()),2&t&&(e.Q6J("open",i.open),e.xp6(1),e.Q6J("invoice",i.invoice),e.xp6(2),e.Q6J("disabled",i.pendingSaveAndChange),e.xp6(2),e.Q6J("disabled",i.pendingSaveAndChange),e.xp6(1),e.Q6J("pending",i.pendingSaveAndChange))},directives:[Q.B,L.e,x.r],encapsulation:2,changeDetection:0}),n})();const y="viewInvoicePage",V=(0,c.Lq)({error:null,pendingMaskAsPaid:!1,pendingSaveAndChange:!1,pendingDelete:!1},(0,c.on)(p.W.maskAsPaid,n=>({error:null,pendingDelete:!1,pendingSaveAndChange:!1,pendingMaskAsPaid:!0})),(0,c.on)(p.W.updateInvoice,n=>({error:null,pendingDelete:!1,pendingMaskAsPaid:!1,pendingSaveAndChange:!0})),(0,c.on)(p.W.deleteInvoice,n=>({error:null,pendingDelete:!0,pendingMaskAsPaid:!1,pendingSaveAndChange:!1})),(0,c.on)(l.dV.maskAsPaidSuccess,l.dV.editInvoiceSuccess,l.dV.deleteInvoiceSuccess,n=>({error:null,pendingMaskAsPaid:!1,pendingSaveAndChange:!1,pendingDelete:!1})),(0,c.on)(l.dV.maskAsPaidFailure,l.dV.editInvoiceFailure,l.dV.deleteInvoiceFailure,(n,{error:o})=>({error:o,pendingMaskAsPaid:!1,pendingSaveAndChange:!1,pendingDelete:!1}))),A=(0,c.ZF)(y),Y=((0,c.P1)(A,n=>n.error),(0,c.P1)(A,n=>n.pendingMaskAsPaid)),j=(0,c.P1)(A,n=>n.pendingSaveAndChange),H=(0,c.P1)(A,n=>n.pendingDelete);var X=s(2313),R=s(5600),f=s(4997),z=s(7098);let W=(()=>{class n{}return n.\u0275fac=function(t){return new(t||n)},n.\u0275cmp=e.Xpm({type:n,selectors:[["lbk-invoice-status-detail"]],inputs:{status:"status"},decls:4,vars:1,consts:[[1,"flex","items-center","justify-between","shadow-sm","md:gap-4","md:justify-start"],[1,"text-muted-900"],[3,"status"]],template:function(t,i){1&t&&(e.TgZ(0,"div",0),e.TgZ(1,"span",1),e._uU(2,"Status"),e.qZA(),e._UZ(3,"lbk-invoice-status",2),e.qZA()),2&t&&(e.xp6(3),e.Q6J("status",i.status))},directives:[z.u],encapsulation:2,changeDetection:0}),n})();function K(n,o){if(1&n){const t=e.EpF();e.TgZ(0,"button",5),e.NdJ("click",function(){return e.CHM(t),e.oxw().maskAsPaid.emit()}),e._UZ(1,"lbk-button-spinner",6),e.qZA()}if(2&n){const t=e.oxw();e.Q6J("disabled",t.pendingMaskAsPaid),e.xp6(1),e.Q6J("pending",t.pendingMaskAsPaid)}}let P=(()=>{class n{constructor(){this.edit=new e.vpe,this.delete=new e.vpe,this.maskAsPaid=new e.vpe}get isPending(){return this.pendingMaskAsPaid||this.pendingDelete}}return n.\u0275fac=function(t){return new(t||n)},n.\u0275cmp=e.Xpm({type:n,selectors:[["lbk-invoice-details-actions"]],inputs:{errorMessage:"errorMessage",pendingMaskAsPaid:"pendingMaskAsPaid",pendingDelete:"pendingDelete",isPaid:"isPaid"},outputs:{edit:"edit",delete:"delete",maskAsPaid:"maskAsPaid"},decls:6,vars:4,consts:[[1,"bg-elements","flex","flex-wrap","justify-end","gap-2","py-5","shadow-md","px-6","md:bg-transparent","md:shadow-none","md:py-0","md:px-0"],[1,"btn","btn-basic",3,"disabled","click"],[1,"btn","btn-danger",3,"disabled","click"],["text","Delete",3,"pending"],["class","btn btn-primary",3,"disabled","click",4,"ngIf"],[1,"btn","btn-primary",3,"disabled","click"],["text","Mask as Paid",3,"pending"]],template:function(t,i){1&t&&(e.TgZ(0,"div",0),e.TgZ(1,"button",1),e.NdJ("click",function(){return i.edit.emit()}),e._uU(2," Edit "),e.qZA(),e.TgZ(3,"button",2),e.NdJ("click",function(){return i.delete.emit()}),e._UZ(4,"lbk-button-spinner",3),e.qZA(),e.YNc(5,K,2,2,"button",4),e.qZA()),2&t&&(e.xp6(1),e.Q6J("disabled",i.isPending),e.xp6(2),e.Q6J("disabled",i.isPending),e.xp6(1),e.Q6J("pending",i.pendingDelete),e.xp6(1),e.Q6J("ngIf",!i.isPaid))},directives:[x.r,d.O5],encapsulation:2,changeDetection:0}),n})();var ee=s(5456);let b=(()=>{class n{constructor(){this.textRightMedium=!1}}return n.\u0275fac=function(t){return new(t||n)},n.\u0275cmp=e.Xpm({type:n,selectors:[["lbk-address"]],inputs:{address:"address",textRightMedium:"textRightMedium"},decls:9,vars:6,consts:[[1,"text-sm","text-muted-900","dark:text-muted-800"]],template:function(t,i){1&t&&(e.TgZ(0,"div",0),e.TgZ(1,"p"),e._uU(2),e.qZA(),e.TgZ(3,"p"),e._uU(4),e.qZA(),e.TgZ(5,"p"),e._uU(6),e.qZA(),e.TgZ(7,"p"),e._uU(8),e.qZA(),e.qZA()),2&t&&(e.ekj("md:text-right",i.textRightMedium),e.xp6(2),e.Oqu(i.address.street),e.xp6(2),e.Oqu(i.address.city),e.xp6(2),e.Oqu(i.address.postCode),e.xp6(2),e.Oqu(i.address.country))},encapsulation:2,changeDetection:0}),n})(),te=(()=>{class n{}return n.\u0275fac=function(t){return new(t||n)},n.\u0275cmp=e.Xpm({type:n,selectors:[["lbk-date"]],inputs:{date:"date",title:"title"},decls:7,vars:7,consts:[[1,"space-y-3"],[1,"text-muted-900","dark:text-muted-800"]],template:function(t,i){1&t&&(e.TgZ(0,"div",0),e.TgZ(1,"span",1),e._uU(2),e.ALo(3,"titlecase"),e.qZA(),e.TgZ(4,"h4"),e._uU(5),e.ALo(6,"date"),e.qZA(),e.qZA()),2&t&&(e.xp6(2),e.Oqu(e.lcZ(3,2,i.title)),e.xp6(3),e.Oqu(e.xi3(6,4,i.date,"dd-MMM-yyyy")))},pipes:[d.rS,d.uU],encapsulation:2,changeDetection:0}),n})(),ne=(()=>{class n{}return n.\u0275fac=function(t){return new(t||n)},n.\u0275cmp=e.Xpm({type:n,selectors:[["lbk-bill-to"]],inputs:{clientName:"clientName",clientAddress:"clientAddress"},decls:6,vars:2,consts:[[1,"space-y-3","md:space-y-2"],[1,"text-muted-900","dark:text-muted-800"],[1,"block",3,"address"]],template:function(t,i){1&t&&(e.TgZ(0,"div",0),e.TgZ(1,"span",1),e._uU(2,"Bill To"),e.qZA(),e.TgZ(3,"h4"),e._uU(4),e.qZA(),e._UZ(5,"lbk-address",2),e.qZA()),2&t&&(e.xp6(4),e.Oqu(i.clientName),e.xp6(1),e.Q6J("address",i.clientAddress))},directives:[b],encapsulation:2,changeDetection:0}),n})(),ie=(()=>{class n{}return n.\u0275fac=function(t){return new(t||n)},n.\u0275cmp=e.Xpm({type:n,selectors:[["lbk-send-to"]],inputs:{email:"email"},decls:5,vars:1,consts:[[1,"space-y-3"],[1,"text-muted-900","dark:text-muted-800"]],template:function(t,i){1&t&&(e.TgZ(0,"div",0),e.TgZ(1,"span",1),e._uU(2,"Send to"),e.qZA(),e.TgZ(3,"h4"),e._uU(4),e.qZA(),e.qZA()),2&t&&(e.xp6(4),e.Oqu(i.email))},encapsulation:2,changeDetection:0}),n})();var oe=s(7918),D=s(9824);let se=(()=>{class n{constructor(){this.priceOptions={color:"muted"}}}return n.\u0275fac=function(t){return new(t||n)},n.\u0275cmp=e.Xpm({type:n,selectors:[["lbk-invoice-item"]],inputs:{item:"item"},decls:12,vars:7,consts:[[1,"flex","items-center","justify-between"],[1,"space-y-2"],[1,"font-bold"],[1,"text-muted-900","font-bold","flex","gap-1","items-center","dark:text-muted-700"],[3,"options","value"],[3,"value"]],template:function(t,i){1&t&&(e.TgZ(0,"div",0),e.TgZ(1,"div",1),e.TgZ(2,"p",2),e._uU(3),e.qZA(),e.TgZ(4,"div",3),e.TgZ(5,"span"),e._uU(6),e.qZA(),e.TgZ(7,"span"),e._uU(8,"x"),e.qZA(),e._UZ(9,"lbk-price",4),e.qZA(),e.qZA(),e._UZ(10,"lbk-price",5),e.ALo(11,"totalPriceItem"),e.qZA()),2&t&&(e.xp6(3),e.Oqu(i.item.name),e.xp6(3),e.Oqu(i.item.quantity),e.xp6(3),e.Q6J("options",i.priceOptions)("value",i.item.price),e.xp6(1),e.Q6J("value",e.lcZ(11,5,i.item)))},directives:[oe.C],pipes:[D.X],encapsulation:2,changeDetection:0}),n})();function ae(n,o){if(1&n&&(e.ynx(0),e._UZ(1,"lbk-invoice-item",9),e.BQk()),2&n){const t=o.$implicit;e.xp6(1),e.Q6J("item",t)}}function ce(n,o){if(1&n&&(e.ynx(0),e.TgZ(1,"tr"),e.TgZ(2,"td",10),e._uU(3),e.qZA(),e.TgZ(4,"td",11),e._uU(5),e.qZA(),e.TgZ(6,"td",12),e._uU(7),e.ALo(8,"currency"),e.qZA(),e.TgZ(9,"td",13),e._uU(10),e.ALo(11,"currency"),e.ALo(12,"totalPriceItem"),e.qZA(),e.qZA(),e.BQk()),2&n){const t=o.$implicit;e.xp6(3),e.Oqu(t.name),e.xp6(2),e.Oqu(t.quantity),e.xp6(2),e.hij(" ",e.xi3(8,4,t.price,"GBP")," "),e.xp6(3),e.hij(" ",e.xi3(11,7,e.lcZ(12,10,t),"GBP")," ")}}let de=(()=>{class n{identifyItem(t,i){return i.name}}return n.\u0275fac=function(t){return new(t||n)},n.\u0275cmp=e.Xpm({type:n,selectors:[["lbk-invoice-item-list"]],inputs:{items:"items"},decls:17,vars:4,consts:[[1,"dark:bg-[#252945]","bg-fill"],[1,"grid","gap-6","p-6","md:hidden"],[4,"ngFor","ngForOf","ngForTrackBy"],[1,"hidden","p-8","md:block"],[1,"w-full"],[1,"text-muted-900","dark:text-muted-800"],[1,"text-left"],[1,"text-center"],[1,"text-right"],[3,"item"],[1,"pt-8"],[1,"pt-8","text-center","text-muted-900"],[1,"pt-8","text-right","text-muted-900"],[1,"pt-8","text-right","text-fill-900"]],template:function(t,i){1&t&&(e.TgZ(0,"div",0),e.TgZ(1,"div",1),e.YNc(2,ae,2,1,"ng-container",2),e.qZA(),e.TgZ(3,"div",3),e.TgZ(4,"table",4),e.TgZ(5,"thead",5),e.TgZ(6,"tr",4),e.TgZ(7,"th",6),e._uU(8,"Item Name"),e.qZA(),e.TgZ(9,"th",7),e._uU(10,"QTY."),e.qZA(),e.TgZ(11,"th",8),e._uU(12,"Price"),e.qZA(),e.TgZ(13,"th",8),e._uU(14,"Total"),e.qZA(),e.qZA(),e.qZA(),e.TgZ(15,"tbody"),e.YNc(16,ce,13,12,"ng-container",2),e.qZA(),e.qZA(),e.qZA(),e.qZA()),2&t&&(e.xp6(2),e.Q6J("ngForOf",i.items)("ngForTrackBy",i.identifyItem),e.xp6(14),e.Q6J("ngForOf",i.items)("ngForTrackBy",i.identifyItem))},directives:[d.sg,se],pipes:[d.H9,D.X],encapsulation:2,changeDetection:0}),n})(),re=(()=>{class n{constructor(){this.priceOptions={size:"text-xl"}}}return n.\u0275fac=function(t){return new(t||n)},n.\u0275cmp=e.Xpm({type:n,selectors:[["lbk-grand-total"]],inputs:{grandTotal:"grandTotal"},decls:9,vars:4,consts:[[1,"bg-dark-900","p-6","text-inverted-900","flex","items-center","justify-between","dark:bg-black"],[1,"text-sm"],[1,"md:hidden"],[1,"hidden","md:block"],[1,"font-bold","text-xl","md:text-2xl"]],template:function(t,i){1&t&&(e.TgZ(0,"div",0),e.TgZ(1,"p",1),e.TgZ(2,"span",2),e._uU(3,"Grand Total"),e.qZA(),e.TgZ(4,"span",3),e._uU(5,"Amount Due"),e.qZA(),e.qZA(),e.TgZ(6,"p",4),e._uU(7),e.ALo(8,"currency"),e.qZA(),e.qZA()),2&t&&(e.xp6(7),e.Oqu(e.xi3(8,1,i.grandTotal,"GBP")))},pipes:[d.H9],encapsulation:2,changeDetection:0}),n})();var le=s(9436);function pe(n,o){if(1&n&&(e.TgZ(0,"div",18),e._UZ(1,"lbk-invoice-item-list",19),e._UZ(2,"lbk-grand-total",20),e.ALo(3,"totalPriceInvoice"),e.qZA()),2&n){const t=e.oxw();e.xp6(1),e.Q6J("items",t.invoice.items),e.xp6(1),e.Q6J("grandTotal",e.lcZ(3,2,t.invoice))}}let me=(()=>{class n{constructor(){this.edit=new e.vpe,this.delete=new e.vpe,this.maskAsPaid=new e.vpe}onMaskAsPaid(){"paid"!==this.invoice.status&&this.maskAsPaid.emit()}get isPaid(){return this.invoice.status==C.UY.PAID}}return n.\u0275fac=function(t){return new(t||n)},n.\u0275cmp=e.Xpm({type:n,selectors:[["lbk-invoice-detail"]],inputs:{invoice:"invoice",errorMessage:"errorMessage",pendingMaskAsPaid:"pendingMaskAsPaid",pendingDelete:"pendingDelete"},outputs:{edit:"edit",delete:"delete",maskAsPaid:"maskAsPaid"},decls:19,vars:16,consts:[[1,"space-y-4","md:space-y-6"],[1,"p-6","overflow-hidden","rounded-lg","bg-elements","md:flex","md:justify-between","md:items-center"],[3,"status"],[1,"hidden","md:block",3,"pendingMaskAsPaid","pendingDelete","isPaid","errorMessage","delete","maskAsPaid","edit"],[1,"grid","gap-8","p-6","rounded-lg","shadow-sm","bg-elements","lg:p-12","lg:gap-12"],[1,"flex","flex-col","gap-8","md:flex-row","md:justify-between"],[1,"md:space-y-2"],[3,"value"],[1,"text-muted-900","dark:text-muted-800"],[1,"md:text-left",3,"textRightMedium","address"],[1,"grid","grid-cols-2","gap-11","md:grid-cols-3"],[1,"grid","h-full","place-content-between"],["title","Invoice Date",3,"date"],["title","Payment Due",3,"date"],[3,"clientName","clientAddress"],[1,"hidden","md:block",3,"email"],[1,"md:hidden",3,"email"],["class","overflow-hidden rounded-lg",4,"ngIf"],[1,"overflow-hidden","rounded-lg"],[3,"items"],[3,"grandTotal"]],template:function(t,i){1&t&&(e.TgZ(0,"section",0),e.TgZ(1,"div",1),e._UZ(2,"lbk-invoice-status-detail",2),e.TgZ(3,"lbk-invoice-details-actions",3),e.NdJ("delete",function(){return i.delete.emit()})("maskAsPaid",function(){return i.onMaskAsPaid()})("edit",function(){return i.edit.emit()}),e.qZA(),e.qZA(),e.TgZ(4,"div",4),e.TgZ(5,"div",5),e.TgZ(6,"div",6),e._UZ(7,"lbk-invoice-id",7),e.TgZ(8,"p",8),e._uU(9),e.qZA(),e.qZA(),e._UZ(10,"lbk-address",9),e.qZA(),e.TgZ(11,"div",10),e.TgZ(12,"div",11),e._UZ(13,"lbk-date",12),e._UZ(14,"lbk-date",13),e.qZA(),e._UZ(15,"lbk-bill-to",14),e._UZ(16,"lbk-send-to",15),e.qZA(),e._UZ(17,"lbk-send-to",16),e.YNc(18,pe,4,4,"div",17),e.qZA(),e.qZA()),2&t&&(e.xp6(2),e.Q6J("status",i.invoice.status),e.xp6(1),e.Q6J("pendingMaskAsPaid",i.pendingMaskAsPaid)("pendingDelete",i.pendingDelete)("isPaid",i.isPaid)("errorMessage",i.errorMessage),e.xp6(4),e.Q6J("value",i.invoice.id),e.xp6(2),e.hij(" ",i.invoice.description," "),e.xp6(1),e.Q6J("textRightMedium",!0)("address",i.invoice.senderAddress),e.xp6(3),e.Q6J("date",i.invoice.createdAt),e.xp6(1),e.Q6J("date",i.invoice.paymentDue),e.xp6(1),e.Q6J("clientName",i.invoice.clientName)("clientAddress",i.invoice.clientAddress),e.xp6(1),e.Q6J("email",i.invoice.clientEmail),e.xp6(1),e.Q6J("email",i.invoice.clientEmail),e.xp6(1),e.Q6J("ngIf",i.invoice.items.length>0))},directives:[W,P,ee.l,b,te,ne,ie,d.O5,de,re],pipes:[le.q],encapsulation:2,changeDetection:0}),n})();function ve(n,o){if(1&n){const t=e.EpF();e.TgZ(0,"main"),e.TgZ(1,"div",1),e.TgZ(2,"div",2),e._UZ(3,"lbk-go-back",3),e.TgZ(4,"lbk-invoice-detail",4),e.NdJ("edit",function(){return e.CHM(t),e.oxw().showEditOverlay()})("delete",function(){const r=e.CHM(t).ngIf;return e.oxw().delete(r.id)})("maskAsPaid",function(){const r=e.CHM(t).ngIf;return e.oxw().maskAsPaid(r.id)}),e.ALo(5,"async"),e.ALo(6,"async"),e.ALo(7,"async"),e.qZA(),e.qZA(),e.TgZ(8,"lbk-invoice-details-actions",5),e.NdJ("edit",function(){return e.CHM(t),e.oxw().showEditOverlay()})("delete",function(){const r=e.CHM(t).ngIf;return e.oxw().delete(r.id)})("maskAsPaid",function(){const r=e.CHM(t).ngIf;return e.oxw().maskAsPaid(r.id)}),e.ALo(9,"async"),e.ALo(10,"async"),e.ALo(11,"async"),e.qZA(),e.qZA(),e.TgZ(12,"lbk-edit-overlay",6),e.NdJ("cancel",function(){return e.CHM(t),e.oxw().onEditCancel()})("edit",function(a){return e.CHM(t),e.oxw().edit(a)}),e.ALo(13,"async"),e.ALo(14,"async"),e.qZA(),e.qZA()}if(2&n){const t=o.ngIf,i=e.oxw();e.xp6(4),e.Q6J("invoice",t)("pendingMaskAsPaid",e.lcZ(5,11,i.pendingMaskAsPaid$))("pendingDelete",e.lcZ(6,13,i.pendingDelete$))("errorMessage",e.lcZ(7,15,i.error$)),e.xp6(4),e.Q6J("pendingMaskAsPaid",e.lcZ(9,17,i.pendingMaskAsPaid$))("pendingDelete",e.lcZ(10,19,i.pendingDelete$))("isPaid",i.isPaid(t))("errorMessage",e.lcZ(11,21,i.error$)),e.xp6(4),e.Q6J("invoice",t)("open",e.lcZ(13,23,i.showEditOverlay$))("pendingSaveAndChange",e.lcZ(14,25,i.pendingSaveAndChange$))}}let M=(()=>{class n extends T.fs{constructor(t,i,a){super(),this._store=t,this._dialogService=i,this._title=a}ngOnInit(){this.invoice$=this._store.select(k.Q2),this.showEditOverlay$=this._store.select(J.iQ),this.pendingSaveAndChange$=this._store.select(j),this.pendingMaskAsPaid$=this._store.select(Y),this.pendingDelete$=this._store.select(H),this.appendSub=this.invoice$.subscribe(t=>this._title.setTitle(`Invoices - ${t?t.id:0}`))}onEditCancel(){this._store.dispatch(l.JM.closeAllOverlay())}showEditOverlay(){this._store.dispatch(l.JM.showEditOverlay())}edit({id:t,invoiceDto:i}){this._store.dispatch(p.W.updateInvoice({id:t,invoiceDto:i}))}delete(t){this._dialogService.deleteDialog(t).pipe((0,g.q)(1)).subscribe(i=>{if(i)return this._store.dispatch(p.W.deleteInvoice({id:t}))})}isPaid(t){return t.status===C.UY.PAID}maskAsPaid(t){this._store.dispatch(p.W.maskAsPaid({id:t}))}}return n.\u0275fac=function(t){return new(t||n)(e.Y36(c.yh),e.Y36(u.xA),e.Y36(X.Dx))},n.\u0275cmp=e.Xpm({type:n,selectors:[["lbk-view-invoice-page"]],viewQuery:function(t,i){if(1&t&&e.Gf(I,5),2&t){let a;e.iGM(a=e.CRH())&&(i.editOverLayComponent=a.first)}},features:[e.qOj],decls:2,vars:3,consts:[[4,"ngIf"],[1,"pt-8","md:pt-14","lg:pt-16","lg:grid","lg:place-content-center"],[1,"container","max-w-[730px]","w-full","md:min-w-[730px]","lg:h-full"],["routerLink","/"],[1,"block","mt-8",3,"invoice","pendingMaskAsPaid","pendingDelete","errorMessage","edit","delete","maskAsPaid"],[1,"block","mt-14","md:hidden",3,"pendingMaskAsPaid","pendingDelete","isPaid","errorMessage","edit","delete","maskAsPaid"],[3,"invoice","open","pendingSaveAndChange","cancel","edit"]],template:function(t,i){1&t&&(e.YNc(0,ve,15,27,"main",0),e.ALo(1,"async")),2&t&&e.Q6J("ngIf",e.lcZ(1,1,i.invoice$))},directives:[d.O5,R.H,f.rH,me,P,I],pipes:[d.Ov],encapsulation:2,changeDetection:0}),n})();var ue=s(2584),h=s(9646),m=s(4004),w=s(8505),S=s(3900),ge=s(262);let Ae=(()=>{class n{constructor(t,i,a){this._store=t,this._invoicesService=i,this._router=a}hasInvoiceInStore(t){return this._store.select(k.wY).pipe((0,m.U)(i=>i[t]),(0,w.b)(i=>{i&&this._store.dispatch(p.W.selectInvoice({id:t}))}),(0,m.U)(i=>!!i),(0,g.q)(1))}hasInvoiceInApi(t){return this._invoicesService.pipe((0,S.w)(i=>i.retrieveInvoice(t).pipe((0,m.U)(a=>l.hA.loadInvoice({invoice:a})),(0,w.b)(a=>this._store.dispatch(a)),(0,m.U)(a=>!!a),(0,ge.K)(()=>(this._router.navigate(["/"]),(0,h.of)(!1))))))}hasInvoice(t){return this.hasInvoiceInStore(t).pipe((0,S.w)(i=>i?(0,h.of)(i):this.hasInvoiceInApi(t)))}canActivate(t){return this.hasInvoice(t.params.id)}}return n.\u0275fac=function(t){return new(t||n)(e.LFG(c.yh),e.LFG(ue.no),e.LFG(f.F0))},n.\u0275prov=e.Yz7({token:n,factory:n.\u0275fac,providedIn:"root"}),n})(),U=(()=>{class n{constructor(t){this._dialogService=t}canDeactivate(t){var i;return(null===(i=t.editOverLayComponent)||void 0===i?void 0:i.invoiceForm).touched?this._dialogService.confirmDeactivate():(0,h.of)(!0)}}return n.\u0275fac=function(t){return new(t||n)(e.LFG(u.xA))},n.\u0275prov=e.Yz7({token:n,factory:n.\u0275fac,providedIn:"root"}),n})();var fe=s(9841);const he=[{path:":id",component:M,canActivate:[Ae],canDeactivate:[U,(()=>{class n{canDeactivate(t,i,a){const{pendingDelete$:r,pendingMaskAsPaid$:v,pendingSaveAndChange$:Te}=t;return(0,fe.a)([r,v,Te]).pipe((0,m.U)(([ke,Ce,xe])=>!ke&&!Ce&&!xe))}}return n.\u0275fac=function(t){return new(t||n)},n.\u0275prov=e.Yz7({token:n,factory:n.\u0275fac,providedIn:"root"}),n})()]}];let Ze=(()=>{class n{}return n.\u0275fac=function(t){return new(t||n)},n.\u0275mod=e.oAB({type:n}),n.\u0275inj=e.cJS({providers:[U],imports:[[f.Bz.forChild(he)],f.Bz]}),n})(),_e=(()=>{class n{}return n.\u0275fac=function(t){return new(t||n)},n.\u0275mod=e.oAB({type:n}),n.\u0275inj=e.cJS({imports:[[d.ez,Ze,u.cy,T.Il,_.l,F.a,u.$k,q.U,c.Aw.forFeature({name:y,reducer:V})]]}),n})()}}]);