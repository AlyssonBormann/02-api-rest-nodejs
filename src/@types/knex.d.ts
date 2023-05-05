// eslint-disable-next-line
import { knex } from 'knex' 

// aqui eu quero dizer que vou usar tudo do knex mais oque vou colocar de novo aqui em baixo

declare module 'knex/types/tables' {
  export interface Tables {
    transactions: {
      id: string
      title: string
      amount: number
      created_at: string
      session_id?: string
    }
  }
}
