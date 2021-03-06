import { Injectable } from '@nestjs/common';
import { Between, LessThan, MoreThan } from 'typeorm';
import { subMonths, addMonths } from 'date-fns';

@Injectable()
export class TimeService {
  isEighteenMonghtsOlder(date: Date) {
    return LessThan(subMonths(date, 18));
  }
  isBetweenTwelveAndEighteenMonths(date: Date) {
    return Between(addMonths(date, 12), addMonths(date, 18));
  }
}
