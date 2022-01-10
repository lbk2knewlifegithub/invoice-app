import { Test, TestingModule } from '@nestjs/testing';
import {InvoicesController} from './invoices.controller';


describe('Invoices Controller', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [InvoicesController],
    }).compile();
  });

  describe('getData', () => {
    it('shout return all invoices', () => {
      const appController = app.get<InvoicesController>(InvoicesController);
      expect(appController.getInvoices()).toEqual({ message: 'Welcome to api!' });
    });
  });

});
