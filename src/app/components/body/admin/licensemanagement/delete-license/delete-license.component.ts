import {Component, Input, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {LicenseService} from '../../../../../services/product/license.service';
import {License} from '../../../../../models/products/license';

@Component({
  selector: 'app-delete-license',
  templateUrl: './delete-license.component.html',
  styleUrls: ['./delete-license.component.scss']
})
export class DeleteLicenseComponent implements OnInit {

  @Input() private license: License;

  constructor(private licenseService: LicenseService, private modalService: NgbModal) {
  }

  ngOnInit() {
  }

  openCenteredDialog(confirmDeleteTag) {
    this.modalService.open(confirmDeleteTag, {centered: true});
  }

  confirmDelete() {
    this.licenseService.confirmDelete(this.license);
  }
}
