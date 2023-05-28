import { Component, OnInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { MessagingService } from 'src/app/services/messaging-service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
})
export class MainLayoutComponent implements OnInit {
  message: any;
  constructor(private messageService: MessagingService) {}

  ngOnInit() {
    this.messageService.requestPermission();
    this.messageService.receiveMessaging();
    this.message = this.messageService.currentMessage;
  }
}
