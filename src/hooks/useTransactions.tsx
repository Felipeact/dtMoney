import { createContext, ReactNode, useEffect, useState, useContext } from 'react' 
import { api } from '../services/api';

interface Transaction {
  id: number;
  title: string;
  amount: number;
  type: string;
  category: string;
  createdAt: string;
}

type TransactionIput = Omit<Transaction, 'id' | 'createdAt'>

interface TransactionsProviderProps {
  children: ReactNode;
}

interface TransactionContextData {
  transactions: Transaction[],
  createTransaction: ( transaction: TransactionIput) => Promise<void>

}

const TransactionsContext = createContext<TransactionContextData>(
  {} as TransactionContextData
  );

export function TransactionsProvider( { children }: TransactionsProviderProps ){
  const [transactions, setTransaction ] = useState<Transaction[]>([])
  
  useEffect(() => {
    api.get('transactions')
    .then(response => setTransaction(response.data.transactions))
  },[]);

  async function createTransaction( transactionInput : TransactionIput  ){
    const response = await api.post('/transactions', {...transactionInput, createdAt: new Date()})

    const { transaction } = response.data

    setTransaction([
      ...transactions,
      transaction
    ])
  }

  return (
    <TransactionsContext.Provider value={{ transactions, createTransaction }}>
      {children}
    </TransactionsContext.Provider>
  )
}

export function useTransactions() {
  const context = useContext(TransactionsContext)

  return context
}