"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[427],{3427:(Ln,C,c)=>{c.r(C),c.d(C,{InvoicesPreviewModule:()=>Un});var a=c(9808),b=c(2265),x=c(6674),T=c(3708),A=c(7729),d=c(8798),l=c(5620),n=c(5e3);function F(e,r){1&e&&n._UZ(0,"div",2),2&e&&n.Q6J("ngStyle",r.$implicit)}let L=(()=>{class e{constructor(){this.size=60,this.animationDuration=1500,this.color="#fff",this.ringsNum=9,this.containerPadding=2}get outerRingSize(){return this.size-2*this.containerPadding}get spinnerStyle(){return{height:`${this.size}px`,width:`${this.size}px`,padding:`${this.containerPadding}px`}}get ringStyle(){return{borderTopColor:this.color,animationDuration:`${this.animationDuration}ms`}}get ringsStyles(){const t=[],i=this.outerRingSize/this.ringsNum,o=i;for(let s=1;s<=this.ringsNum;s++)t.push(Object.assign({},this.ringStyle,{animationDelay:50*s+"ms",height:`${i+(s+1)*o}px`,width:`${i+(s+1)*o}px`}));return t}ngOnInit(){}}return e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=n.Xpm({type:e,selectors:[["app-fingerprint-spinner"]],inputs:{size:"size",animationDuration:"animationDuration",color:"color"},decls:2,vars:2,consts:[[1,"fingerprint-spinner",3,"ngStyle"],["class","spinner-ring",3,"ngStyle",4,"ngFor","ngForOf"],[1,"spinner-ring",3,"ngStyle"]],template:function(t,i){1&t&&(n.TgZ(0,"div",0),n.YNc(1,F,1,1,"div",1),n.qZA()),2&t&&(n.Q6J("ngStyle",i.spinnerStyle),n.xp6(1),n.Q6J("ngForOf",i.ringsStyles))},directives:[a.PC,a.sg],styles:[".fingerprint-spinner[_ngcontent-%COMP%], .fingerprint-spinner[_ngcontent-%COMP%]   *[_ngcontent-%COMP%]{box-sizing:border-box}.fingerprint-spinner[_ngcontent-%COMP%]{height:64px;width:64px;padding:2px;overflow:hidden;position:relative}.fingerprint-spinner[_ngcontent-%COMP%]   .spinner-ring[_ngcontent-%COMP%]{position:absolute;border-radius:50%;border:2px solid transparent;border-top-color:#ff1d5e;-webkit-animation:1.5s cubic-bezier(.68,-.75,.265,1.75) infinite forwards fingerprint-spinner-animation;animation:1.5s cubic-bezier(.68,-.75,.265,1.75) infinite forwards fingerprint-spinner-animation;margin:auto;bottom:0;left:0;right:0;top:0}.fingerprint-spinner[_ngcontent-%COMP%]   .spinner-ring[_ngcontent-%COMP%]:nth-child(1){height:calc(60px / 9 + 0 * 60px / 9);width:calc(60px / 9 + 0 * 60px / 9);-webkit-animation-delay:calc(50ms * 1);animation-delay:calc(50ms * 1)}.fingerprint-spinner[_ngcontent-%COMP%]   .spinner-ring[_ngcontent-%COMP%]:nth-child(2){height:calc(60px / 9 + 1 * 60px / 9);width:calc(60px / 9 + 1 * 60px / 9);-webkit-animation-delay:calc(50ms * 2);animation-delay:calc(50ms * 2)}.fingerprint-spinner[_ngcontent-%COMP%]   .spinner-ring[_ngcontent-%COMP%]:nth-child(3){height:calc(60px / 9 + 2 * 60px / 9);width:calc(60px / 9 + 2 * 60px / 9);-webkit-animation-delay:calc(50ms * 3);animation-delay:calc(50ms * 3)}.fingerprint-spinner[_ngcontent-%COMP%]   .spinner-ring[_ngcontent-%COMP%]:nth-child(4){height:calc(60px / 9 + 3 * 60px / 9);width:calc(60px / 9 + 3 * 60px / 9);-webkit-animation-delay:calc(50ms * 4);animation-delay:calc(50ms * 4)}.fingerprint-spinner[_ngcontent-%COMP%]   .spinner-ring[_ngcontent-%COMP%]:nth-child(5){height:calc(60px / 9 + 4 * 60px / 9);width:calc(60px / 9 + 4 * 60px / 9);-webkit-animation-delay:calc(50ms * 5);animation-delay:calc(50ms * 5)}.fingerprint-spinner[_ngcontent-%COMP%]   .spinner-ring[_ngcontent-%COMP%]:nth-child(6){height:calc(60px / 9 + 5 * 60px / 9);width:calc(60px / 9 + 5 * 60px / 9);-webkit-animation-delay:calc(50ms * 6);animation-delay:calc(50ms * 6)}.fingerprint-spinner[_ngcontent-%COMP%]   .spinner-ring[_ngcontent-%COMP%]:nth-child(7){height:calc(60px / 9 + 6 * 60px / 9);width:calc(60px / 9 + 6 * 60px / 9);-webkit-animation-delay:calc(50ms * 7);animation-delay:calc(50ms * 7)}.fingerprint-spinner[_ngcontent-%COMP%]   .spinner-ring[_ngcontent-%COMP%]:nth-child(8){height:calc(60px / 9 + 7 * 60px / 9);width:calc(60px / 9 + 7 * 60px / 9);-webkit-animation-delay:calc(50ms * 8);animation-delay:calc(50ms * 8)}.fingerprint-spinner[_ngcontent-%COMP%]   .spinner-ring[_ngcontent-%COMP%]:nth-child(9){height:calc(60px / 9 + 8 * 60px / 9);width:calc(60px / 9 + 8 * 60px / 9);-webkit-animation-delay:calc(50ms * 9);animation-delay:calc(50ms * 9)}@-webkit-keyframes fingerprint-spinner-animation{100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@keyframes fingerprint-spinner-animation{100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}"]}),e})(),H=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=n.oAB({type:e}),e.\u0275inj=n.cJS({providers:[],imports:[[a.ez]]}),e})();var p=c(5083),_=c(591),W=c(5638),y=c(3044),m=c(5698),h=c(8595),G=c(1305),E=c(6254),V=c(2633);let K=(()=>{class e{constructor(){this.create=new n.vpe,this.discard=new n.vpe,this.saveAsDraft=new n.vpe}get disabled(){return this.pendingCreate||this.pendingSaveAsDraft}}return e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=n.Xpm({type:e,selectors:[["lbk-new-invoice-actions"]],inputs:{pendingSaveAsDraft:"pendingSaveAsDraft",pendingCreate:"pendingCreate"},outputs:{create:"create",discard:"discard",saveAsDraft:"saveAsDraft"},decls:8,vars:5,consts:[[1,"flex","flex-wrap","gap-2","items-center","justify-end","sm:justify-between"],[1,"btn","btn-basic","dark:bg-[#F9FAFE]","dark:text-muted-700",3,"disabled","click"],[1,"flex","gap-2"],[1,"btn","btn-dark",3,"disabled","click"],["text","Save as Draft",3,"pending"],[1,"btn","btn-primary",3,"disabled","click"],["text","Save & Send",3,"pending"]],template:function(t,i){1&t&&(n.TgZ(0,"div",0),n.TgZ(1,"button",1),n.NdJ("click",function(){return i.discard.emit()}),n._uU(2," Discard "),n.qZA(),n.TgZ(3,"div",2),n.TgZ(4,"button",3),n.NdJ("click",function(){return i.saveAsDraft.emit()}),n._UZ(5,"lbk-button-spinner",4),n.qZA(),n.TgZ(6,"button",5),n.NdJ("click",function(){return i.create.emit()}),n._UZ(7,"lbk-button-spinner",6),n.qZA(),n.qZA(),n.qZA()),2&t&&(n.xp6(1),n.Q6J("disabled",i.disabled),n.xp6(3),n.Q6J("disabled",i.disabled),n.xp6(1),n.Q6J("pending",i.pendingSaveAsDraft),n.xp6(1),n.Q6J("disabled",i.disabled),n.xp6(1),n.Q6J("pending",i.pendingCreate))},directives:[V.r],encapsulation:2,changeDetection:0}),e})(),k=(()=>{class e{constructor(t){this._dialogService=t,this.discard=new n.vpe,this.saveAsDraft=new n.vpe,this.create=new n.vpe}get invalid(){return this.invoiceForm.invalid}onDiscard(){if(!this.pendingCreate&&!this.pendingSaveAsDraft){if(this.invoiceForm.dirty)return void this._dialogService.confirmDeactivate().pipe((0,m.q)(1)).subscribe(t=>{t&&(this.discard.emit(),this.invoiceFormComponent.initForm(!0))});this.discard.emit(),this.invoiceFormComponent.initForm(!0)}}get invoiceForm(){return this.invoiceFormComponent.invoiceForm}onCreate(){this.invoiceForm.markAllAsTouched(),this.invoiceForm.invalid?this._dialogService.formInvalid().pipe((0,m.q)(1)).subscribe():(this.create.emit(this.invoiceFormComponent.createInvoiceDto(h.UY.PENDING)),this.invoiceFormComponent.initForm(!0))}onSaveAsDraft(){this.invoiceForm.markAllAsTouched(),this.invoiceForm.invalid?this._dialogService.formInvalid().pipe((0,m.q)(1)).subscribe():(this.create.emit(this.invoiceFormComponent.createInvoiceDto(h.UY.DRAFT)),this.invoiceFormComponent.initForm(!0))}}return e.\u0275fac=function(t){return new(t||e)(n.Y36(b.xA))},e.\u0275cmp=n.Xpm({type:e,selectors:[["lbk-new-invoice-overlay"]],viewQuery:function(t,i){if(1&t&&n.Gf(x.e,7),2&t){let o;n.iGM(o=n.CRH())&&(i.invoiceFormComponent=o.first)}},inputs:{open:"open",pendingSaveAsDraft:"pendingSaveAsDraft",pendingCreate:"pendingCreate",loggedIn:"loggedIn"},outputs:{discard:"discard",saveAsDraft:"saveAsDraft",create:"create"},decls:3,vars:3,consts:[[3,"open","closed"],[1,"panel"],[1,"actions",3,"pendingSaveAsDraft","pendingCreate","discard","create","saveAsDraft"]],template:function(t,i){1&t&&(n.TgZ(0,"lbk-overlay",0),n.NdJ("closed",function(){return i.onDiscard()}),n._UZ(1,"lbk-invoice-form",1),n.TgZ(2,"lbk-new-invoice-actions",2),n.NdJ("discard",function(){return i.onDiscard()})("create",function(){return i.onCreate()})("saveAsDraft",function(){return i.onSaveAsDraft()}),n.qZA(),n.qZA()),2&t&&(n.Q6J("open",i.open),n.xp6(2),n.Q6J("pendingSaveAsDraft",i.pendingSaveAsDraft)("pendingCreate",i.pendingCreate))},directives:[G.B,E.e,K],encapsulation:2,changeDetection:0}),e})();const M="newInvoice",v={error:null,pendingSaveAsDraft:!1,pendingCreate:!1,loadingInvoices:!1,loaded:!1},nn=(0,l.Lq)(v,(0,l.on)(p.uQ.logout,e=>v),(0,l.on)(p.v6.createInvoice,(e,{invoiceDto:r})=>Object.assign(Object.assign({},e),{error:null,pendingCreate:r.status===h.UY.PENDING,pendingSaveAsDraft:r.status===h.UY.DRAFT,loadingInvoices:!1})),(0,l.on)(p.dV.createInvoiceSuccess,e=>v),(0,l.on)(p.dV.createInvoiceFailure,(e,{error:r})=>Object.assign(Object.assign({},e),{error:r,pendingCreate:!1,pendingSaveAsDraft:!1})),(0,l.on)(p.Ti.loginSuccess,e=>Object.assign(Object.assign({},e),{loadingInvoices:!0})),(0,l.on)(p.dV.loadInvoicesSuccess,e=>Object.assign(Object.assign({},e),{loadingInvoices:!1}))),g=(0,l.ZF)(M),sn=((0,l.P1)(g,e=>e.error),(0,l.P1)(g,e=>e.pendingSaveAsDraft)),cn=(0,l.P1)(g,e=>e.pendingCreate),ln=(0,l.P1)(g,e=>e.pendingCreate),pn=(0,l.P1)(g,e=>e.loaded);var dn=c(2313);let mn=(()=>{class e{get noInvoices(){return 0===this.total}get statusFormatted(){return 0===this.searchStatus.length?"":this.searchStatus.join(", ")+"."}}return e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=n.Xpm({type:e,selectors:[["lbk-total-invoices"]],inputs:{total:"total",searchStatus:"searchStatus"},decls:10,vars:4,consts:[[1,"text-2xl","md:text-3xl"],[1,"text-muted-700","dark:text-muted-800"],[3,"hidden"],[1,"hidden","md:inline"]],template:function(t,i){1&t&&(n.TgZ(0,"div"),n.TgZ(1,"h1",0),n._uU(2,"Invoices"),n.qZA(),n.TgZ(3,"div",1),n.TgZ(4,"p",2),n._uU(5,"No invoices"),n.qZA(),n.TgZ(6,"p",2),n.TgZ(7,"span",3),n._uU(8,"There are "),n.qZA(),n._uU(9),n.qZA(),n.qZA(),n.qZA()),2&t&&(n.xp6(4),n.Q6J("hidden",!i.noInvoices),n.xp6(2),n.Q6J("hidden",i.noInvoices),n.xp6(3),n.AsE("",i.total," invoices ",i.statusFormatted," "))},encapsulation:2,changeDetection:0}),e})();var gn=c(4968);const un=[[["button"]],[["ul"]]],fn=["button","ul"];let hn=(()=>{class e{constructor(t,i){this._cd=t,this.zone=i,this.active=!1,this.activeChange=new n.vpe,this.click$=(0,gn.R)(document,"click")}ngOnDestroy(){this.subscription.unsubscribe()}onClick(){this.activeChange.emit(!this.active)}ngOnInit(){this.subscription=this.click$.subscribe(t=>{this.zone.runOutsideAngular(()=>{t.target.closest("lbk-dropdown")||this.zone.run(()=>{this.activeChange.emit(!1),this._cd.markForCheck()})})})}}return e.\u0275fac=function(t){return new(t||e)(n.Y36(n.sBO),n.Y36(n.R0b))},e.\u0275cmp=n.Xpm({type:e,selectors:[["lbk-dropdown"]],inputs:{active:"active"},outputs:{activeChange:"activeChange"},ngContentSelectors:fn,decls:5,vars:2,consts:[[1,"dropdown"],["type","button",3,"click"],[1,"dropdown-items"]],template:function(t,i){1&t&&(n.F$t(un),n.TgZ(0,"div",0),n.TgZ(1,"button",1),n.NdJ("click",function(){return i.onClick()}),n.Hsn(2),n.qZA(),n.TgZ(3,"div",2),n.Hsn(4,1),n.qZA(),n.qZA()),2&t&&(n.xp6(3),n.ekj("active",i.active))},styles:[".dropdown[_ngcontent-%COMP%]{position:relative}.dropdown[_ngcontent-%COMP%]   .dropdown-items[_ngcontent-%COMP%]{position:absolute;opacity:0;transition:opacity .15s ease-in-out,transform .15s ease-in-out;pointer-events:none;left:50%;top:calc(100% + 5px);transform:translate(-50%)}.dropdown[_ngcontent-%COMP%]   .dropdown-items.active[_ngcontent-%COMP%]{opacity:1;pointer-events:auto;z-index:9999;transform:translate(-50%,5px)}"],changeDetection:0}),e})(),bn=(()=>{class e{constructor(){this.checkedChange=new n.vpe}onClick(){this.checked=!this.checked,this.checkedChange.emit({checked:this.checked,label:this.label})}}return e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=n.Xpm({type:e,selectors:[["lbk-check-box"]],inputs:{label:"label",checked:"checked"},outputs:{checkedChange:"checkedChange"},decls:5,vars:6,consts:[[1,"flex","items-center","group"],["type","checkbox",1,"h-4","w-4","rounded-sm","border","text-primary-900","border-muted-900","mr-2","cursor-pointer","checked:text-primary-900","checked:bg-primary-900","focus:ring-0",3,"id","checked","click"],[1,"inline-block","cursor-pointer",3,"for"]],template:function(t,i){1&t&&(n.TgZ(0,"div",0),n.TgZ(1,"input",1),n.NdJ("click",function(){return i.onClick()}),n.qZA(),n.TgZ(2,"label",2),n._uU(3),n.ALo(4,"titlecase"),n.qZA(),n.qZA()),2&t&&(n.xp6(1),n.Q6J("id",i.label)("checked",i.checked),n.xp6(1),n.Q6J("for",i.label),n.xp6(1),n.hij(" ",n.lcZ(4,4,i.label)," "))},pipes:[a.rS],encapsulation:2}),e})(),yn=(()=>{class e{constructor(){this.filter=new n.vpe,this.dropDownActive=!1}onCheckedChange({checked:t,label:i}){this.filter.emit({checked:t,status:i})}get status(){return 0===this.searchStatus.length?"status":this.searchStatus.join(", ")}}return e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=n.Xpm({type:e,selectors:[["lbk-filter"]],inputs:{searchStatus:"searchStatus"},outputs:{filter:"filter"},decls:11,vars:4,consts:[[3,"active","activeChange"],[1,"flex","items-center","gap-3","button"],[1,"font-bold"],[1,"hidden","md:inline"],["src","assets/icon-arrow-down.svg","alt","Arrow down",1,"duration-300"],[1,"inline-grid","gap-4","p-6","bg-fill","rounded-md","shadow-lg","min-w-[192px]"],["label","paid",3,"checkedChange"],["label","pending",3,"checkedChange"],["label","draft",3,"checkedChange"]],template:function(t,i){1&t&&(n.TgZ(0,"lbk-dropdown",0),n.NdJ("activeChange",function(s){return i.dropDownActive=s}),n.TgZ(1,"button",1),n.TgZ(2,"h5",2),n._uU(3," Filter "),n.TgZ(4,"span",3),n._uU(5),n.qZA(),n.qZA(),n._UZ(6,"img",4),n.qZA(),n.TgZ(7,"ul",5),n.TgZ(8,"lbk-check-box",6),n.NdJ("checkedChange",function(s){return i.onCheckedChange(s)}),n.qZA(),n.TgZ(9,"lbk-check-box",7),n.NdJ("checkedChange",function(s){return i.onCheckedChange(s)}),n.qZA(),n.TgZ(10,"lbk-check-box",8),n.NdJ("checkedChange",function(s){return i.onCheckedChange(s)}),n.qZA(),n.qZA(),n.qZA()),2&t&&(n.Q6J("active",i.dropDownActive),n.xp6(5),n.hij("by ",i.status,""),n.xp6(1),n.ekj("rotate-180",i.dropDownActive))},directives:[hn,bn],encapsulation:2,changeDetection:0}),e})(),vn=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=n.Xpm({type:e,selectors:[["lbk-new-invoice"]],decls:7,vars:0,consts:[["data-cy","new-invoice-button",1,"bg-primary-900","rounded-full","flex","items-center","gap-2","p-[6px]","md:gap-4","group"],[1,"w-8","h-8","bg-white","rounded-full","grid","place-content-center","group-hover:animate-spin"],[1,"fas","fa-plus","text-primary-900"],[1,"text-white","mr-2","md:mr-4"],[1,"hidden","md:inline"]],template:function(t,i){1&t&&(n.TgZ(0,"button",0),n.TgZ(1,"div",1),n._UZ(2,"span",2),n.qZA(),n.TgZ(3,"h5",3),n._uU(4,"New "),n.TgZ(5,"span",4),n._uU(6,"Invoice"),n.qZA(),n.qZA(),n.qZA())},encapsulation:2,changeDetection:0}),e})(),Sn=(()=>{class e{constructor(){this.filter=new n.vpe,this.newInvoice=new n.vpe}}return e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=n.Xpm({type:e,selectors:[["lbk-invoices-preview-header"]],inputs:{total:"total",searchStatus:"searchStatus"},outputs:{filter:"filter",newInvoice:"newInvoice"},decls:5,vars:3,consts:[[1,"flex","items-center","justify-between"],[3,"searchStatus","total"],[1,"flex","items-center","gap-[18px]","md:gap-10"],[3,"searchStatus","filter"],[3,"click"]],template:function(t,i){1&t&&(n.TgZ(0,"nav",0),n._UZ(1,"lbk-total-invoices",1),n.TgZ(2,"div",2),n.TgZ(3,"lbk-filter",3),n.NdJ("filter",function(s){return i.filter.emit(s)}),n.qZA(),n.TgZ(4,"lbk-new-invoice",4),n.NdJ("click",function(){return i.newInvoice.emit()}),n.qZA(),n.qZA(),n.qZA()),2&t&&(n.xp6(1),n.Q6J("searchStatus",i.searchStatus)("total",i.total),n.xp6(2),n.Q6J("searchStatus",i.searchStatus))},directives:[mn,yn,vn],encapsulation:2,changeDetection:0}),e})();var P=c(2593),S=c(4997);let wn=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=n.Xpm({type:e,selectors:[["lbk-client-name"]],inputs:{clientName:"clientName"},decls:2,vars:1,consts:[[1,"text-muted-900"]],template:function(t,i){1&t&&(n.TgZ(0,"p",0),n._uU(1),n.qZA()),2&t&&(n.xp6(1),n.Oqu(i.clientName))},encapsulation:2,changeDetection:0}),e})(),Cn=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=n.Xpm({type:e,selectors:[["lbk-payment-due"]],inputs:{paymentDue:"paymentDue"},decls:3,vars:4,consts:[[1,"text-muted-800"]],template:function(t,i){1&t&&(n.TgZ(0,"p",0),n._uU(1),n.ALo(2,"date"),n.qZA()),2&t&&(n.xp6(1),n.hij("Due ",n.xi3(2,1,i.paymentDue,"dd-MMM-yyyy"),""))},pipes:[a.uU],encapsulation:2,changeDetection:0}),e})();var xn=c(7918),_n=c(7098),kn=c(9436);const Mn=function(e){return["/invoice",e]};let Pn=(()=>{class e{constructor(){this.priceOptions={size:"text-lg"}}get id(){return this.invoice.id}}return e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=n.Xpm({type:e,selectors:[["lbk-invoice-preview"]],inputs:{invoice:"invoice"},decls:17,vars:17,consts:[["matRipple","",1,"grid","grid-cols-2","gap-6","p-6","duration-700","border-2","border-transparent","rounded-lg","shadow-md","bg-elements","group","hover:border-2","hover:border-primary-900","md:grid-cols-5","md:place-items-center","md:justify-items-start","md:py-4","md:pr-14",3,"routerLink"],[1,"md:text-lg","md:order-first"],[1,"text-muted-800"],[1,"font-bold"],[1,"place-self-end","md:place-self-auto","md:order-2",3,"clientName"],[1,"space-y-2","md:space-y-0","md:order-1"],[1,"block",3,"paymentDue"],[1,"block","mt-2","md:hidden",3,"options","value"],[1,"hidden","md:block","md:order-9",3,"options","value"],[1,"place-self-end","md:place-self-auto","md:order-last","md:flex","md:items-center","md:gap-5"],[3,"status"],["src","assets/icon-arrow-right.svg","alt","Arrow Right",1,"hidden","min-w-[6px]","duration-300","md:block","group-hover:translate-x-1"]],template:function(t,i){1&t&&(n.TgZ(0,"a",0),n.TgZ(1,"p",1),n.TgZ(2,"span",2),n._uU(3,"#"),n.qZA(),n.TgZ(4,"span",3),n._uU(5),n.ALo(6,"number"),n.qZA(),n.qZA(),n._UZ(7,"lbk-client-name",4),n.TgZ(8,"div",5),n._UZ(9,"lbk-payment-due",6),n._UZ(10,"lbk-price",7),n.ALo(11,"totalPriceInvoice"),n.qZA(),n._UZ(12,"lbk-price",8),n.ALo(13,"totalPriceInvoice"),n.TgZ(14,"div",9),n._UZ(15,"lbk-invoice-status",10),n._UZ(16,"img",11),n.qZA(),n.qZA()),2&t&&(n.Q6J("routerLink",n.VKq(15,Mn,i.id)),n.xp6(5),n.hij(" ",n.lcZ(6,9,i.invoice.id)," "),n.xp6(2),n.Q6J("clientName",i.invoice.clientName),n.xp6(2),n.Q6J("paymentDue",i.invoice.paymentDue),n.xp6(1),n.Q6J("options",i.priceOptions)("value",n.lcZ(11,11,i.invoice)),n.xp6(2),n.Q6J("options",i.priceOptions)("value",n.lcZ(13,13,i.invoice)),n.xp6(3),n.Q6J("status",i.invoice.status))},directives:[S.yS,wn,Cn,xn.C,_n.u],pipes:[a.JJ,kn.q],encapsulation:2,changeDetection:0}),e})();function On(e,r){if(1&e&&(n.ynx(0),n._UZ(1,"lbk-invoice-preview",2),n.BQk()),2&e){const t=r.$implicit;n.xp6(1),n.Q6J("@slideInLeftOnEnter",void 0)("@fadeOutRightOnLeave",void 0)("invoice",t)}}let Dn=(()=>{class e{identifyInvoice(t,i){return i.id}}return e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=n.Xpm({type:e,selectors:[["lbk-invoice-preview-list"]],inputs:{invoices:"invoices"},decls:2,vars:3,consts:[[1,"grid","gap-4"],[4,"ngFor","ngForOf","ngForTrackBy"],[3,"invoice"]],template:function(t,i){1&t&&(n.TgZ(0,"div",0),n.YNc(1,On,2,3,"ng-container",1),n.qZA()),2&t&&(n.Q6J("@listIn",void 0),n.xp6(1),n.Q6J("ngForOf",i.invoices)("ngForTrackBy",i.identifyInvoice))},directives:[a.sg,Pn],encapsulation:2,data:{animation:[(0,d.i0)({staggerDuration:80,duration:200}),(0,P.rm)({delay:300}),(0,P.i1)({delay:200})]},changeDetection:0}),e})(),Zn=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=n.Xpm({type:e,selectors:[["lbk-no-invoices"]],decls:11,vars:0,consts:[[1,"grid","place-content-center"],["src","assets/illustration-empty.svg","alt","Empty"],[1,"text-center","mt-10"],[1,"text-muted-900","mt-6"]],template:function(t,i){1&t&&(n.TgZ(0,"div",0),n._UZ(1,"img",1),n.TgZ(2,"div",2),n.TgZ(3,"h2"),n._uU(4,"There is nothing here"),n.qZA(),n.TgZ(5,"p",3),n._uU(6," Create on invoice by clicking the "),n._UZ(7,"br"),n.TgZ(8,"strong"),n._uU(9,"New "),n.qZA(),n._uU(10,"button and get started "),n.qZA(),n.qZA(),n.qZA())},encapsulation:2,changeDetection:0}),e})(),zn=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=n.Xpm({type:e,selectors:[["lbk-invoices-preview-page-loading"]],decls:2,vars:3,consts:[[1,"fixed","inset-0","grid","w-full","h-full","bg-white/90","place-content-center","duration-300","z-50"],[3,"animationDuration","size","color"]],template:function(t,i){1&t&&(n.TgZ(0,"div",0),n._UZ(1,"app-fingerprint-spinner",1),n.qZA()),2&t&&(n.xp6(1),n.Q6J("animationDuration",1500)("size",100)("color","hsl(252, 94%, 67%)"))},directives:[L],encapsulation:2,changeDetection:0}),e})();function qn(e,r){if(1&e&&n._UZ(0,"lbk-invoice-preview-list",7),2&e){const t=n.oxw().ngIf;n.Q6J("invoices",t)}}function Tn(e,r){1&e&&n._UZ(0,"lbk-no-invoices",8)}function An(e,r){if(1&e&&(n.ynx(0),n.YNc(1,qn,1,1,"lbk-invoice-preview-list",5),n.YNc(2,Tn,1,0,"ng-template",null,6,n.W1O),n.BQk()),2&e){const t=r.ngIf,i=n.MAs(3);n.xp6(1),n.Q6J("ngIf",t.length>0)("ngIfElse",i)}}function $n(e,r){1&e&&n._UZ(0,"lbk-invoices-preview-page-loading")}let O=(()=>{class e extends d.fs{constructor(t,i){super(),this._store=t,this._title=i}ngOnInit(){this.invoices$=this._store.select(y.dP),this.loggedIn$=this._store.select(_.gs),this.totalInvoices$=this._store.select(y.z),this.searchStatus$=this._store.select(y.F1),this.loaded$=this._store.select(pn),this.showNewInvoiceOverlay$=this._store.select(W.V9),this.pendingSaveAsDraft$=this._store.select(sn),this.pendingCreate$=this._store.select(cn),this.loadingInvoices$=this._store.select(ln),this.loaded$.pipe((0,m.q)(1)).subscribe(t=>{t||this._store.dispatch(p.v6.enter())}),this.appendSub=this.totalInvoices$.subscribe(t=>{if(0===t)return this._title.setTitle("Invoices");this._title.setTitle(`Invoices - ${t} invoices`)})}filter(t){this._store.dispatch(p.v6.filter({filterDto:t}))}newInvoice(){this._store.dispatch(p.JM.showNewInvoiceOverlay())}discard(){this._store.dispatch(p.JM.closeAllOverlay())}create(t){this._store.dispatch(p.v6.createInvoice({invoiceDto:t}))}}return e.\u0275fac=function(t){return new(t||e)(n.Y36(l.yh),n.Y36(dn.Dx))},e.\u0275cmp=n.Xpm({type:e,selectors:[["lbk-invoice-preview-page"]],viewQuery:function(t,i){if(1&t&&n.Gf(k,5),2&t){let o;n.iGM(o=n.CRH())&&(i.newInvoiceOverlayComponent=o.first)}},features:[n.qOj],decls:14,vars:24,consts:[[1,"pt-8","md:pt-14","lg:pt-[72px]","lg:grid","lg:place-content-center"],[1,"container","max-w-[730px]","lg:h-full","lg:min-w-[730px]"],[3,"searchStatus","total","filter","newInvoice"],[4,"ngIf"],[3,"open","pendingSaveAsDraft","pendingCreate","loggedIn","create","saveAsDraft","discard"],["class","block mt-8 md:mt-14 lg:mt-16",3,"invoices",4,"ngIf","ngIfElse"],["noInvoices",""],[1,"block","mt-8","md:mt-14","lg:mt-16",3,"invoices"],[1,"block","mt-[102px]","lg:mt-36"]],template:function(t,i){1&t&&(n.TgZ(0,"main",0),n.TgZ(1,"div",1),n.TgZ(2,"lbk-invoices-preview-header",2),n.NdJ("filter",function(s){return i.filter(s)})("newInvoice",function(){return i.newInvoice()}),n.ALo(3,"async"),n.ALo(4,"async"),n.qZA(),n.YNc(5,An,4,2,"ng-container",3),n.ALo(6,"async"),n.qZA(),n.qZA(),n.TgZ(7,"lbk-new-invoice-overlay",4),n.NdJ("create",function(s){return i.create(s)})("saveAsDraft",function(s){return i.create(s)})("discard",function(){return i.discard()}),n.ALo(8,"async"),n.ALo(9,"async"),n.ALo(10,"async"),n.ALo(11,"async"),n.qZA(),n.YNc(12,$n,1,0,"lbk-invoices-preview-page-loading",3),n.ALo(13,"async")),2&t&&(n.xp6(2),n.Q6J("searchStatus",n.lcZ(3,8,i.searchStatus$))("total",n.lcZ(4,10,i.totalInvoices$)),n.xp6(3),n.Q6J("ngIf",n.lcZ(6,12,i.invoices$)),n.xp6(2),n.Q6J("open",n.lcZ(8,14,i.showNewInvoiceOverlay$))("pendingSaveAsDraft",n.lcZ(9,16,i.pendingSaveAsDraft$))("pendingCreate",n.lcZ(10,18,i.pendingCreate$))("loggedIn",n.lcZ(11,20,i.loggedIn$)),n.xp6(5),n.Q6J("ngIf",n.lcZ(13,22,i.loadingInvoices$)))},directives:[Sn,a.O5,k,Dn,Zn,zn],pipes:[a.Ov],encapsulation:2,changeDetection:0}),e})();var In=c(9841),w=c(4004);let Fn=(()=>{class e{canDeactivate(t,i,o){return(0,In.a)([t.pendingSaveAsDraft$,t.pendingCreate$]).pipe((0,w.U)(([s,u])=>!s&&!u))}}return e.\u0275fac=function(t){return new(t||e)},e.\u0275prov=n.Yz7({token:e,factory:e.\u0275fac,providedIn:"root"}),e})();var Jn=c(6715),D=c(2372),Nn=c(6129),Qn=c(3900),Xn=c(8505),Z=c(9646),Rn=c(262);const Bn=[{path:"",component:O,canDeactivate:[Fn],canActivate:[(()=>{class e{constructor(t,i,o){this._store=t,this._authService=i,this._tokenService=o}getAccessToken(){return this._tokenService.getToken().pipe((0,w.U)(t=>{if(!t)throw Error("Token not found");return t.accessToken}))}canActivate(t,i){return this._store.select(_.gs).pipe((0,m.q)(1),(0,Nn.z)(o=>o?(0,Z.of)(!0):this.getAccessToken().pipe((0,Qn.w)(s=>this._authService.me(s)),(0,Xn.b)(s=>{s&&this._store.dispatch((0,Jn.loginSuccess)({user:s}))}),(0,w.U)(s=>!!s))),(0,Rn.K)(()=>(0,Z.of)(!0)))}}return e.\u0275fac=function(t){return new(t||e)(n.LFG(l.yh),n.LFG(D.e8),n.LFG(D.Br))},e.\u0275prov=n.Yz7({token:e,factory:e.\u0275fac,providedIn:"root"}),e})()]}];let Yn=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=n.oAB({type:e}),e.\u0275inj=n.cJS({imports:[[S.Bz.forChild(Bn)],S.Bz]}),e})(),Un=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=n.oAB({type:e}),e.\u0275inj=n.cJS({imports:[[a.ez,Yn,d.kW,b.$k,b.cy,d.Il,H,T.a,x.l,A.U,d.nD,l.Aw.forFeature({name:M,reducer:nn})]]}),e})()}}]);