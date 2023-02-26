import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card } from 'react-bootstrap';
import { getActivities } from '../services/activities';

const ActivitiesPage: React.FC = () => {
    const [activities, setActivities] = React.useState<{ [K: string]: any }[]>([]);
    const navigate = useNavigate();

    React.useEffect(() => {
        getActivities().then((response) => {
            const { data } = response;

            setActivities(data ?? []);
        });
        return () => {};
    }, []);

    const routesLink = (link: string) => {
        return navigate(link);
    };

    return (
        <React.Fragment>
            <div style={{ margin: '2em 2rem' }}>
                <div className="d-flex justify-content-center mb-5">
                    <div className="mx-3">
                        <Button onClick={() => routesLink('/dashboard/activity/add')} variant="primary">
                            Add Course
                        </Button>
                    </div>
                    <div className="mx-3">
                        <Button onClick={() => routesLink('/dashboard')} variant="danger">
                            Back
                        </Button>
                    </div>
                </div>
                <div className="d-flex flex-wrap justify-content-center mt-5">
                    {activities.map((item, index) => {
                        return (
                            <Card key={index} style={{ width: '18rem', margin: '1rem 1rem' }}>
                                <Card.Body>
                                    <div className="text-center">
                                        <div>
                                            {' '}
                                            <Card.Title>{item.name}</Card.Title>{' '}
                                        </div>

                                        <div>
                                            <Card.Text>{item.description}</Card.Text>
                                        </div>

                                        {/* <div>
                                            {' '}
                                            <Button
                                                onClick={() => goToDetail(item.link)}
                                                variant="primary"
                                                style={{ marginTop: '2rem' }}
                                            >
                                                Detail
                                            </Button>{' '}
                                        </div> */}
                                    </div>
                                </Card.Body>
                            </Card>
                        );
                    })}
                </div>
            </div>
        </React.Fragment>
    );
};

export default ActivitiesPage;
