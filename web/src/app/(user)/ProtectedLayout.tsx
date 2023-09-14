import { Card } from '@/components/card';
import { useSession, signIn } from 'next-auth/react';
import { useEffect } from 'react';

type Props = {
    children: React.ReactElement;
};

/*
  add the requireAuth property to the page component
  to protect the page from unauthenticated users
  e.g.:
  OrderDetail.requireAuth = true;
  export default OrderDetail;
 */

export const ProtectedLayout = ({ children }: Props): JSX.Element => {
    const { status: sessionStatus } = useSession();
    const authorized = sessionStatus === 'authenticated';
    const unAuthorized = sessionStatus === 'unauthenticated';
    const loading = sessionStatus === 'loading';

    useEffect(() => {
        // check if the session is loading or the router is not ready
        if (loading) return;

        // if the user is not authorized, redirect to the login page
        // with a return url to the current page
        if (unAuthorized) {
            signIn("keycloak");
        }
    }, [loading, unAuthorized, sessionStatus]);

    // if the user refreshed the page or somehow navigated to the protected page
    if (loading) {
        return <Card isLoading className='h-screen' />;
    }

    // if the user is authorized, render the page
    // otherwise, render nothing while the router redirects him to the login page
    return authorized ? <div>{children}</div> : <></>;
};