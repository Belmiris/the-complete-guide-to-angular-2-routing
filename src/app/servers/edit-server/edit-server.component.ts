import { Component, OnInit } from '@angular/core';

import { ServersService } from '../servers.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit {
  server: {id: number, name: string, status: string};
  serverName = '';
  serverStatus = '';
  allowEdit:Boolean = false;

  constructor(private serversService: ServersService,
              private route: ActivatedRoute) { }

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
  }

}
