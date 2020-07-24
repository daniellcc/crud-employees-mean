import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'about',
  templateUrl: './about.html',
  styles: [`a {color: rgb(0 126 255); text-decoration: none;}`]
})
export class about {}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  openAbout() {
    this.dialog.open(about)
  }

  ngOnInit(): void {
  }

}
