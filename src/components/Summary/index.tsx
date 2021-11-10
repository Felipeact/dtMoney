

import incomeImg from '../../assets/income.svg'
import outcomeImg from '../../assets/outcome.svg'
import totalImg from '../../assets/total.svg'
import {  useTransactions } from '../../hooks/useTransactions';

import { Container } from './styles';

export function Summary(){

  const {transactions} = useTransactions()

  // const totalDeposits = transactions.reduce( ( acc, transaction ) => {
  //   if ( transaction.type === 'deposit' ) {
  //     return acc + transaction.amount
  //   }
  //   return acc;
  // }, 0)

  const summary = transactions.reduce( ( acc, transaction ) => {
    if( transaction.type === 'deposit' ) {
      acc.deposits += transaction.amount
      acc.total += transaction.amount
    }else {
      acc.withdraw += transaction.amount;
      acc.total -= transaction.amount
    }

    return acc;
  }, {
    deposits: 0,
    withdraw: 0,
    total: 0
  })

  return (
    <Container>
      <div>
        <header>
          <p>Income </p>
          <img src={incomeImg} alt="Income" />

        </header>
        <strong>
        {new Intl.NumberFormat('en-CA', {
                  style: 'currency',
                  currency: 'CAD'
                }).format(summary.deposits)}
        </strong>
      </div>

      <div>
        <header>
          <p>Outcome </p>
          <img src={outcomeImg} alt="Income" />

        </header>
        <strong> -
        {new Intl.NumberFormat('en-CA', {
                  style: 'currency',
                  currency: 'CAD'
                }).format(summary.withdraw)}
        </strong>
      </div>

      <div className="highlight-background">
        <header>
          <p>Total </p>
          <img src={totalImg} alt="Income" />

        </header>
        <strong>
        {new Intl.NumberFormat('en-CA', {
                  style: 'currency',
                  currency: 'CAD'
                }).format(summary.total)}
        </strong>
      </div>
    </Container>
  );
}