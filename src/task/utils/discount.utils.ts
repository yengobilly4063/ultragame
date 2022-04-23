import { Injectable } from '@nestjs/common';

@Injectable()
export class DiscountUtil {
  private MAXPERCENT = 100;

  getDiscountAmount = (amount: number, percent: number) => {
    return amount - amount * (percent / this.MAXPERCENT);
  };
}
