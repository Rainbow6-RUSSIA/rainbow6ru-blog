import React, { useEffect, useState } from 'react';
import '../components/styles/index.sass';
import { auth } from "../utils/auth";

const H6 = ({ children, color }) => <h6 className="subtitle is-6" style={{color}}>{children}</h6>

const Status = ({ status }) => {
    switch (true) {
        case status === 'SUCCESS': return <H6 color='green'>{status}</H6>
        case status?.startsWith('CODE'): return <H6 color='red'>ERROR-{status}</H6>
    
        default: return null
    }
}

const Redirect = () => {

    const [status, setStatus] = useState(null)

    useEffect(() => {
       auth.handleRedirect().then(setStatus);
    }, [])


    return (
        <div style={{ padding: '2em' }}>
            <section className="hero">
                <div className="hero-body">
                    <h1 className="title">
                        Перенаправление назад
                    </h1>
                    <h2 className="subtitle">
                        Вы можете закрыть окно если оно не закрылось самостоятельно
                    </h2>
                    <Status status={status} />
                </div>
            </section>
        </div>
    )
}

export default Redirect