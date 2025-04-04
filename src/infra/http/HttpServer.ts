import express from "express";
import CustomError from "../../domain/errors/CustomError";

export default interface HttpServer {
  register(method: string, url: string, callback: Function): void;
  listen(port: number): void;
}

export class ExpressAdapter implements HttpServer {
  app: any;
  constructor() {
    this.app = express();
    this.app.use(express.json());
  }

  register(method: string, url: string, callback: Function): void {
    this.app[method](url, async (req: any, res: any) => {
      try {
        const output = await callback(req.params, req.body);
        res.json(output);
      } catch (error: any) {
        if (error instanceof CustomError) {
          res.status(error.errorCode).json({
            message: error.message,
          });
        } else {
          console.log(error);
          res.status(500).json({
            message: String(error),
          });
        }
      }
    });
  }
  listen(port: number): void {
    this.app.listen(port);
  }
}
