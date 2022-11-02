import { Directive, ElementRef, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[permission]'
})
export class PermissionDirective {
  private permissions = [];  

  constructor(
    private element: ElementRef,
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {
    this.permissions = JSON.parse(localStorage.getItem('permissions'));
  }

  @Input()
  set permission(val) {
    if(this.permissions.find(permission=>val==permission.name)) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }
}
