import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { addPassword } from './features/passwords/passwordsSlice'

import './password.css';

import zxcvbn from 'zxcvbn'

function Password() {
  const dispatch = useDispatch()
  const [password, setPassword] = useState('p@$$w0rd')
  const [name, setName] = useState('')
  const [passwordStrength, setPasswordStrength] = useState(0)

  function generatePassword() {
    let pswrd = []
    for(let i = 0; i < 8; i++){
      pswrd.push(getRandomChar())
    }
    let pswrdString = pswrd.toString()
    let password = pswrdString.replaceAll(',', '')
    setPassword(password)
  }
   
  function getRandomChar() {
    const str = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ01234567889';
    let value = Math.floor(Math.random() * 63);
    return(str[value])
  }

  useEffect(() => {
    setPasswordStrength(zxcvbn(password))
  }, [password])

  return (
    <div>
      Password
      <input 
        type="text"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      Name
      <input 
        type="text"
        onChange={(e) => setName(e.target.value)}
        value={name}
      />
      <div>
        <button onClick={(e) => {
          generatePassword()
        }}>
          Generate
        </button>
      </div>
      <div>
        Your Password Score: {passwordStrength.score} out of 4
      </div>
      <button
        className='button' onClick={() => dispatch(addPassword({ name, password }))}
      >Save</button>
    </div>
  )
}

export default Password