import { Request } from 'express';
declare namespace Express {
  export interface Request{
    userId: string; 
  }
}

declare global {
  namespace Express {
    interface Request {
      user?: any; 
    }
  }
}