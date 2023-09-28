import { Fragment, useEffect, useState } from 'react';
import MeetupList from '../components/meetups/MeetupList';
import { MongoClient } from 'mongodb';
import Head from 'next/head';

// const DUMMY_MEETUPS = [
//     {
//         id: 'm1',
//         title: 'A first meetup',
//         image: `https://images.unsplash.com/photo-1695507567154-0c7f89d939df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2787&q=80`,
//         description: 'This is the first meetup',
//         address: `#5, Some address, Some street, Some country`
//     },
//     {
//         id: 'm2',
//         title: 'A second meetup',
//         image: `https://images.unsplash.com/photo-1694532228681-2f6d94c2f768?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxOHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60`,
//         description: 'This is the second meetup',
//         address: `#3, Some address, Some street, Some country`
//     },
//     {
//         id: 'm3',
//         title: 'A third meetup',
//         image: `https://images.unsplash.com/photo-1683009427540-c5bd6a32abf6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwyMXx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60`,
//         description: 'This is the third meetup',
//         address: `#4, Some address, Some street, Some country`
//     }

// ];

const Homepage = (props) => {

    // Not needed after implementing getStaticProps
    // const [meetups, setMeetUps] = useState([]);
    // useEffect(() => {
    //     setMeetUps(DUMMY_MEETUPS);
    // }, []);

    return (
        <Fragment>
            <Head>
                <title>Meetups to react 😎</title>
                <meta name='description' content='Browse a huge list of highly interactive meetups' />
            </Head>
            <MeetupList meetups={props.meetups} />
        </Fragment>
    );
};

// export const getServerSideProps = async (context) => {
//     //Fetch Data from API

//     // Get req/res details. req details can be used to check the validity of session etc
//     const { req, res } = context;

//     return {
//         props: {
//             meetups: DUMMY_MEETUPS
//         }
//     };
// };

export const getStaticProps = async () => {

    const client = await MongoClient.connect(`mongodb+srv://1992vishukumar:2gsF4CHrdjejF2lJ@cluster0.e6eizds.mongodb.net/meetups?retryWrites=true&w=majority`);
    const db = client.db();
    const meetupsCollection = db.collection('meetups');
    const meetups = await meetupsCollection.find().toArray();
    client.close();

    //Fetch data from API
    return {
        props: {
            meetups: meetups.map((meetup) => {
                const { _id } = meetup;
                delete meetup._id;
                return { ...meetup, id: _id.toString() };
            })
        },
        revalidate: 1
    };
};

export default Homepage;