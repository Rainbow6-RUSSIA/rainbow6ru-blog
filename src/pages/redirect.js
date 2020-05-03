import React, { useEffect } from 'react';
import '../components/all.sass';
import { auth } from "../utils/auth";

const Redirect = () => {

    useEffect(() => {
       auth.handleRedirect();
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
                </div>
            </section>
        </div>
    )
}

export default Redirect