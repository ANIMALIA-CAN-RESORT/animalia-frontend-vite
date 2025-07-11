import { Component, OnInit } from '@angular/core';
import { faFacebook, faGithub, faGitlab, faTwitter, faWhatsapp } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  faWhatsapp = faWhatsapp;
  faFacebook = faFacebook;
  faGitlab = faGitlab;
  faTwitter = faTwitter;
  faGitHub = faGithub;
  constructor() { }

  ngOnInit() {
  }

}
