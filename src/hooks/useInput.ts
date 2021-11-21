import {useState} from 'react';

export function useInput(initialState: any) {
  const [state,setState] = useState(initialState);

  const setInput = (event: any) => {
    setState(event.currentTarget.value);
  };

  return [state, setInput, setState];
}
