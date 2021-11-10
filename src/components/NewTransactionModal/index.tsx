import { useState, FormEvent } from 'react';
import Modal from 'react-modal'

import { Container, TransactionTypeContainer, RadioBox } from './styles';
import { useTransactions } from '../../hooks/useTransactions';

import incomeImg from '../../assets/income.svg'
import outcomeImg from '../../assets/outcome.svg'
import closeImg from '../../assets/close.svg'
interface NewTransactionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export function NewTransactionModal( { isOpen, onRequestClose }: NewTransactionModalProps ){

  const { createTransaction } = useTransactions()
  
  const [ title, setTitle ] = useState('')
  const [ amount, setAmount ] = useState(0)
  const [ type, setType ] = useState('deposit')
  const [ category, setCategory ] = useState('')

  async function handleCreateNewTransaction(event: FormEvent){
    event.preventDefault()

    await createTransaction({
      title,
      amount,
      category, 
      type
    })

    setTitle('')
    setAmount(0)
    setCategory('')
    setType('deposit')
    onRequestClose()
  }

  return (
    <Modal 
        isOpen={isOpen} 
        onRequestClose={onRequestClose}
        overlayClassName="react-modal-overlay"
        className="react-modal-content"
        >

          <button type="button" onClick={onRequestClose} className="react-modal-close">
            <img src={closeImg} alt="close modal" />
          </button>
        
         
         <Container onSubmit={handleCreateNewTransaction}>
            <h2>Register New Transaction</h2>
            
            <input type="text" placeholder="Title" value={title} onChange={event => setTitle(event.target.value)}/>
            <input type="number" placeholder="Value" value={amount} onChange={event => setAmount(Number(event.target.value))}/>

            <TransactionTypeContainer>
              <RadioBox 
              type="button"
              onClick={() => setType('deposit')}
              isActive={type === 'deposit'}
              activeColor="green"
              >
                <img src={incomeImg} alt="Income"/>
                <span>Income</span>
              </RadioBox>
              
              <RadioBox 
              type="button"
              onClick={() => setType('withdraw')}
              isActive={type === 'withdraw'}
              activeColor="red"
              
              >
                <img src={outcomeImg} alt="outcome" />
                <span>Outcome</span>
              </RadioBox>
            </TransactionTypeContainer>

            <input type="text" placeholder="Category" value={category} onChange={event => setCategory(event.target.value)} />
            <button type="submit">Registre</button>
         </Container>

          
    </Modal>
  );
}