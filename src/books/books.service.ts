import { Injectable, HttpException } from '@nestjs/common';
import { BOOKS } from './_mocks/_books.mock';

@Injectable()
export class BooksService {
  books = BOOKS;

  getBooks(): Promise<any> {
    return new Promise(resolve => {
      resolve(this.books);
    });
  }

  getBook(bookId): Promise<any> {
    return new Promise(resolve => {
      const id = Number(bookId);
      const book = this.books.find(item => item.id === id);
      if (!book) {
        throw new HttpException('Book does not exist!', 404);
      }
      resolve(book);
    });
  }

  addBook(book): Promise<any> {
    return new Promise(resolve => {
      this.books.push(book);
      resolve(this.books);
    });
  }

  deleteBook(bookId): Promise<any> {
    return new Promise(resolve => {
      const index = this.books.findIndex(item => item.id === bookId);
      if (index === -1) {
        throw new HttpException('Book does not exist!', 404);
      }

      this.books.splice(1, index);
      resolve(this.books);
    });
  }
}
