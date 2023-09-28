import { useRouter } from 'next/router';
import NewMeetupForm from '../../components/meetups/NewMeetupForm';
import { Fragment } from 'react';
import Head from 'next/head';

const NewMeetUpPage = () => {

    const router = useRouter();

    const onAddMeetupHandler = async (meetup) => {
        console.log(meetup);

        const response = await fetch(`/api/new-meetup`, {
            body: JSON.stringify(meetup),
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }

        });

        const data = await response.json();

        console.log(data);
        router.push('/');
    }

    return (
        <Fragment>
            <Head>
                <title>Create your meetup</title>
                <meta name='description' content='Your own meetup to get in touch with amazing people!!' />
            </Head>
            <NewMeetupForm onAddMeetup={onAddMeetupHandler} />
        </Fragment>
    )
};

export default NewMeetUpPage