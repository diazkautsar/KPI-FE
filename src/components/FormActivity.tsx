import React, { useState } from 'react';
import { Form, Button, Toast } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { addActivity } from '../services/activities';
import { getImageKitToken, uploadImageKit } from '../services/util';
import { getFileExtension } from '../utils';
import { getImagePreview } from '../utils/getImagePreview';

interface FormValues {
    name: string;
    description: string;
    file: File | null;
}

const FormActivity: React.FC = () => {
    const [formValues, setFormValues] = useState<FormValues>({
        name: '',
        description: '',
        file: null,
    });
    const [isLoading, setIsLoading] = useState(false);
    const [validated, setValidated] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [toastTitle, setToastTitle] = useState('');
    const [toastMessage, setToastMessage] = useState('');
    const navigate = useNavigate();

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null;
        setFormValues({ ...formValues, file });
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

        const coverImageBase64: any = await getImagePreview(formValues.file);
        console.log(formValues?.file?.type);
        console.log(getFileExtension(formValues?.file?.type ?? ''));
        const response = await getImageKitToken();
        const dataImageKit = response.data;

        const responseUpload = await uploadImageKit({
            file: coverImageBase64,
            publicKey: dataImageKit.publicKey,
            signature: dataImageKit.signature,
            expire: dataImageKit.expire,
            token: dataImageKit.token,
            fileName: formValues.name,
        });

        const responseAddCourse = await addActivity({
            name: formValues.name,
            description: formValues.description,
            media_type: getFileExtension(formValues?.file?.type ?? ''),
            media_url: responseUpload.data.url,
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
        navigate('/dashboard/activity');
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

                    <Form.Group controlId="formFile" className="mt-3">
                        <Form.Label>Media</Form.Label>
                        <Form.Control required type="file" name="file" onChange={handleFileChange} />
                    </Form.Group>

                    <Button disabled={isLoading} variant="primary" type="submit" className="mt-3">
                        {isLoading ? 'Loading...' : 'Submit'}
                    </Button>
                </Form>
            </div>
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

export default FormActivity;
