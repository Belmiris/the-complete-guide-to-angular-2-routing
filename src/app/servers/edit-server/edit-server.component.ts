import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { ServersService } from '../servers.service';
import { CanComponentDeactivate } from './can-deactivate-guard.service';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit, CanComponentDeactivate {
  server: {id: number, name: string, status: string};
  serverName = '';
  serverStatus = '';
  allowEdit:Boolean = false;
  changesSaved:Boolean = false;

  constructor(private serversService: ServersService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    // Not reactive. If url changes while component is active, the change
    // will not he reponded to.
    //console.log(this.route.snapshot.queryParams);
    //console.log(this.route.snapshot.fragment);
    
    // To keep track of changes, subscribe to the observable properties
    // of the ActivatedRoute object. NOTE we did not add functions to react 
    // to changes here.
    //this.route.queryParams;
    //this.route.fragment.subscribe();

    const id = +this.route.snapshot.params['id'];
    this.server = this.serversService.getServer(id);
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;
    this.allowEdit = this.route.snapshot.queryParams['allowEdit'];
    
    this.route.params
      .subscribe(
        (params: Params) => {
          this.server = this.serversService.getServer(+params['id']);
          this.serverName = this.server.name;
          this.serverStatus = this.server.status;
        }
      );
      this.route.queryParams
      .subscribe(
        (params: Params) => {
          this.allowEdit = params['allowEdit'] === '1' ? true : false;
        }
      );
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {name: this.serverName, status: this.serverStatus});
    this.changesSaved = true;
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  canDeactivate() : Observable<boolean> | Promise<boolean> | boolean {
    if (!this.allowEdit) {
      return true;
    }

    if ((this.serverName !== this.server.name || this.serverStatus != this.server.status) && !this.changesSaved) {
      return confirm('Do you want to discard the changes?');
    } else {
      return true;
    }
  }
}
