import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { getAllCourses } from '../services/course';

const CoursePage: React.FC = () => {
    const [courses, setCourses] = React.useState([]);
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
                <div className="d-flex flex-wrap justify-content-center mt-5">{JSON.stringify(courses)}</div>
            </div>
        </React.Fragment>
    );
};

export default CoursePage;
