import {Component, Input, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {LicenseService} from '../../../../../services/product/license.service';

@Component({
  selector: 'app-delete-license',
  templateUrl: './delete-license.component.html',
  styleUrls: ['./delete-license.component.scss']
})
export class DeleteLicenseComponent implements OnInit {

  @Input() id: string;
  @Input() name: string;

  constructor(private licenseService: LicenseService, private modalService: NgbModal) {
  }

  ngOnInit() {
  }

  openCenteredDialog(confirmDeleteTag) {
    this.modalService.open(confirmDeleteTag, {centered: true});
  }

  requestDeleteTag(licenseID) {
    this.licenseService.available(licenseID);
  }

  confirmDelete() {
    this.licenseService.remove();
  }

  cancelDelete() {
    this.licenseService.cancel();
  }
}
