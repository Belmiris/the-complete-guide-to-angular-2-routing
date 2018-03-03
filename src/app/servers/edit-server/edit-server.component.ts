import { Component, OnInit } from '@angular/core';

import { ServersService } from '../servers.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit {
  server: {id: number, name: string, status: string};
  serverName = '';
  serverStatus = '';

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
    this.route.queryParams.subscribe();
    this.route.fragment.subscribe();
    
    this.server = this.serversService.getServer(1);
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {name: this.serverName, status: this.serverStatus});
  }

}
