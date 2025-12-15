import { Injectable } from '@nestjs/common';

@Injectable()
export class HelperService {

    
  getEmailDomain(email: string): string {
    if (!email || typeof email !== 'string') {
      throw new Error('Email must be a valid string');
    }

    const emailRegex = /^[^\s@]+@([^\s@]+)$/;
    const match = email.match(emailRegex);

    if (!match || !match[1]) {
      throw new Error('Invalid email format');
    }

    return match[1].toLowerCase();
  }
}
