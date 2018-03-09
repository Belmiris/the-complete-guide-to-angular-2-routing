import { Component, OnInit } from '@angular/core';

import { ServersService } from '../servers.service';
import { ActivatedRoute, Params, Router, Data } from '@angular/router';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {
  server: {id: number, name: string, status: string};
  allowEdit: Boolean = false;
  
  constructor(private serversService: ServersService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.allowEdit = this.route.snapshot.queryParams['allowEdit'] === '1' ? true : false;
    this.route.data.subscribe(
      (data:Data) => {
        this.server = data['server'];
      }
    );

    // We replaced this with a Route Resolver
    // const id = +this.route.snapshot.params['id'];
    // this.server = this.serversService.getServer(id);
    // this.route.params
    //   .subscribe(
    //     (params: Params) => {
    //       this.server = this.serversService.getServer(+params['id']);
    //     }
    //   );
    //   this.route.queryParams
    //   .subscribe(
    //     (params: Params) => {
    //       this.allowEdit = params['allowEdit'] === '1' ? true : false;
    //     }
    //   );
  }

  onEdit() {
    // this.router.navigate(['/servers', this.server.id, 'edit']);
    // this.router.navigate(['edit'], {relativeTo: this.route});
    this.router.navigate(['edit'], {relativeTo: this.route, queryParamsHandling: 'preserve', preserveFragment: true});
  }
}
