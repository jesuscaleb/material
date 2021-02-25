import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthService } from "@core/services";

@Directive({
  selector: '[hasPermission]'
})
export class HasPermissionDirective {

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private authService: AuthService
  ) { }

  @Input() set hasPermission(permissionType: any) {
    if (this.authService.hasPermission(permissionType)) {
      // Add template to DOM
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      // Remove template from DOM
      this.viewContainer.clear();
    }
  }

}
