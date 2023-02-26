import React, { useState } from 'react';
import { Form, Button, Toast } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { getActivities } from '../services/activities';
import { addModules } from '../services/modules';

interface FormValues {
    [key: string]: string | undefined | string[] | null | File;
    name: string;
    description: string;
    activities: string[];
}

const FormModules: React.FC = () => {
    const [formValues, setFormValues] = useState<FormValues>({
        name: '',
        description: '',
        activities: [] as string[],
    });
    const [activities, setActivities] = useState<{ value: string; label: string }[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [validated, setValidated] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [toastTitle, setToastTitle] = useState('');
    const [toastMessage, setToastMessage] = useState('');
    const navigate = useNavigate();

    React.useEffect(() => {
        getActivities().then((response) => {
            const data = response.data as any[];
            setActivities([
                ...data.map((item) => ({
                    label: item.name,
                    value: item.id,
                })),
            ]);
        });
    }, []);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        let valuUpdated: any = value;
        if (name === 'activities' && event.target.checked) {
            const valueActivities = [...formValues.activities];
            valueActivities.push(value);
            valuUpdated = valueActivities;
        }

        if (name === 'activities' && !event.target.checked) {
            valuUpdated = formValues.activities.filter((item) => item !== value);
        }

        setFormValues({ ...formValues, [name]: valuUpdated });
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        setIsLoading(true);
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true);

        const responseAddCourse = await addModules({
            name: formValues.name,
            description: formValues.description,
            activities: formValues.activities,
        });

        if (!responseAddCourse.success) {
            setIsLoading(false);
            setShowToast(true);
            setToastTitle(responseAddCourse.messageTitle);
            setToastMessage(responseAddCourse.message);

            return;
        }

        setIsLoading(false);
        setShowToast(true);
        setToastTitle(responseAddCourse.messageTitle);
        setToastMessage(responseAddCourse.message);
        navigate('/dashboard/module');
    };

    return (
        <React.Fragment>
            <div className="d-flex justify-content-center mb-5">
                <div className="mx-3">
                    <Button onClick={() => navigate('/dashboard/course')} variant="danger">
                        Back
                    </Button>
                </div>
            </div>
            {activities.length && (
                <div style={{ margin: '5rem 10rem' }}>
                    <Form onSubmit={handleSubmit} noValidate validated={validated}>
                        <Form.Group controlId="formName" className="mt-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                name="name"
                                value={formValues.name}
                                onChange={handleInputChange}
                            />
                            <Form.Control.Feedback type="invalid">Please enter your name.</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="formDescription" className="mt-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                name="description"
                                value={formValues.description}
                                onChange={handleInputChange}
                            />
                            <Form.Control.Feedback type="invalid">Please enter your description.</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="formSelectModule" className="mt-3">
                            <div>
                                {' '}
                                <Form.Label> Activities </Form.Label>{' '}
                            </div>
                            <div>
                                {activities.map((item, index) => {
                                    return (
                                        <Form.Check
                                            required
                                            key={index}
                                            inline
                                            label={item.label}
                                            value={item.value}
                                            name="activities"
                                            type="checkbox"
                                            onChange={handleInputChange}
                                        />
                                    );
                                })}
                            </div>
                        </Form.Group>

                        <Button disabled={isLoading} variant="primary" type="submit" className="mt-3">
                            {isLoading ? 'Loading...' : 'Submit'}
                        </Button>
                    </Form>
                </div>
            )}
            <Toast
                show={showToast}
                onClose={() => setShowToast(false)}
                style={{ position: 'absolute', top: '5rem', right: '1rem' }}
                delay={3000}
                autohide
            >
                <Toast.Header>
                    <strong className="me-auto">{toastTitle}</strong>
                </Toast.Header>
                <Toast.Body>{toastMessage}</Toast.Body>
            </Toast>
        </React.Fragment>
    );
};

export default FormModules;
