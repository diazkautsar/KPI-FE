import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card } from 'react-bootstrap';
import { getAllCourses } from '../services/course';

const CoursePage: React.FC = () => {
    const [courses, setCourses] = React.useState<{[K: string]:any}[]>([]);
    const navigate = useNavigate();

    React.useEffect(() => {
        getAllCourses().then((response) => {
            const { data } = response;

            setCourses(data ?? []);
        });
        return () => {};
    }, []);

    const goToAddCourse = (link: string) => {
        return navigate(link);
    };

    return (
        <React.Fragment>
            <div style={{ margin: '2em 2rem' }}>
                <div className="d-flex justify-content-center mb-5">
                    <div>
                        <Button onClick={() => goToAddCourse('/dashboard/course/add')} variant="primary">
                            Add Course
                        </Button>
                    </div>
                </div>
                <div className="d-flex flex-wrap justify-content-center mt-5">
                    {courses.map((item, index) => {
                        return (
                            <Card key={index} style={{ width: '18rem', margin: '1rem 1rem' }}>
                                <Card.Img variant="top" src={item.cover_image} alt="course-logo" style={{ height: '10rem' }} />
                                <Card.Body>
                                    <div className="text-center">
                                        <div>
                                            {' '}
                                            <Card.Title>{item.name}</Card.Title>{' '}
                                        </div>

                                        <div>
                                            <Card.Text>
                                                { item.description }
                                            </Card.Text>
                                        </div>

                                        <div className='mt-3'>
                                            <div className='mb-1'> Keyword: </div>
                                            <Card.Text>
                                                { item.keyword }
                                            </Card.Text>
                                        </div>

                                        <div className='mt-3'>
                                            <div className='mb-1'> Modules: </div>
                                            <Card.Text>
                                                { item.modules.map((item: { name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; }, index: React.Key | null | undefined) => {
                                                    return (
                                                        <React.Fragment key={index}>
                                                            <div> {item.name} </div>
                                                        </React.Fragment>
                                                    )
                                                }) }
                                            </Card.Text>
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

export default CoursePage;
