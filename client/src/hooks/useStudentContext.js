import { useContext } from 'react';
import { StudentsContext } from '../context/StudentContext';

export const useStudentsContext = () => {
  const context = useContext(StudentsContext);

  if (!context) {
    throw Error('useStudentsContext must be used inside a StudentsContextProvider');
  }

  return context;
};