import { expect, afterAll, beforeAll, test, describe } from 'vitest'
import request from 'supertest'
import { app } from '../src/app'

describe('Transactions routes', () => {
  // Inicia o servidor
  beforeAll(async () => {
    await app.ready()
  })

  // Depois de tudo testado eu elimino o servido
  afterAll(async () => {
    await app.close()
  })

  test('should be able to create a new transaction', async () => {
    await request(app.server)
      .post('/transactions')
      .send({
        title: 'New transaction',
        amount: 33,
        type: 'credit',
      })
      .expect(201)
  })

  test.todo('should be able to list all tranctions', async () => {
    const createTransactionResponse = await request(app.server)
      .post('/transactions')
      .send({
        title: 'New transaction',
        amount: 33,
        type: 'debit',
      })

    const cookies = createTransactionResponse.get('Set-Cookie')

    const listTransactionsResponse = await request(app.server)
      .get('/transactions')
      .set('Cookie', cookies)
      .expect(200)

    expect(listTransactionsResponse.body.tranctions).toEqual([
      expect.objectContaining({
        title: 'New Transaction',
        amount: 33,
      }),
    ])
  })
})
