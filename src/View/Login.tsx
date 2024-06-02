import {ChangeEvent, FC, useState} from 'react';

import {NavigateFunction, useNavigate} from 'react-router-dom';

import {login} from "../api/auth.ts";

import ButtonComponent from "../Components/UI/ButtonComponent.tsx";

const LoginPage: FC = () => {
    const navigate: NavigateFunction = useNavigate();

    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string| null>(null);

    const disabled: boolean = !username || !password;

    const handleLogin = async (): Promise<void> => {
        try {
            await login(username, password);

            navigate('/');
        } catch (err) {
            setError('Invalid username or password');
        }
    };

    const setUserName = (event: ChangeEvent<HTMLInputElement>): void => {
        setUsername(event.target.value);
    }

    const setUserPassword = (event: ChangeEvent<HTMLInputElement>): void => {
        setPassword(event.target.value);
    }

    return (
        <section className='login'>
            <div className='form-body'>
                <div className='error'>{error}</div>

                <label className='input-label'>
                    <input type="text" value={username} onChange={setUserName} placeholder="Username"/>
                </label>

                <label className='input-label'>
                    <input type="password" value={password} onChange={setUserPassword} placeholder="Password"/>
                </label>

                <div className='login-footer'>
                    <ButtonComponent text='Sign In' disabled={disabled} handleClick={handleLogin}/>
                </div>
            </div>

        </section>

    );
};

export default LoginPage;
