import { FormControl, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { IBook } from 'src/app/shared/interfaces';
import { BooksService } from '../books.service';
import { catArr } from 'src/app/shared/categories';
// import { Fun } from 'src/app/shared/fun';
import './edit-book.component.css';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css'],
})
export class EditBookComponent implements OnInit {
  constructor(
    private bookService: BooksService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.model = {
      img: '',
      description: '',
      // list:[]
    };
  }

  db_cats: string[] | undefined;
  selectedCats: any[] = [];
  cats: FormGroup = new FormGroup({});
  onebook: IBook | undefined;
  categories = catArr;
  model!: any;
  list: any = [];
  title: string = '';
  checked: boolean = false;
  checks: any = [];
  r: any | undefined;

  id = this.route.snapshot.params['id'];

  ngOnInit() {
    
    this.bookService.getOneBook(this.id).subscribe((d) => {
      this.onebook = d;
      this.model.img = this.onebook.img;
      this.model.description = this.onebook.description;

      catArr.map((x) => this.list.push({ title: x, checked: false }));
         });
  }

  edit() {
    this.r = this.list.filter((item: { checked: any }) => item.checked);
    this.r.map((x: any) => {
      if (!this.checks.includes(x.title)) {
        this.checks.push(x.title);
      } 
      else {
        // this.checks.filter((y:any) => {return y != x.title});
        let i = this.checks.indexOf(x.title);
        if(i > -1){
          this.checks = this.checks.splice(i, 1);
        }
      }
    });
    console.log(this.checks);
    // this.bookService.updateBook(this.id, this.model)
  }

  del(bookId: string){    
    this.bookService.del(bookId);
  }

  exitBtn(){
    this.router.navigate(['/books/book-info/', this.id]);
  }
}