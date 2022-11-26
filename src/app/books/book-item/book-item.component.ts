import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IBook } from 'src/app/shared/interfaces';
import { AuthService } from 'src/app/user/auth.service';
import { UserService } from 'src/app/user/user.service';
import { Fun } from "../../shared/fun"
import { BooksService } from '../books.service';

@Component({
  selector: 'app-book-item',
  templateUrl: './book-item.component.html',
  styleUrls: ['./book-item.component.css']
})
export class BookItemComponent implements OnInit {
  constructor(private userService: UserService, private router: Router, private auth: AuthService, private bookService: BooksService){}
  
  @Input() book!: IBook;
  r1 = 0;
  r2 = 0;
  isAuth = this.auth.isAuth;
  readBook: boolean = false;
  readList: string[] = []
  @Input() disabled!: boolean;
  user: any;
 
  ngOnInit(): void {
    this.r1 = Fun.ratingCount(this.book.rating);
    this.r2 = Fun.averageRating(this.book.rating);

<<<<<<< Updated upstream
this.userService.getOne(this.isAuth.data.user.id).subscribe(d=>{
=======
this.userService.getOne(this.auth.getAuth.data.user.id)?.subscribe(d=>{
>>>>>>> Stashed changes
  this.user = d;
  this.readList = this.user.booksRead;
  this.bookService.getOneVote(this.user.id, this.book.id)
  .subscribe((d: any) => {
    this.readBook = d.length > 0;
  });
});
}
onReadHendler(){
    this.bookService.getOneVote(this.user.id, this.book.id)
    .subscribe((d: any) => {
      this.readBook = !!d;
    });  
    
    if(this.readBook){
      return;
    }
  
  this.bookService.addVote({
    user_id: this.user.id,
    book_id: this.book.id,
    rating: 0,
    review: ''
  }).subscribe();
}
};