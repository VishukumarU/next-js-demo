import MeetupDetails from "@/components/meetups/MeetupDetails";
import { MongoClient, ObjectId } from "mongodb";
import Head from "next/head";
import { Fragment } from "react";

const MeetupDetailsPage = (props) => {

    const { title, image, address, description } = props.meetup;

    return (
        <Fragment>
            <Head>
                <title>{title}</title>
                <meta name="description" content={description} />
            </Head>
            <MeetupDetails
                title={title}
                address={address}
                image={image}
                description={description} />
        </Fragment>
    );
};

export const getStaticPaths = async () => {


    const client = await MongoClient.connect(`mongodb+srv://1992vishukumar:2gsF4CHrdjejF2lJ@cluster0.e6eizds.mongodb.net/meetups?retryWrites=true&w=majority`);
    const db = client.db();
    const meetupsCollection = db.collection(`meetups`);
    const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();
    client.close();

    return {

        // // All probable paths have to be setup for pre-rendering. Else, they'll throw 404 error
        // paths: [
        //     // These ids will be fetched from DB
        //     { params: { meetupId: 'm1' } },
        //     { params: { meetupId: 'm2' } }
        // ],

        paths: meetups.map(meetup => ({ params: { meetupId: meetup._id.toString() } })),
        fallback: false     // False -- all possible pages(meetupIds) are accounted for
        // True -- NextJS will try to generate page for the id, dynamically on the server 
    };
};

export const getStaticProps = async (context) => {

    const { meetupId } = context.params;

    const client = await MongoClient.connect(`mongodb+srv://1992vishukumar:2gsF4CHrdjejF2lJ@cluster0.e6eizds.mongodb.net/meetups?retryWrites=true&w=majority`);
    const db = client.db();
    const meetupsCollection = db.collection(`meetups`);
    const meetup = await meetupsCollection.findOne({ _id: new ObjectId(meetupId) });
    client.close();
    console.log(meetupId);

    const { _id, title, description, image, address } = meetup;

    return {
        props: {
            meetup: {
                id: _id.toString(), title, description, image, address
            }
        }
    };
};

export default MeetupDetailsPage;