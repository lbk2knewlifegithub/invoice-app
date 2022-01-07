import { Injectable } from '@nestjs/common';
import { Message } from '@lbk/models';

@Injectable()
export class AppService {
  getData(): Message {
    return { message: 'Welcome to api!' };
  }
}
