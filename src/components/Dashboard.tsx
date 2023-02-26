import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const DashboardPage: React.FC = () => {
    const navigate = useNavigate();

    const menus = [
        {
            img_url:
                'https://ik.imagekit.io/6ytqiv4caie2/icons/course_EZtHrRruO.png?ik-sdk-version=javascript-1.4.3&updatedAt=1677321410037',
            title: 'Courses',
            link: '/dashboard/course',
        },
        {
            img_url:
                'https://ik.imagekit.io/6ytqiv4caie2/icons/xmodules-375x300.png.pagespeed.ic.Vw-2crK2PI_7hjCM5OMo.png?ik-sdk-version=javascript-1.4.3&updatedAt=1677321949299',
            title: 'Modules',
            link: '/dashboard/module',
        },
        {
            img_url:
                'https://ik.imagekit.io/6ytqiv4caie2/icons/activity-complex-like-puzzle-pictured-as-word-pieces-to-show-can-be-difficult-needs-cooperating-fit-together-d-164200616_A9tNYiYgv.jpeg?ik-sdk-version=javascript-1.4.3&updatedAt=1677333653011',
            title: 'Activities',
            link: '/dashboard/activity',
        },
    ];

    const goToDetail = (link: string) => {
        return navigate(link);
    };

    return (
        <React.Fragment>
            <div className="d-flex flex-wrap justify-content-center">
                {menus.map((item, index) => {
                    return (
                        <Card key={index} style={{ width: '18rem', margin: '1rem 1rem' }}>
                            <Card.Img variant="top" src={item.img_url} alt="course-logo" style={{ height: '10rem' }} />
                            <Card.Body>
                                <div className="text-center">
                                    <div>
                                        {' '}
                                        <Card.Title>{item.title}</Card.Title>{' '}
                                    </div>
                                    <div>
                                        {' '}
                                        <Button
                                            onClick={() => goToDetail(item.link)}
                                            variant="primary"
                                            style={{ marginTop: '2rem' }}
                                        >
                                            Detail
                                        </Button>{' '}
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    );
                })}
            </div>
        </React.Fragment>
    );
};

export default DashboardPage;
